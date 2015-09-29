;(function(){

  const setOptions = function(optionsObject, defaultKeyValues) {

    for (let key in defaultKeyValues) {
      if (!optionsObject.hasOwnProperty(key)) {
        optionsObject[key] = defaultKeyValues[key]
      }
    }

    return optionsObject
  }

  const defaultKeyboardDefinition = {
    rows: [ 
      [
        { type: "dual", top: "~", bottom: "`", aliases: [192] },
        { type: "dual", top: "!", bottom: "1", aliases: [49] },
        { type: "dual", top: "@", bottom: "2", aliases: [50] },
        { type: "dual", top: "#", bottom: "3", aliases: [51] },
        { type: "dual", top: "$", bottom: "4", aliases: [52] },
        { type: "dual", top: "%", bottom: "5", aliases: [53] },
        { type: "dual", top: "^", bottom: "6", aliases: [54] },
        { type: "dual", top: "&", bottom: "7", aliases: [55] },
        { type: "dual", top: "*", bottom: "8", aliases: [56] },
        { type: "dual", top: "(", bottom: "9", aliases: [57] },
        { type: "dual", top: ")", bottom: "0", aliases: [48] },
        { type: "dual", top: "_", bottom: "-", aliases: [189] },
        { type: "dual", top: "+", bottom: "=", aliases: [187] },
        { type: "bottom-right", text: "Delete", width: 1.4, aliases: ["U+0008", "Backspace"] }
      ],
      [
        { type: "bottom-left", text: "Tab", width: 1.4, aliases: ["U+0009"] },
        { type: "center", text: "Q", aliases: [81] },
        { type: "center", text: "W", aliases: [87] },
        { type: "center", text: "E", aliases: [69] },
        { type: "center", text: "R", aliases: [82] },
        { type: "center", text: "T", aliases: [84] },
        { type: "center", text: "Y", aliases: [89] },
        { type: "center", text: "U", aliases: [85] },
        { type: "center", text: "I", aliases: [73] },
        { type: "center", text: "O", aliases: [79] },
        { type: "center", text: "P", aliases: [80] },
        { type: "dual", top: "{", bottom: "[", aliases: [219] },
        { type: "dual", top: "}", bottom: "]", aliases: [221] },
        { type: "dual", top: "|", bottom: "\\", aliases: [220] },
      ],
      [
        { type: "bottom-left", text: "Caps Lock", aliases: ["CapsLock"], width: 1.8 },
        { type: "center", text: "A", aliases: [65] },
        { type: "center", text: "S", aliases: [83] },
        { type: "center", text: "D", aliases: [68] },
        { type: "center", text: "F", aliases: [70] },
        { type: "center", text: "G", aliases: [71] },
        { type: "center", text: "H", aliases: [72] },
        { type: "center", text: "J", aliases: [74] },
        { type: "center", text: "K", aliases: [75] },
        { type: "center", text: "L", aliases: [76] },
        { type: "dual", top: ":", bottom: ";", aliases: [186] },
        { type: "dual", top: "\"", bottom: "'", aliases: [222] },
        { type: "bottom-right", text: "Return", aliases: ["Enter"], width: 1.8 },
      ],
      [
        { type: "bottom-left", name:"Left-Shift", aliases: ["Shift"], text: "Shift", width: 2.4 },
        { type: "center", text: "Z", aliases: [90] },
        { type: "center", text: "X", aliases: [88] },
        { type: "center", text: "C", aliases: [67] },
        { type: "center", text: "V", aliases: [86] },
        { type: "center", text: "B", aliases: [66] },
        { type: "center", text: "N", aliases: [78] },
        { type: "center", text: "M", aliases: [77] },
        { type: "dual", top: "<", bottom: ",", aliases: [188] },
        { type: "dual", top: ">", bottom: ".", aliases: [190] },
        { type: "dual", top: "?", bottom: "/", aliases: [191] },
        { type: "bottom-right", name:"Right-Shift", text: "Shift", width: 2.4 }
      ],
      [
        { type: "blank" },
        { type: "blank" },
        { type: "blank" },
        { type: "blank" },
        { type: "space", width: 6.2, aliases: [32] },
        { type: "blank" },
        { type: "blank" },
        { type: "blank" },
        { type: "blank" },
        { type: "blank" },
      ]
    ]
  }

  const buildKeyboard = function(opts) {
    let keys = {}, aliases = {}
    let $cb = $("<div class='cueboard js-cueboard'>")
    
    opts.keyboard.rows.forEach(function(row){
      let $row = $("<div class='cueboard-row js-cueboard-row'>")
      $cb.append($row)

      row.forEach(function(key){
        let $key = $("<div class='cueboard-key js-cueboard-key'>")
        let $keyText = $("<div class='cueboard-keytext'>")

        let keyObject = {
          state: "",
          changeState: function(state) {
            this.$key.removeClass("cueboard-keystate-" + this.state)
            this.state = state
            this.$key.addClass("cueboard-keystate-" + this.state)
          },
          $key: $key
        }
        keyObject.changeState(opts.keyState)
        
        switch(key.type) {
          case "dual":
            $key.addClass("cueboard-dual")
            $keyText.append("<div class='cueboard-key-top'>" + key.top + "</div>")
            $keyText.append("<div class='cueboard-key-bottom'>" + key.bottom + "</div>")

            keyObject.name = key.bottom
            keyObject.alias = key.top

            keys[key.bottom] = aliases[key.top] = keyObject
            break
          case "bottom-left":
            $key.addClass("cueboard-bottom-left")
            $keyText.text(key.text)

            keyObject.name = key.name || key.text
            keys[keyObject.name] = keyObject
            break
          case "bottom-right":
            $key.addClass("cueboard-bottom-right")
            $keyText.text(key.text)
            
            keyObject.name = key.name || key.text
            keys[keyObject.name] = keyObject
            break
          case "center":
            $key.addClass("cueboard-center")
            $keyText.text(key.text)
            
            keyObject.name = key.name || key.text
            keys[keyObject.name] = aliases[keyObject.name.toLowerCase()] = keyObject
            break
          case "space":
            $key.addClass("cueboard-space")

            keyObject.name = "Space"
            keyObject.alias = " "
            keys["Space"] = aliases[" "] = keyObject
            break
          case "blank":
          default:
            $key.addClass("cueboard-blank")
            keyObject.changeState("blank")
            break
        }

        if (key.width) {
          $key.attr("data-cueboard-keywidth", key.width)
        }

        if (key.aliases) {
          key.aliases.forEach(function(alias){
            aliases[alias] = keyObject
          })
        }

        $key.append($keyText)
        $row.append($key)
      })
      
    })

    $(opts.selector).html($cb)

    const keysFunction = function(key) {
      if (keys[key]) {
        return keys[key]
      }

      if (aliases[key]) {
        return aliases[key]
      }

      return false
    }

    return {
      keys: keysFunction,
      $cb: $cb,
    }
  }

  const Cueboard = function(selector, opts = {}) {

    opts = setOptions(opts, {
      keyboard: defaultKeyboardDefinition,
      selector: selector,
      keyState: "inactive"
    })

    let instance = buildKeyboard(opts)
    let state = {
      active: {},
      next: false
    }

    return {
      
      changeState: function(state, optionalKeyOrKeyArray) {
        if (optionalKeyOrKeyArray && optionalKeyOrKeyArray.constructor === Array) {
          return optionalKeyOrKeyArray.forEach(function(key){
            this.changeState(state, key)
          }, this)
        }

        let key = instance.keys(optionalKeyOrKeyArray)
        key && key.changeState(state)
      }

    }

  }

  const PackageDefinition = Cueboard
  const PackageName = "cueboard"

  if ("undefined" !== typeof(exports)) module.exports = PackageDefinition
  else if ("function" === typeof(define) && define.amd) {
    define(PackageName, function() { return PackageDefinition })
  } else window[PackageName] = PackageDefinition

})();

