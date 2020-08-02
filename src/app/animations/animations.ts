import { transition, state, style, animation, animate, trigger, useAnimation, keyframes } from '@angular/animations';

export const bombAnimation = animation([
    animate('2s linear', keyframes([
        style({
            offset: 0,
            transform: 'rotate(0)'
        }),
        style({
            offset: 0.25,
            transform: 'rotate(25deg)'
        }),
        style({
            offset: 0.75,
            transform: 'rotate(-25deg)'
        }),
        style({
            offset: 1,
            transform: 'rotate(0)'
        }),
    ]))
])


export const bomb = trigger('bomb',[
        state('*', style({
            transform: 'rotate(0)'
        })),
        transition('* => *', [
            useAnimation(bombAnimation)
        ])
    ]
)


export const fromTop = trigger('fromTop', [
    state('*', style({
        transform: 'translateY(0px)'
    })),
    state('void', style({
        transform: 'translateY(-10px)',
    })),
    transition(':enter, :leave', [
        animate('0.2s ease-in')
    ])
])

