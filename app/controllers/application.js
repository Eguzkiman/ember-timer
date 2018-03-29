import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
	time: 180000,
	ms: 180000,
	final: computed('time', 'ms', function () {
		let ms = this.get('ms');
		let time = this.get('time');
		return ms - time;
	}),
	actions: {
		onFinish () {
			alert("finished!")
		}
	}
});
