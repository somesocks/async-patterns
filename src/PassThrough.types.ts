
import { Task } from './types';

export type PassThroughTask = Task & { __brand : 'PassThroughTask' };
