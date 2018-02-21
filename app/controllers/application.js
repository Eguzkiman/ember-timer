import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
	time: null,
	ms: 240000,
	final: computed('time', 'ms', function () {
		return this.get('ms') - this.get('time');
	})
});
