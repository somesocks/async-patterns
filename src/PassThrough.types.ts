
import Task from './types/Task';

export type PassThroughTask = Task & { __brand : 'PassThroughTask' };
