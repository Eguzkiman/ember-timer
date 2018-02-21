import Component from '@ember/component';
import moment from 'moment';
import { later } from '@ember/runloop';

export default Component.extend({
	time: null,
	isRunning: false,
	ms: 180000,

	init () {
		this._super(...arguments);
		let ms = this.get('ms')
		let saved = (new Date).getTime() + ms;
		this.set('saved', saved);
		this.send('reset');
	},
	tick () {
		let time = this.get('saved') - (new Date).getTime();
		this.set('time', moment(time).utc());
		later(() => {
			if (this.get('isRunning')) this.tick();
		});
	},
	actions: {
		start () {
			this.set('isRunning', true);
			this.tick();
		},
		stop () {
			this.set('isRunning', false);
		},
		reset () {
			let ms = this.get('ms');
			this.set('isRunning', false);
			this.set('time', moment(ms).utc());
		}
	}
});
