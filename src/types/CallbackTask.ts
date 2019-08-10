
import Callback from './Callback';

type CallbackTask = (next : Callback, ...args : any[]) => void;

export default CallbackTask;
