<?php

namespace App\Traits\Auth;

use App\Contracts\Auth\TwoFactorAuthenticateInterface;
use BaconQrCode\Renderer\Color\Rgb;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\RendererStyle\Fill;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

/**
 * Trait TwoFactorAuthentication
 *
 * @property string|null two_factor_secret
 * @property string|null two_factor_recovery_codes
 * @property string|null two_factor_confirmed_at
 * @property string name
 *
 * @method update(array $array)
 * @method forceFill(array $array)
 * @method save()
 * @method find(int $id)
 * @method sum(string $string)
 */
trait TwoFactorAuthentication
{
    public function twoFactorQrCodeSvg(): string
    {
        $svg = (new Writer(
            new ImageRenderer(
                new RendererStyle(192, 0, null, null, Fill::uniformColor(new Rgb(255, 255, 255), new Rgb(45, 55, 72))),
                new SvgImageBackEnd()
            )
        ))->writeString($this->twoFactorQrCodeUrl());

        return trim(substr($svg, strpos($svg, "\n") + 1));
    }

    public function twoFactorQrCodeUrl(): mixed
    {
        return app(TwoFactorAuthenticateInterface::class)->qrCodeUrl(
            config('app.name'),
            $this->name,
            decrypt($this->two_factor_secret),
        );
    }

    public function recoveryCodes(): mixed
    {
        if ($this->two_factor_recovery_codes) {
            return json_decode(decrypt($this->two_factor_recovery_codes), true, 512, JSON_THROW_ON_ERROR);
        }

        return [];
    }

    public function enable2fa(): bool
    {
        return $this->update(
            [
                'two_factor_secret' => encrypt(app(TwoFactorAuthenticateInterface::class)->generateSecretKey()),
                'two_factor_recovery_codes' => encrypt(
                    json_encode(Collection::times(6, static function () {
                        return
                            [
                                'code' => Str::random(10).'-'.Str::random(10),
                                'active' => true,
                            ];
                    })->all(), JSON_THROW_ON_ERROR)
                ),
            ]
        );
    }

    public function disable2fa(): bool
    {
        return $this->update(
            [
                'two_factor_secret' => null,
                'two_factor_confirmed_at' => null,
                'two_factor_recovery_codes' => null,
            ]
        );
    }

    public function hasEnabledTwoFactorAuthentication(): bool
    {
        return ! is_null($this->two_factor_secret) &&
            ! is_null($this->two_factor_confirmed_at);
    }

    public function replaceRecoveryCode(string $code): void
    {
        $updatedKeys = collect(json_decode(decrypt($this->two_factor_recovery_codes), true, 512, JSON_THROW_ON_ERROR))
            ->transform(function ($item) use ($code) {
                if ($item['code'] === $code) {
                    $item['active'] = false;
                }

                return $item;
            })->toJson();

        $this->forceFill(
            [
                'two_factor_recovery_codes' => encrypt($updatedKeys),
            ]
        )->save();
    }

    public function isUsedAllKeys(): mixed
    {
        return collect(json_decode(decrypt($this->two_factor_recovery_codes), true, 512, JSON_THROW_ON_ERROR))->sum('active');
    }
}
