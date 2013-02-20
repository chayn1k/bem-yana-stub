(function(HANDLER, UTIL) {

var ResponseHandler = inherit({
    __constructor : function(name, params, processor) {
        this._name = name;
        this._params = UTIL.merge(this._getDefaultParams(), params);
        this._processor = processor;
    },

    /**
     * @public
     */
    run : function() {
        throw 'not implemented';
    },

    /**
     * @protected
     * @param {String} handler
     * @param {Object} [params]
     */
    _runHandler : function(handler, params) {
        return this._processor.runHandler(handler, params, this._name);
    },

    /**
     * @protected
     * @param {String} handler
     */
    _releaseHandler : function(handler) {
        this._processor.releaseHandler(handler, this._name);
    },

    _getDefaultParams : function() {
        return {};
    }
}, {
    isBulk : function() {
        return false;
    },

    mergeParams : function(params) {
        throw 'not implemented';
    },

    getFutureHandlers : function() {
        return [];
    }
});


var responses = HANDLER._responses = {};

HANDLER.declResponse = function(decl, props, staticProps) {
    typeof decl === 'string' && (decl = { block : decl });

    if(decl.base && !responses[decl.base])
        throw Error('Base response handler "' + decl.base + '" is not defined!');

    var base = responses[decl.base || decl.block] || ResponseHandler;

    (responses[decl.block] = inherit(base, props, staticProps))._name = decl.block;
};

}(BEM.HANDLER, BEM.UTIL));