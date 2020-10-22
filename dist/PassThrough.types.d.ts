import { Task } from './types';
export declare type PassThroughTask = Task & {
    __brand: 'PassThroughTask';
};
