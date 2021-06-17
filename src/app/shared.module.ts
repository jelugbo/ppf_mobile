import { NgModule, Directive, OnInit, EventEmitter, Output, OnDestroy, Input, ElementRef, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { DomSanitizer, BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ArrayFilterPipe } from './pipes/arrayfilterpipe';
import { SafePipe } from './pipes/safepipe';
import { TextImg } from './text-img/text-img';
import { BjAvatarComponent} from './bj-avatar/bj-avatar.component';

@NgModule({
    imports: [CommonModule

    ],
    declarations: [
        ArrayFilterPipe,
        SafePipe,
        TextImg,
        BjAvatarComponent
    ],
    exports: [
        ArrayFilterPipe,
        SafePipe,
        TextImg,
        BjAvatarComponent
    ]
})

export class SharedModule { }
