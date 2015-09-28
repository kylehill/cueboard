"use strict";

;(function () {

  var setOptions = function setOptions(optionsObject, defaultKeyValues) {

    for (var key in defaultKeyValues) {
      if (!optionsObject.hasOwnProperty(key)) {
        optionsObject[key] = defaultKeyValues[key];
      }
    }

    return optionsObject;
  };

  var defaultKeyboardDefinition = {
    rows: [[{ type: "dual", top: "~", bottom: "`" }, { type: "dual", top: "!", bottom: "1" }, { type: "dual", top: "@", bottom: "2" }, { type: "dual", top: "#", bottom: "3" }, { type: "dual", top: "$", bottom: "4" }, { type: "dual", top: "%", bottom: "5" }, { type: "dual", top: "^", bottom: "6" }, { type: "dual", top: "&", bottom: "7" }, { type: "dual", top: "*", bottom: "8" }, { type: "dual", top: "(", bottom: "9" }, { type: "dual", top: ")", bottom: "0" }, { type: "dual", top: "_", bottom: "-" }, { type: "dual", top: "+", bottom: "=" }, { type: "bottom-right", text: "Delete", width: 1.4 }], [{ type: "bottom-left", text: "Tab", width: 1.4 }, { type: "center", text: "Q" }, { type: "center", text: "W" }, { type: "center", text: "E" }, { type: "center", text: "R" }, { type: "center", text: "T" }, { type: "center", text: "Y" }, { type: "center", text: "U" }, { type: "center", text: "I" }, { type: "center", text: "O" }, { type: "center", text: "P" }, { type: "dual", top: "{", bottom: "[" }, { type: "dual", top: "}", bottom: "]" }, { type: "dual", top: "|", bottom: "\\" }], [{ type: "bottom-left", text: "Caps Lock", width: 1.8 }, { type: "center", text: "A" }, { type: "center", text: "S" }, { type: "center", text: "D" }, { type: "center", text: "F" }, { type: "center", text: "G" }, { type: "center", text: "H" }, { type: "center", text: "J" }, { type: "center", text: "K" }, { type: "center", text: "L" }, { type: "dual", top: ":", bottom: ";" }, { type: "dual", top: "\"", bottom: "'" }, { type: "bottom-right", text: "Return", width: 1.8 }], [{ type: "bottom-left", name: "Left-Shift", text: "Shift", width: 2.4 }, { type: "center", text: "Z" }, { type: "center", text: "X" }, { type: "center", text: "C" }, { type: "center", text: "V" }, { type: "center", text: "B" }, { type: "center", text: "N" }, { type: "center", text: "M" }, { type: "dual", top: "<", bottom: "," }, { type: "dual", top: ">", bottom: "." }, { type: "dual", top: "?", bottom: "/" }, { type: "bottom-right", name: "Right-Shift", text: "Shift", width: 2.4 }], [{ type: "blank" }, { type: "blank" }, { type: "blank" }, { type: "blank" }, { type: "space", width: 6.2 }, { type: "blank" }, { type: "blank" }, { type: "blank" }, { type: "blank" }, { type: "blank" }]]
  };

  var buildKeyboard = function buildKeyboard(opts) {
    var keys = {},
        aliases = {};
    var $cb = $("<div class='cueboard js-cueboard'>");

    opts.keyboard.rows.forEach(function (row) {
      var $row = $("<div class='cueboard-row js-cueboard-row'>");
      $cb.append($row);

      row.forEach(function (key) {
        var $key = $("<div class='cueboard-key js-cueboard-key'>");
        var $keyText = $("<div class='cueboard-keytext'>");

        var keyObject = {
          state: "",
          changeState: function changeState(state) {
            this.$key.removeClass("cueboard-keystate-" + this.state);
            this.state = state;
            this.$key.addClass("cueboard-keystate-" + this.state);
          },
          $key: $key
        };
        keyObject.changeState(opts.keyState);

        switch (key.type) {
          case "dual":
            $key.addClass("cueboard-dual");
            $keyText.append("<div class='cueboard-key-top'>" + key.top + "</div>");
            $keyText.append("<div class='cueboard-key-bottom'>" + key.bottom + "</div>");

            keyObject.name = key.bottom;
            keyObject.alias = key.top;

            keys[key.bottom] = aliases[key.top] = keyObject;
            break;
          case "bottom-left":
            $key.addClass("cueboard-bottom-left");
            $keyText.text(key.text);

            keyObject.name = key.name || key.text;
            keys[keyObject.name] = keyObject;
            break;
          case "bottom-right":
            $key.addClass("cueboard-bottom-right");
            $keyText.text(key.text);

            keyObject.name = key.name || key.text;
            keys[keyObject.name] = keyObject;
            break;
          case "center":
            $key.addClass("cueboard-center");
            $keyText.text(key.text);

            keyObject.name = key.name || key.text;
            keys[keyObject.name] = aliases[keyObject.name.toLowerCase()] = keyObject;
            break;
          case "space":
            $key.addClass("cueboard-space");

            keyObject.name = "Space";
            keyObject.alias = " ";
            keys["Space"] = aliases[" "] = keyObject;
            break;
          case "blank":
          default:
            $key.addClass("cueboard-blank");
            keyObject.changeState("blank");
            break;
        }

        if (key.width) {
          $key.attr("data-cueboard-keywidth", key.width);
        }

        $key.append($keyText);
        $row.append($key);
      });
    });

    $(opts.selector).html($cb);

    var keysFunction = function keysFunction(key) {
      if (keys[key]) {
        return keys[key];
      }

      if (aliases[key]) {
        return aliases[key];
      }

      return false;
    };

    return {
      keys: keysFunction,
      $cb: $cb
    };
  };

  var Cueboard = function Cueboard(selector) {
    var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    opts = setOptions(opts, {
      keyboard: defaultKeyboardDefinition,
      selector: selector,
      keyState: "inactive"
    });

    var instance = buildKeyboard(opts);
    var state = {
      active: {},
      next: false
    };

    return {

      activate: function activate(optionalKeyOrKeyArray) {
        if (optionalKeyOrKeyArray.constructor === Array) {
          return optionalKeyOrKeyArray.forEach(this.activate);
        }

        instance.keys(optionalKeyOrKeyArray).changeState("active");
        state.active[optionalKeyOrKeyArray] = true;
      },

      deactivate: function deactivate(optionalKeyOrKeyArray) {
        if (optionalKeyOrKeyArray.constructor === Array) {
          return optionalKeyOrKeyArray.forEach(this.deactivate);
        }

        instance.keys(optionalKeyOrKeyArray).changeState("inactive");
        state.active[optionalKeyOrKeyArray] = false;
      },

      next: function next(optionalKey) {
        if (state.next) {
          this.activate(state.next);
        }
        state.next = false;

        instance.keys(optionalKey).changeState("next");
        state.next = optionalKey;
      }

    };
  };

  var PackageDefinition = Cueboard;
  var PackageName = "cueboard";

  if ("undefined" !== typeof exports) module.exports = PackageDefinition;else if ("function" === typeof define && define.amd) {
    define(PackageName, function () {
      return PackageDefinition;
    });
  } else window[PackageName] = PackageDefinition;
})();