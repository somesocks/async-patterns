import Callback from './Callback';
declare type CallbackTask = (next: Callback, ...args: any[]) => void;
export default CallbackTask;
