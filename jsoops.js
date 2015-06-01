(function (window) {
    if (!window.Jsoops) {
        window.Jsoops = {};
    }
    String.prototype.toCamelCase = function () {
        return this.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
            return letter.toUpperCase();
        }).replace(/\s+/g, '').replace(/_/g, '');
    };

    var j = window.Jsoops;
    /**
     * 
     * @param {type} sName
     * @param {type} fnConstructor
     * @returns {Jsoops_L1.j._checkNameSpace.base}
     */
    j._checkNameSpace = function (sName, fnConstructor) {
        var aNames = sName.split("\.");
        var base = window, len = aNames.length;
        for (var k = 0; k < len - 1; k++) {
            var i = aNames[k];

            if (!base.hasOwnProperty(i)) {
                base[i] = {};
            }
            base = base[i];
        }
        base[aNames[len - 1]] = fnConstructor;
        return base[aNames[len - 1]];
    };

    /**
     * Refering to namespace object
     * @param {string} sName
     * @returns {object} object reference of namespace.
     */
    j._getNameSpace = function (sName) {
        var aNames = sName.split("\.");
        var base = window, len = aNames.length;
        for (var k = 0; k < len; k++) {
            var i = aNames[k];

            if (!base.hasOwnProperty(i)) {
                base[i] = {};
            }
            base = base[i];
        }
        return base;
    };

    /**
     * 
     * @param {type} sName
     * @param {type} oConfig
     * @returns {window.JOOPS.defineClass.mem|oConfig.public|oConfig.static|Jsoops_L1.j.defineClass.jC|window.JOOPS.defineClass.jC}
     */
    j.defineClass = function (sName, oConfig) {
        /**
         * Constructing namespace and applying constructor to same.
         * Calling base constructor from inherited constructor if base class is available.
         * 
         * @type @exp;j@call;_checkNameSpace|@exp;Jsoops_L1@pro;j@pro;defineClass@pro;mem|@exp;Jsoops_L1@pro;j@pro;defineClass@pro;mem
         */
        var jC = j._checkNameSpace(sName, function () {
            if (oConfig.extend) {
                //referering to base class
                Object.defineProperty(this, "_base", {
                    value: oConfig.extend,
                    writable: false,
                    enumerable: false,
                    configurable: false
                });
            }
            oConfig.init = oConfig.init && typeof (oConfig.init) === "function" ? oConfig.init : function () {
            };
            //Calling constructor
            oConfig.init.apply(this, arguments);
        });

        //Inheriting base class properties.
        if (oConfig.extend) {
            var cBase = typeof (oConfig.extend) === "string" ? j._getNameSpace(oConfig.extend) : oConfig.extend;
            jC.prototype = Object.create(cBase.prototype);
        }

        
        Object.defineProperty(jC.prototype, "_class", {
            value: sName,
            writable: false,
            enumerable: false,
            configurable: true
        });

        Object.defineProperty(jC.prototype, "getClass", {
            value: function () {
                return j._getNameSpace(this._class)
            },
            writable: false,
            enumerable: false,
            configurable: true
        });

        Object.defineProperty(jC.prototype, "_type", {
            value: "class",
            writable: false,
            enumerable: false,
            configurable: true
        });

        Object.defineProperty(jC.prototype, "toString", {
            value: function () {
                return "[@" + this._class + "]";
            },
            writable: true,
            enumerable: false,
            configurable: true
        });

        Object.defineProperty(jC.prototype, "equals", {
            value: function (oTarget) {
                return oTarget === this;
            },
            writable: false,
            enumerable: false,
            configurable: true
        });

        /**
         * Defining instance members with setter and getters.
         */
        if (oConfig.public) {
            jC.prototype._mem = jC.prototype._mem ? jC.prototype._mem : {};
            for (var k in oConfig.public) {
                var mem = oConfig.public[k];
                if (typeof (mem) === "function") {
                    jC.prototype[k] = mem;
                } else {
                    jC.prototype._mem[k] = mem;
                    jC.prototype['get' + k.toCamelCase()] = Function("return this._mem['" + k + "']");
                    jC.prototype['set' + k.toCamelCase()] = Function("newValue", "this._mem['" + k + "'] = newValue");
                }
            }
        }

        /**
         * Defining static members.
         */
        if (oConfig.static) {
            for (var k in oConfig.static) {
                jC[k] = oConfig.static[k];
            }
        }

        return jC;
    };
})(window);
