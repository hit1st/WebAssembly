var assert = require("assert"),
    types = require("../../types");

var BaseBehavior = require("./BaseBehavior"),
    SwitchCase = require("../SwitchCase");

/**
 * Switch behavior.
 * @param {string} name
 * @param {string} description
 * @constructor
 * @extends stmt.behavior.BaseBehavior
 * @exports stmt.behavior.SwitchBehavior
 */
function SwitchBehavior(name, description) {
    BaseBehavior.call(this, name, description);
}

module.exports = SwitchBehavior;

// Extends Behavior
SwitchBehavior.prototype = Object.create(BaseBehavior.prototype);

// opcode + number of cases + Expr<I32> condition + number of cases * ( SwitchCase type + respective (list of) Stmt )
// Stmt only, without imm

SwitchBehavior.prototype.read = function(s, code) {
    var count = s.varint();
    s.code(code);
    for (var i=0; i<count; ++i)
        s.read_case();
};

SwitchBehavior.prototype.validate = function(definition, stmt) {
    stmt.operands.forEach(function(operand, i) {
        assert(operand instanceof SwitchCase, this.name+" case "+i+" (operand "+i+") must be a SwitchCase");
    });
};

SwitchBehavior.prototype.write = function(s, stmt) {
    var count = stmt.operands.length;
    s.code(stmt.code);
    s.varint(count);
    for (var i=0; i<count; ++i)
        s.write_case(stmt.operands[i]);
};