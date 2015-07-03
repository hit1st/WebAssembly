var types = require("../types"),
    util = require("../util");

/**
 * A global variable.
 * @constructor
 * @param {!Assembly} assembly
 * @param {number} type
 * @param {string=} name
 * @exports reflect.GlobalVariable
 */
function GlobalVariable(assembly,  type, importName) {

    /**
     * Assembly reference.
     * @type {!Assembly}
     */
    this.assembly = assembly;

    /**
     * Variable type.
     * @type {number}
     */
    this.type = type;

    /**
     * Import name if not zero.
     * @type {?string}
     */
    this.importName = importName || null;
}

module.exports = GlobalVariable;

/**
 * Global variable index.
 * @name GlobalVariable#index
 * @type {number}
 */
Object.defineProperty(GlobalVariable.prototype, "index", {
    get: function() {
        return this.assembly.globalVariables.indexOf(this);
    }
});

/**
 * Indexed name.
 * @name GlobalVariable#name
 * @type {string}
 */
Object.defineProperty(GlobalVariable.prototype, "name", {
    get: function() {
        return this.assembly.globalName(this.index, "$"+util.variablePrefix(this.type));
    }
});

/**
 * Returns a string representation of this global variable.
 * @returns {string}
 */
GlobalVariable.prototype.toString = function() {
    return "GlobalVariable " + this.name
         + " idx:" + this.index
         + " type:" + types.TypeNames[this.type]
         + " val:" + (this.importName === null ? "0" : "foreign."+this.importName);
};
