import { SvelteComponentTyped } from "svelte";
import type { Locale } from './locale';
declare const __propDef: {
    props: {
        /** Date value */ value?: Date | undefined;
        /** The earliest year the user can select */ min?: Date | undefined;
        /** The latest year the user can select */ max?: Date | undefined;
        /** Locale object for internationalization */ locale?: Locale | undefined;
    };
    events: {
        focusout: FocusEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type DatePickerProps = typeof __propDef.props;
export declare type DatePickerEvents = typeof __propDef.events;
export declare type DatePickerSlots = typeof __propDef.slots;
export default class DatePicker extends SvelteComponentTyped<DatePickerProps, DatePickerEvents, DatePickerSlots> {
}
export {};
