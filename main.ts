namespace SpriteKind {
    export const P1_Projectile = SpriteKind.create()
    export const P2_Projectile = SpriteKind.create()
    export const UI = SpriteKind.create()
    export const PowerUp = SpriteKind.create()
    export const Heart = SpriteKind.create()
    export const shieldKIND = SpriteKind.create()
    export const shieldlogo = SpriteKind.create()
}
controller.player2.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Pressed, function () {
    if (SelectPlayerScreen == false) {
        Press_A_P2()
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    Press_A_P1()
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (SelectPlayerScreen == true) {
        map += 1
        if (map > 4) {
            map = 0
        }
        music.play(music.createSoundEffect(WaveShape.Triangle, 194, 923, 255, 50, 102, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        mapdisplay()
    } else {
        Press_A_P1()
    }
})
function mapdisplay () {
    if (SelectPlayerScreen == true) {
        if (map == 0) {
            sprites.destroy(mapfont)
            mapfont = sprites.create(assets.image`forestmap`, SpriteKind.UI)
        }
        if (map == 1) {
            sprites.destroy(mapfont)
            mapfont = sprites.create(assets.image`junlgemap`, SpriteKind.UI)
        }
        if (map == 2) {
            sprites.destroy(mapfont)
            mapfont = sprites.create(assets.image`alpine`, SpriteKind.UI)
        }
        if (map == 3) {
            sprites.destroy(mapfont)
            mapfont = sprites.create(assets.image`moonfont`, SpriteKind.UI)
        }
        if (map == 4) {
            sprites.destroy(mapfont)
            mapfont = sprites.create(assets.image`indoorfont`, SpriteKind.UI)
        }
    }
    mapfont.setPosition(83, 112)
}
function Press_A_P2 () {
    if (SelectPlayerScreen == true) {
        sprites.destroy(SpriteP1)
        sprites.destroy(SpriteP2)
        SelectPlayerScreen = false
    } else {
        if (P2_jumpcount <= 1) {
            PlayerTWO.vy = JUMPSPEED
            music.play(music.createSoundEffect(WaveShape.Triangle, 414, 679, 207, 110, 147, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
            P2_jumpcount += 1
        }
    }
}
sprites.onOverlap(SpriteKind.P2_Projectile, SpriteKind.Player, function (sprite, otherSprite) {
    if (otherSprite == PlayerONE) {
        if (PlayerTWO.image.equals(assets.image`baake`) || PlayerTWO.image.equals(assets.image`baakeR`)) {
            info.player1.changeLifeBy(-2)
            music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.UntilDone)
            sprites.destroy(sprite)
        } else if (shield_P1 == 1) {
            music.play(music.createSoundEffect(WaveShape.Square, 200, 1, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
            sprites.destroy(sprite)
        } else {
            info.player1.changeLifeBy(-1)
            music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.UntilDone)
            sprites.destroy(sprite)
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.PowerUp, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    music.play(music.melodyPlayable(music.magicWand), music.PlaybackMode.InBackground)
    if (sprite == PlayerONE) {
        P1_leftimg = assets.image`baake`
        P1_rightimg = P1_leftimg.clone()
        P1_rightimg.flipX()
        music.play(music.stringPlayable("E D G F B A C5 B ", 800), music.PlaybackMode.LoopingInBackground)
        pause(10000)
        music.stopAllSounds()
        P1_leftimg = SpriteP1.image
        P1_rightimg = P1_leftimg.clone()
        P1_rightimg.flipX()
    }
    if (sprite == PlayerTWO) {
        P2_leftimg = assets.image`baake`
        P2_rightimg = P2_leftimg.clone()
        P2_rightimg.flipX()
        music.play(music.stringPlayable("E D G F B A C5 B ", 800), music.PlaybackMode.LoopingInBackground)
        pause(10000)
        music.stopAllSounds()
        P2_leftimg = SpriteP2.image
        P2_rightimg = P2_leftimg.clone()
        P2_rightimg.flipX()
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Heart, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    if (sprite == PlayerONE) {
        info.changeLifeBy(5)
    }
    if (sprite == PlayerTWO) {
        info.player2.changeLifeBy(5)
    }
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (SelectPlayerScreen == true) {
        map += -1
        if (map < 0) {
            map = 4
        }
        music.play(music.createSoundEffect(WaveShape.Triangle, 194, 923, 154, 16, 102, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        mapdisplay()
    }
})
function Map () {
    if (map == 0) {
        scene.setBackgroundImage(assets.image`forest`)
        tiles.setCurrentTilemap(tilemap`Map1`)
    }
    if (map == 1) {
        scene.setBackgroundImage(assets.image`jungle`)
        tiles.setCurrentTilemap(tilemap`Map3`)
    }
    if (map == 2) {
        scene.setBackgroundImage(assets.image`snowynight`)
        tiles.setCurrentTilemap(tilemap`Map4`)
    }
    if (map == 3) {
        scene.setBackgroundImage(assets.image`moon`)
        tiles.setCurrentTilemap(tilemap`Map6`)
    }
    if (map == 4) {
        scene.setBackgroundImage(assets.image`indoor`)
        tiles.setCurrentTilemap(tilemap`Map5`)
    }
}
function Setting_Player_1 () {
    P1jumpcount = 0
    P1_leftimg = SpriteP1.image
    P1_rightimg = P1_leftimg.clone()
    P1_rightimg.flipX()
    PlayerONE = sprites.create(P1_rightimg, SpriteKind.Player)
    PlayerONE.setPosition(28, 90)
    controller.moveSprite(PlayerONE, 100, 0)
    PlayerONE.ay = GRAVITY
    info.setLife(30)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.shieldKIND, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    music.play(music.melodyPlayable(music.thump), music.PlaybackMode.InBackground)
    if (sprite == PlayerONE) {
        shield_P1 = 1
        music.play(music.stringPlayable("E B C5 A B G A F ", 400), music.PlaybackMode.LoopingInBackground)
        pause(9000)
        music.stopAllSounds()
        shield_P1 = 0
    }
    if (sprite == PlayerTWO) {
        shield_P2 = 1
        music.play(music.stringPlayable("E B C5 A B G A F ", 400), music.PlaybackMode.LoopingInBackground)
        pause(9000)
        music.stopAllSounds()
        shield_P2 = 0
    }
})
controller.player2.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    if (SelectPlayerScreen == true) {
        sprites.destroy(SpriteP2)
        SpriteP2 = sprites.create(list._pickRandom(), SpriteKind.Player)
        music.play(music.createSoundEffect(WaveShape.Triangle, 194, 923, 154, 16, 102, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        SpriteP2.setPosition(117, 95)
    } else {
        SetProjectile_P2()
        projectile.setKind(SpriteKind.P2_Projectile)
        if (PlayerTWO.image == P2_leftimg) {
            projectile.vx = projectile.vx * -1
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava1, function (sprite, location) {
    sprite.setPosition(78, 24)
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.UntilDone)
    if (sprite == PlayerONE) {
        info.changeLifeBy(-1)
    } else {
        info.player2.changeLifeBy(-1)
    }
})
function Setting_Player_2 () {
    P2_jumpcount = 0
    P2_leftimg = SpriteP2.image
    P2_rightimg = P2_leftimg.clone()
    P2_rightimg.flipX()
    PlayerTWO = sprites.create(P2_leftimg, SpriteKind.Player)
    PlayerTWO.setPosition(130, 90)
    controller.player2.moveSprite(PlayerTWO, 100, 0)
    PlayerTWO.ay = GRAVITY
    info.player2.setLife(30)
}
sprites.onOverlap(SpriteKind.P1_Projectile, SpriteKind.Player, function (sprite, otherSprite) {
    if (otherSprite == PlayerTWO) {
        if (PlayerONE.image.equals(assets.image`baake`) || PlayerONE.image.equals(assets.image`baakeR`)) {
            info.player2.changeLifeBy(-2)
            music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.UntilDone)
            sprites.destroy(sprite)
        } else if (shield_P2 == 1) {
            music.play(music.createSoundEffect(WaveShape.Square, 200, 1, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
            sprites.destroy(sprite)
        } else {
            info.player2.changeLifeBy(-1)
            music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.UntilDone)
            sprites.destroy(sprite)
        }
    }
})
info.onLifeZero(function () {
    game.splash("Player 2", "wins")
    game.gameOver(true)
})
function SetProjectile_P2 () {
    if (PlayerTWO.image.equals(assets.image`wibi`) || PlayerTWO.image.equals(assets.image`DashR`) || (PlayerTWO.image.equals(assets.image`wibiR`) || PlayerTWO.image.equals(assets.image`Dash`))) {
        projectile = sprites.createProjectileFromSprite(assets.image`laser`, PlayerTWO, projectile_speed, 0)
        music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
    }
    if (PlayerTWO.image.equals(assets.image`Kiwi`) || PlayerTWO.image.equals(assets.image`KiwiR`)) {
        projectile = sprites.createProjectileFromSprite(assets.image`Ei`, PlayerTWO, projectile_speed, 0)
        music.play(music.createSoundEffect(WaveShape.Sine, 200, 600, 255, 0, 150, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
    if (PlayerTWO.image.equals(assets.image`kasimir3`) || PlayerTWO.image.equals(assets.image`joshi`) || (PlayerTWO.image.equals(assets.image`kasimirR`) || PlayerTWO.image.equals(assets.image`joshiR`))) {
        projectile = sprites.createProjectileFromSprite(assets.image`bone`, PlayerTWO, projectile_speed, 0)
        music.play(music.createSoundEffect(WaveShape.Sine, 200, 600, 255, 0, 150, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
    if (PlayerTWO.image.equals(assets.image`Dominik`) || PlayerTWO.image.equals(assets.image`christoph`) || (PlayerTWO.image.equals(assets.image`DominikR`) || PlayerTWO.image.equals(assets.image`christophR`))) {
        projectile = sprites.createProjectileFromSprite(assets.image`fireball`, PlayerTWO, projectile_speed, 0)
        music.play(music.createSoundEffect(WaveShape.Square, 4896, 1, 217, 255, 141, SoundExpressionEffect.Warble, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    }
    if (PlayerTWO.image.equals(assets.image`alena`) || PlayerTWO.image.equals(assets.image`lisa`) || (PlayerTWO.image.equals(assets.image`alenaR`) || PlayerTWO.image.equals(assets.image`lisaR1`))) {
        projectile = sprites.createProjectileFromSprite(assets.image`fireballblue`, PlayerTWO, projectile_speed, 0)
        music.play(music.createSoundEffect(WaveShape.Square, 4896, 1, 217, 255, 141, SoundExpressionEffect.Warble, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    }
    if (PlayerTWO.image.equals(assets.image`gudrun`) || PlayerTWO.image.equals(assets.image`gudrunR`)) {
        projectile = sprites.createProjectileFromSprite(assets.image`fireballpink`, PlayerTWO, projectile_speed, 0)
        music.play(music.createSoundEffect(WaveShape.Square, 4896, 1, 217, 255, 141, SoundExpressionEffect.Warble, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    }
    if (PlayerTWO.image.equals(assets.image`mtiny`) || PlayerTWO.image.equals(assets.image`Ivy`) || (PlayerTWO.image.equals(assets.image`mtinyR`) || PlayerTWO.image.equals(assets.image`IvyR`))) {
        projectile = sprites.createProjectileFromSprite(assets.image`bambus`, PlayerTWO, projectile_speed, 0)
        music.play(music.createSoundEffect(WaveShape.Triangle, 1199, 1204, 255, 255, 118, SoundExpressionEffect.Vibrato, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    }
    if (PlayerTWO.image.equals(assets.image`BeeBot`) || PlayerTWO.image.equals(assets.image`BeeBotR`)) {
        projectile = sprites.createProjectileFromSprite(assets.image`honey`, PlayerTWO, projectile_speed, 0)
        music.play(music.createSoundEffect(WaveShape.Sine, 640, 879, 255, 255, 140, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    }
    if (PlayerTWO.image.equals(assets.image`Sheep`) || PlayerTWO.image.equals(assets.image`SheepR`)) {
        projectile = sprites.createProjectileFromSprite(assets.image`brownie`, PlayerTWO, projectile_speed, 0)
        music.play(music.createSoundEffect(WaveShape.Noise, 3574, 1, 221, 255, 171, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
    if (PlayerTWO.image.equals(assets.image`Tanja`) || PlayerTWO.image.equals(assets.image`mareike`) || (PlayerTWO.image.equals(assets.image`TanjaR`) || PlayerTWO.image.equals(assets.image`mareikeR`))) {
        projectile = sprites.createProjectileFromSprite(assets.image`shaedl`, PlayerTWO, projectile_speed, 0)
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 1356, 360, 184, 0, 263, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    }
    if (PlayerTWO.image.equals(assets.image`alex`) || PlayerTWO.image.equals(assets.image`saad`) || (PlayerTWO.image.equals(assets.image`alexR`) || PlayerTWO.image.equals(assets.image`saadR`))) {
        projectile = sprites.createProjectileFromSprite(assets.image`bug`, PlayerTWO, projectile_speed, 0)
        music.play(music.createSoundEffect(WaveShape.Sine, 2520, 2403, 194, 0, 212, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
    if (PlayerTWO.image.equals(assets.image`Robin`) || PlayerTWO.image.equals(assets.image`RobinR`)) {
        projectile = sprites.createProjectileFromSprite(assets.image`GB`, PlayerTWO, projectile_speed, 0)
        music.play(music.createSoundEffect(WaveShape.Square, 802, 524, 220, 0, 165, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    }
    if (PlayerTWO.image.equals(assets.image`Donat`) || PlayerTWO.image.equals(assets.image`DonatR`) || (PlayerTWO.image.equals(assets.image`michi`) || PlayerTWO.image.equals(assets.image`michiR`))) {
        projectile = sprites.createProjectileFromSprite(assets.image`soccerball`, PlayerTWO, projectile_speed, 0)
        music.play(music.createSoundEffect(WaveShape.Noise, 2878, 1, 214, 63, 155, SoundExpressionEffect.Warble, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
    }
    if (PlayerTWO.image.equals(assets.image`baake`) || PlayerTWO.image.equals(assets.image`baakeR`)) {
        projectile = sprites.createProjectileFromSprite(assets.image`laserbeam`, PlayerTWO, projectile_speed, 0)
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 2778, 1, 189, 255, 352, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
    }
}
info.player2.onLifeZero(function () {
    game.splash("Player 1", "wins")
    game.gameOver(true)
})
function Press_A_P1 () {
    if (SelectPlayerScreen == true) {
        sprites.destroy(SpriteP1)
        sprites.destroy(SpriteP2)
        SelectPlayerScreen = false
    } else {
        if (P1jumpcount <= 1) {
            PlayerONE.vy = JUMPSPEED
            music.play(music.createSoundEffect(WaveShape.Triangle, 414, 679, 207, 110, 147, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
            P1jumpcount += 1
        }
    }
}
controller.player2.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    Press_A_P2()
})
function SetProjectile_P1 () {
    if (PlayerONE.image.equals(assets.image`wibi`) || PlayerONE.image.equals(assets.image`DashR`) || (PlayerONE.image.equals(assets.image`wibiR`) || PlayerONE.image.equals(assets.image`Dash`))) {
        projectile = sprites.createProjectileFromSprite(assets.image`laser`, PlayerONE, projectile_speed, 0)
        music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
    }
    if (PlayerONE.image.equals(assets.image`Kiwi`) || PlayerONE.image.equals(assets.image`KiwiR`)) {
        projectile = sprites.createProjectileFromSprite(assets.image`Ei`, PlayerONE, projectile_speed, 0)
        music.play(music.createSoundEffect(WaveShape.Sine, 200, 600, 255, 0, 150, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
    if (PlayerONE.image.equals(assets.image`kasimir3`) || PlayerONE.image.equals(assets.image`joshi`) || (PlayerONE.image.equals(assets.image`kasimirR`) || PlayerONE.image.equals(assets.image`joshiR`))) {
        projectile = sprites.createProjectileFromSprite(assets.image`bone`, PlayerONE, projectile_speed, 0)
        music.play(music.createSoundEffect(WaveShape.Sine, 200, 600, 255, 0, 150, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
    if (PlayerONE.image.equals(assets.image`Dominik`) || PlayerONE.image.equals(assets.image`christoph`) || (PlayerONE.image.equals(assets.image`DominikR`) || PlayerONE.image.equals(assets.image`christophR`))) {
        projectile = sprites.createProjectileFromSprite(assets.image`fireball`, PlayerONE, projectile_speed, 0)
        music.play(music.createSoundEffect(WaveShape.Square, 4896, 1, 217, 255, 141, SoundExpressionEffect.Warble, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    }
    if (PlayerONE.image.equals(assets.image`alena`) || PlayerONE.image.equals(assets.image`lisa`) || (PlayerONE.image.equals(assets.image`alenaR`) || PlayerONE.image.equals(assets.image`lisaR1`))) {
        projectile = sprites.createProjectileFromSprite(assets.image`fireballblue`, PlayerONE, projectile_speed, 0)
        music.play(music.createSoundEffect(WaveShape.Square, 4896, 1, 217, 255, 141, SoundExpressionEffect.Warble, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    }
    if (PlayerONE.image.equals(assets.image`gudrun`) || PlayerONE.image.equals(assets.image`gudrunR`)) {
        projectile = sprites.createProjectileFromSprite(assets.image`fireballpink`, PlayerONE, projectile_speed, 0)
        music.play(music.createSoundEffect(WaveShape.Square, 4896, 1, 217, 255, 141, SoundExpressionEffect.Warble, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    }
    if (PlayerONE.image.equals(assets.image`mtiny`) || PlayerONE.image.equals(assets.image`Ivy`) || (PlayerONE.image.equals(assets.image`mtinyR`) || PlayerONE.image.equals(assets.image`IvyR`))) {
        projectile = sprites.createProjectileFromSprite(assets.image`bambus`, PlayerONE, projectile_speed, 0)
        music.play(music.createSoundEffect(WaveShape.Triangle, 1199, 1204, 255, 255, 118, SoundExpressionEffect.Vibrato, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    }
    if (PlayerONE.image.equals(assets.image`BeeBot`) || PlayerONE.image.equals(assets.image`BeeBotR`)) {
        projectile = sprites.createProjectileFromSprite(assets.image`honey`, PlayerONE, projectile_speed, 0)
        music.play(music.createSoundEffect(WaveShape.Sine, 640, 879, 255, 255, 140, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    }
    if (PlayerONE.image.equals(assets.image`Sheep`) || PlayerONE.image.equals(assets.image`SheepR`)) {
        projectile = sprites.createProjectileFromSprite(assets.image`brownie`, PlayerONE, projectile_speed, 0)
        music.play(music.createSoundEffect(WaveShape.Noise, 3574, 1, 221, 255, 171, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
    if (PlayerONE.image.equals(assets.image`Tanja`) || PlayerONE.image.equals(assets.image`mareike`) || (PlayerONE.image.equals(assets.image`TanjaR`) || PlayerONE.image.equals(assets.image`mareikeR`))) {
        projectile = sprites.createProjectileFromSprite(assets.image`shaedl`, PlayerONE, projectile_speed, 0)
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 1356, 360, 184, 0, 263, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    }
    if (PlayerONE.image.equals(assets.image`alex`) || PlayerONE.image.equals(assets.image`saad`) || (PlayerONE.image.equals(assets.image`alexR`) || PlayerONE.image.equals(assets.image`saadR`))) {
        projectile = sprites.createProjectileFromSprite(assets.image`bug`, PlayerONE, projectile_speed, 0)
        music.play(music.createSoundEffect(WaveShape.Sine, 2520, 2403, 194, 0, 212, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
    if (PlayerONE.image.equals(assets.image`Robin`) || PlayerONE.image.equals(assets.image`RobinR`)) {
        projectile = sprites.createProjectileFromSprite(assets.image`GB`, PlayerONE, projectile_speed, 0)
        music.play(music.createSoundEffect(WaveShape.Square, 802, 524, 220, 0, 165, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    }
    if (PlayerONE.image.equals(assets.image`Donat`) || PlayerONE.image.equals(assets.image`DonatR`) || (PlayerONE.image.equals(assets.image`michi`) || PlayerONE.image.equals(assets.image`michiR`))) {
        projectile = sprites.createProjectileFromSprite(assets.image`soccerball`, PlayerONE, projectile_speed, 0)
        music.play(music.createSoundEffect(WaveShape.Noise, 2878, 1, 214, 63, 155, SoundExpressionEffect.Warble, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
    }
    if (PlayerONE.image.equals(assets.image`baake`) || PlayerONE.image.equals(assets.image`baakeR`)) {
        projectile = sprites.createProjectileFromSprite(assets.image`laserbeam`, PlayerONE, projectile_speed, 0)
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 2778, 1, 189, 255, 352, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (SelectPlayerScreen == true) {
        sprites.destroy(SpriteP1)
        SpriteP1 = sprites.create(list._pickRandom(), SpriteKind.Player)
        music.play(music.createSoundEffect(WaveShape.Triangle, 194, 923, 154, 16, 102, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        SpriteP1.setPosition(43, 95)
    } else {
        SetProjectile_P1()
        projectile.setKind(SpriteKind.P1_Projectile)
        if (PlayerONE.image == P1_leftimg) {
            projectile.vx = projectile.vx * -1
        }
    }
})
let shieldUI_P2: Sprite = null
let shieldUI_P1: Sprite = null
let shield: Sprite = null
let HeartVAR: Sprite = null
let PowerUp: Sprite = null
let projectile: Sprite = null
let P1jumpcount = 0
let P2_rightimg: Image = null
let P2_leftimg: Image = null
let P1_rightimg: Image = null
let P1_leftimg: Image = null
let PlayerONE: Sprite = null
let PlayerTWO: Sprite = null
let P2_jumpcount = 0
let shield_P2 = 0
let shield_P1 = 0
let projectile_speed = 0
let JUMPSPEED = 0
let GRAVITY = 0
let list: Image[] = []
let mapfont: Sprite = null
let SpriteP2: Sprite = null
let SpriteP1: Sprite = null
let map = 0
let SelectPlayerScreen = false
SelectPlayerScreen = true
map = 0
scene.setBackgroundImage(assets.image`Menu1`)
SpriteP1 = sprites.create(assets.image`Kiwi`, SpriteKind.Player)
SpriteP1.setPosition(43, 95)
SpriteP2 = sprites.create(assets.image`wibi`, SpriteKind.Player)
SpriteP2.setPosition(117, 95)
mapfont = sprites.create(assets.image`forestmap`, SpriteKind.UI)
mapfont.setPosition(83, 112)
music.play(music.createSong(assets.song`Theme`), music.PlaybackMode.LoopingInBackground)
list = [
assets.image`Kiwi`,
assets.image`Sheep`,
assets.image`Ivy`,
assets.image`mtiny`,
assets.image`joshi`,
assets.image`BeeBot`,
assets.image`Dash`,
assets.image`kasimir3`,
assets.image`Dominik`,
assets.image`christoph`,
assets.image`alena`,
assets.image`lisa`,
assets.image`gudrun`,
assets.image`wibi`,
assets.image`Tanja`,
assets.image`mareike`,
assets.image`Robin`,
assets.image`Donat`,
assets.image`saad`,
assets.image`alex`,
assets.image`michi`
]
pauseUntil(() => SelectPlayerScreen == false)
music.stopAllSounds()
sprites.destroy(mapfont)
Map()
scene.centerCameraAt(75, 100)
GRAVITY = 250
JUMPSPEED = -135
projectile_speed = 120
shield_P1 = 0
shield_P2 = 0
Setting_Player_1()
Setting_Player_2()
game.onUpdate(function () {
    if (PlayerONE.isHittingTile(CollisionDirection.Bottom)) {
        P1jumpcount = 0
    }
})
game.onUpdate(function () {
    if (PlayerTWO.isHittingTile(CollisionDirection.Bottom)) {
        P2_jumpcount = 0
    }
})
game.onUpdate(function () {
    if (PlayerONE.vx < 0) {
        PlayerONE.setImage(P1_leftimg)
    } else if (PlayerONE.vx > 0) {
        PlayerONE.setImage(P1_rightimg)
    }
})
game.onUpdate(function () {
    if (PlayerTWO.vx < 0) {
        PlayerTWO.setImage(P2_leftimg)
    } else if (PlayerTWO.vx > 0) {
        PlayerTWO.setImage(P2_rightimg)
    }
})
forever(function () {
    if (SelectPlayerScreen == false) {
        pause(randint(40000, 120000))
        sprites.destroyAllSpritesOfKind(SpriteKind.PowerUp)
        PowerUp = sprites.create(assets.image`powerup`, SpriteKind.PowerUp)
        PowerUp.setPosition(randint(20, 140), randint(30, 100))
        PowerUp.setStayInScreen(true)
        animation.runImageAnimation(
        PowerUp,
        assets.animation`DBcoin`,
        150,
        true
        )
        if (tiles.tileAtLocationIsWall(PowerUp.tilemapLocation())) {
            sprites.destroyAllSpritesOfKind(SpriteKind.PowerUp)
        }
    }
})
forever(function () {
    if (SelectPlayerScreen == false) {
        pause(randint(30000, 60000))
        sprites.destroyAllSpritesOfKind(SpriteKind.Heart)
        HeartVAR = sprites.create(assets.image`life`, SpriteKind.Heart)
        HeartVAR.setPosition(randint(20, 140), randint(30, 100))
        HeartVAR.setStayInScreen(true)
        animation.runImageAnimation(
        HeartVAR,
        assets.animation`lifeani`,
        400,
        true
        )
        if (tiles.tileAtLocationIsWall(HeartVAR.tilemapLocation())) {
            sprites.destroyAllSpritesOfKind(SpriteKind.Heart)
        }
    }
})
forever(function () {
    if (SelectPlayerScreen == false) {
        pause(randint(30000, 60000))
        sprites.destroyAllSpritesOfKind(SpriteKind.shieldKIND)
        shield = sprites.create(assets.image`shield`, SpriteKind.shieldKIND)
        shield.setPosition(randint(20, 140), randint(30, 100))
        shield.setStayInScreen(true)
        animation.runImageAnimation(
        shield,
        assets.animation`shieldani`,
        250,
        true
        )
        if (tiles.tileAtLocationIsWall(shield.tilemapLocation())) {
            sprites.destroyAllSpritesOfKind(SpriteKind.shieldKIND)
        }
    }
})
forever(function () {
    if (shield_P1 == 1) {
        sprites.destroy(shieldUI_P1)
        shieldUI_P1 = sprites.create(assets.image`shieldUIROT`, SpriteKind.shieldlogo)
        shieldUI_P1.setPosition(35, 45)
    } else {
        sprites.destroy(shieldUI_P1)
    }
})
forever(function () {
    if (shield_P2 == 1) {
        sprites.destroy(shieldUI_P2)
        shieldUI_P2 = sprites.create(assets.image`shieldUIBLUE`, SpriteKind.shieldlogo)
        shieldUI_P2.setPosition(125, 45)
    } else {
        sprites.destroy(shieldUI_P2)
    }
})
