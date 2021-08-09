const { model, Schema } = require("mongoose");

const EventSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

// Here we specify how we want the model schema will serialize, we can specify other configurations here too.
EventSchema.method("toJSON", function () {
    // with "this" we are referencing current object that we are serializing
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;

    // We only changes how "_id" field will be showed in some response of any request,
    // and we discard "__v". It wont change atributes names on database, there will keep
    // the names "_id" and "__v"
    return object;
});

module.exports = model("Event", EventSchema);
