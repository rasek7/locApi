//Location model
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var locationSchema = new Schema({
	title: String,
	description: String,
	latitude: {type: Number, required: true, min: -85, max: 85},
	longitude: {type: Number, required: true, min: -180, max: 180},
	owners: [{type: Schema.Types.ObjectId, ref: 'User'}],
	updated_at: {type: Date},
	created_at: {type: Date}
});

locationSchema.index({'owners':1});

locationSchema.pre('save', function(next) {
	var now = new Date();
	this.updated_at = now;
	if (!this.created_at)
		this.created_at = now;

	next();
});

locationSchema.methods.toJSON = function() {
	var obj = this.toObject();
	delete obj.__v;
	return obj;
}

module.exports = mongoose.model('Location', locationSchema);
