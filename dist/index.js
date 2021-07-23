require('./sourcemap-register.js');/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 7351:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issue = exports.issueCommand = void 0;
const os = __importStar(__nccwpck_require__(2087));
const utils_1 = __nccwpck_require__(5278);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 2186:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
const command_1 = __nccwpck_require__(7351);
const file_command_1 = __nccwpck_require__(717);
const utils_1 = __nccwpck_require__(5278);
const os = __importStar(__nccwpck_require__(2087));
const path = __importStar(__nccwpck_require__(5622));
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand('ENV', commandValue);
    }
    else {
        command_1.issueCommand('set-env', { name }, convertedVal);
    }
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    if (options && options.trimWhitespace === false) {
        return val;
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 *
 */
function getMultilineInput(name, options) {
    const inputs = getInput(name, options)
        .split('\n')
        .filter(x => x !== '');
    return inputs;
}
exports.getMultilineInput = getMultilineInput;
/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */
function getBooleanInput(name, options) {
    const trueValue = ['true', 'True', 'TRUE'];
    const falseValue = ['false', 'False', 'FALSE'];
    const val = getInput(name, options);
    if (trueValue.includes(val))
        return true;
    if (falseValue.includes(val))
        return false;
    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` +
        `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
}
exports.getBooleanInput = getBooleanInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    process.stdout.write(os.EOL);
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 */
function error(message) {
    command_1.issue('error', message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds an warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 */
function warning(message) {
    command_1.issue('warning', message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 717:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

// For internal use, subject to change.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issueCommand = void 0;
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__nccwpck_require__(5747));
const os = __importStar(__nccwpck_require__(2087));
const utils_1 = __nccwpck_require__(5278);
function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueCommand = issueCommand;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 5278:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toCommandValue = void 0;
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 1748:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


// Runtime header offsets
const ID_OFFSET = -8;
const SIZE_OFFSET = -4;

// Runtime ids
const ARRAYBUFFER_ID = 0;
const STRING_ID = 1;
const ARRAYBUFFERVIEW_ID = 2;

// Runtime type information
const ARRAYBUFFERVIEW = 1 << 0;
const ARRAY = 1 << 1;
const SET = (/* unused pure expression or super */ null && (1 << 2));
const MAP = (/* unused pure expression or super */ null && (1 << 3));
const VAL_ALIGN_OFFSET = 5;
const VAL_ALIGN = 1 << VAL_ALIGN_OFFSET;
const VAL_SIGNED = 1 << 10;
const VAL_FLOAT = 1 << 11;
const VAL_NULLABLE = (/* unused pure expression or super */ null && (1 << 12));
const VAL_MANAGED = 1 << 13;
const KEY_ALIGN_OFFSET = 14;
const KEY_ALIGN = 1 << KEY_ALIGN_OFFSET;
const KEY_SIGNED = (/* unused pure expression or super */ null && (1 << 19));
const KEY_FLOAT = (/* unused pure expression or super */ null && (1 << 20));
const KEY_NULLABLE = (/* unused pure expression or super */ null && (1 << 21));
const KEY_MANAGED = (/* unused pure expression or super */ null && (1 << 22));

// Array(BufferView) layout
const ARRAYBUFFERVIEW_BUFFER_OFFSET = 0;
const ARRAYBUFFERVIEW_DATASTART_OFFSET = 4;
const ARRAYBUFFERVIEW_DATALENGTH_OFFSET = 8;
const ARRAYBUFFERVIEW_SIZE = 12;
const ARRAY_LENGTH_OFFSET = 12;
const ARRAY_SIZE = 16;

const BIGINT = typeof BigUint64Array !== "undefined";
const THIS = Symbol();
const CHUNKSIZE = 1024;

/** Gets a string from an U32 and an U16 view on a memory. */
function getStringImpl(buffer, ptr) {
  const U32 = new Uint32Array(buffer);
  const U16 = new Uint16Array(buffer);
  var length = U32[(ptr + SIZE_OFFSET) >>> 2] >>> 1;
  var offset = ptr >>> 1;
  if (length <= CHUNKSIZE) return String.fromCharCode.apply(String, U16.subarray(offset, offset + length));
  const parts = [];
  do {
    const last = U16[offset + CHUNKSIZE - 1];
    const size = last >= 0xD800 && last < 0xDC00 ? CHUNKSIZE - 1 : CHUNKSIZE;
    parts.push(String.fromCharCode.apply(String, U16.subarray(offset, offset += size)));
    length -= size;
  } while (length > CHUNKSIZE);
  return parts.join("") + String.fromCharCode.apply(String, U16.subarray(offset, offset + length));
}

/** Prepares the base module prior to instantiation. */
function preInstantiate(imports) {
  const baseModule = {};

  function getString(memory, ptr) {
    if (!memory) return "<yet unknown>";
    return getStringImpl(memory.buffer, ptr);
  }

  // add common imports used by stdlib for convenience
  const env = (imports.env = imports.env || {});
  env.abort = env.abort || function abort(mesg, file, line, colm) {
    const memory = baseModule.memory || env.memory; // prefer exported, otherwise try imported
    throw Error("abort: " + getString(memory, mesg) + " at " + getString(memory, file) + ":" + line + ":" + colm);
  }
  env.trace = env.trace || function trace(mesg, n) {
    const memory = baseModule.memory || env.memory;
    console.log("trace: " + getString(memory, mesg) + (n ? " " : "") + Array.prototype.slice.call(arguments, 2, 2 + n).join(", "));
  }
  imports.Math = imports.Math || Math;
  imports.Date = imports.Date || Date;

  return baseModule;
}

/** Prepares the final module once instantiation is complete. */
function postInstantiate(baseModule, instance) {
  const rawExports = instance.exports;
  const memory = rawExports.memory;
  const table = rawExports.table;
  const alloc = rawExports["__alloc"];
  const retain = rawExports["__retain"];
  const rttiBase = rawExports["__rtti_base"] || ~0; // oob if not present

  /** Gets the runtime type info for the given id. */
  function getInfo(id) {
    const U32 = new Uint32Array(memory.buffer);
    const count = U32[rttiBase >>> 2];
    if ((id >>>= 0) >= count) throw Error("invalid id: " + id);
    return U32[(rttiBase + 4 >>> 2) + id * 2];
  }

  /** Gets the runtime base id for the given id. */
  function getBase(id) {
    const U32 = new Uint32Array(memory.buffer);
    const count = U32[rttiBase >>> 2];
    if ((id >>>= 0) >= count) throw Error("invalid id: " + id);
    return U32[(rttiBase + 4 >>> 2) + id * 2 + 1];
  }

  /** Gets the runtime alignment of a collection's values. */
  function getValueAlign(info) {
    return 31 - Math.clz32((info >>> VAL_ALIGN_OFFSET) & 31); // -1 if none
  }

  /** Gets the runtime alignment of a collection's keys. */
  function getKeyAlign(info) {
    return 31 - Math.clz32((info >>> KEY_ALIGN_OFFSET) & 31); // -1 if none
  }

  /** Allocates a new string in the module's memory and returns its retained pointer. */
  function __allocString(str) {
    const length = str.length;
    const ptr = alloc(length << 1, STRING_ID);
    const U16 = new Uint16Array(memory.buffer);
    for (var i = 0, p = ptr >>> 1; i < length; ++i) U16[p + i] = str.charCodeAt(i);
    return ptr;
  }

  baseModule.__allocString = __allocString;

  /** Reads a string from the module's memory by its pointer. */
  function __getString(ptr) {
    const buffer = memory.buffer;
    const id = new Uint32Array(buffer)[ptr + ID_OFFSET >>> 2];
    if (id !== STRING_ID) throw Error("not a string: " + ptr);
    return getStringImpl(buffer, ptr);
  }

  baseModule.__getString = __getString;

  /** Gets the view matching the specified alignment, signedness and floatness. */
  function getView(alignLog2, signed, float) {
    const buffer = memory.buffer;
    if (float) {
      switch (alignLog2) {
        case 2: return new Float32Array(buffer);
        case 3: return new Float64Array(buffer);
      }
    } else {
      switch (alignLog2) {
        case 0: return new (signed ? Int8Array : Uint8Array)(buffer);
        case 1: return new (signed ? Int16Array : Uint16Array)(buffer);
        case 2: return new (signed ? Int32Array : Uint32Array)(buffer);
        case 3: return new (signed ? BigInt64Array : BigUint64Array)(buffer);
      }
    }
    throw Error("unsupported align: " + alignLog2);
  }

  /** Allocates a new array in the module's memory and returns its retained pointer. */
  function __allocArray(id, values) {
    const info = getInfo(id);
    if (!(info & (ARRAYBUFFERVIEW | ARRAY))) throw Error("not an array: " + id + " @ " + info);
    const align = getValueAlign(info);
    const length = values.length;
    const buf = alloc(length << align, ARRAYBUFFER_ID);
    const arr = alloc(info & ARRAY ? ARRAY_SIZE : ARRAYBUFFERVIEW_SIZE, id);
    const U32 = new Uint32Array(memory.buffer);
    U32[arr + ARRAYBUFFERVIEW_BUFFER_OFFSET >>> 2] = retain(buf);
    U32[arr + ARRAYBUFFERVIEW_DATASTART_OFFSET >>> 2] = buf;
    U32[arr + ARRAYBUFFERVIEW_DATALENGTH_OFFSET >>> 2] = length << align;
    if (info & ARRAY) U32[arr + ARRAY_LENGTH_OFFSET >>> 2] = length;
    const view = getView(align, info & VAL_SIGNED, info & VAL_FLOAT);
    if (info & VAL_MANAGED) {
      for (let i = 0; i < length; ++i) view[(buf >>> align) + i] = retain(values[i]);
    } else {
      view.set(values, buf >>> align);
    }
    return arr;
  }

  baseModule.__allocArray = __allocArray;

  /** Gets a live view on an array's values in the module's memory. Infers the array type from RTTI. */
  function __getArrayView(arr) {
    const U32 = new Uint32Array(memory.buffer);
    const id = U32[arr + ID_OFFSET >>> 2];
    const info = getInfo(id);
    if (!(info & ARRAYBUFFERVIEW)) throw Error("not an array: " + id);
    const align = getValueAlign(info);
    var buf = U32[arr + ARRAYBUFFERVIEW_DATASTART_OFFSET >>> 2];
    const length = info & ARRAY
      ? U32[arr + ARRAY_LENGTH_OFFSET >>> 2]
      : U32[buf + SIZE_OFFSET >>> 2] >>> align;
    return getView(align, info & VAL_SIGNED, info & VAL_FLOAT)
          .subarray(buf >>>= align, buf + length);
  }

  baseModule.__getArrayView = __getArrayView;

  /** Copies an array's values from the module's memory. Infers the array type from RTTI. */
  function __getArray(arr) {
    const input = __getArrayView(arr);
    const len = input.length;
    const out = new Array(len);
    for (let i = 0; i < len; i++) out[i] = input[i];
    return out;
  }

  baseModule.__getArray = __getArray;

  /** Copies an ArrayBuffer's value from the module's memory. */
  function __getArrayBuffer(ptr) {
    const buffer = memory.buffer;
    const length = new Uint32Array(buffer)[ptr + SIZE_OFFSET >>> 2];
    return buffer.slice(ptr, ptr + length);
  }

  baseModule.__getArrayBuffer = __getArrayBuffer;

  /** Copies a typed array's values from the module's memory. */
  function getTypedArray(Type, alignLog2, ptr) {
    return new Type(getTypedArrayView(Type, alignLog2, ptr));
  }

  /** Gets a live view on a typed array's values in the module's memory. */
  function getTypedArrayView(Type, alignLog2, ptr) {
    const buffer = memory.buffer;
    const U32 = new Uint32Array(buffer);
    const bufPtr = U32[ptr + ARRAYBUFFERVIEW_DATASTART_OFFSET >>> 2];
    return new Type(buffer, bufPtr, U32[bufPtr + SIZE_OFFSET >>> 2] >>> alignLog2);
  }

  baseModule.__getInt8Array = getTypedArray.bind(null, Int8Array, 0);
  baseModule.__getInt8ArrayView = getTypedArrayView.bind(null, Int8Array, 0);
  baseModule.__getUint8Array = getTypedArray.bind(null, Uint8Array, 0);
  baseModule.__getUint8ArrayView = getTypedArrayView.bind(null, Uint8Array, 0);
  baseModule.__getUint8ClampedArray = getTypedArray.bind(null, Uint8ClampedArray, 0);
  baseModule.__getUint8ClampedArrayView = getTypedArrayView.bind(null, Uint8ClampedArray, 0);
  baseModule.__getInt16Array = getTypedArray.bind(null, Int16Array, 1);
  baseModule.__getInt16ArrayView = getTypedArrayView.bind(null, Int16Array, 1);
  baseModule.__getUint16Array = getTypedArray.bind(null, Uint16Array, 1);
  baseModule.__getUint16ArrayView = getTypedArrayView.bind(null, Uint16Array, 1);
  baseModule.__getInt32Array = getTypedArray.bind(null, Int32Array, 2);
  baseModule.__getInt32ArrayView = getTypedArrayView.bind(null, Int32Array, 2);
  baseModule.__getUint32Array = getTypedArray.bind(null, Uint32Array, 2);
  baseModule.__getUint32ArrayView = getTypedArrayView.bind(null, Uint32Array, 2);
  if (BIGINT) {
    baseModule.__getInt64Array = getTypedArray.bind(null, BigInt64Array, 3);
    baseModule.__getInt64ArrayView = getTypedArrayView.bind(null, BigInt64Array, 3);
    baseModule.__getUint64Array = getTypedArray.bind(null, BigUint64Array, 3);
    baseModule.__getUint64ArrayView = getTypedArrayView.bind(null, BigUint64Array, 3);
  }
  baseModule.__getFloat32Array = getTypedArray.bind(null, Float32Array, 2);
  baseModule.__getFloat32ArrayView = getTypedArrayView.bind(null, Float32Array, 2);
  baseModule.__getFloat64Array = getTypedArray.bind(null, Float64Array, 3);
  baseModule.__getFloat64ArrayView = getTypedArrayView.bind(null, Float64Array, 3);

  /** Tests whether an object is an instance of the class represented by the specified base id. */
  function __instanceof(ptr, baseId) {
    const U32 = new Uint32Array(memory.buffer);
    var id = U32[(ptr + ID_OFFSET) >>> 2];
    if (id <= U32[rttiBase >>> 2]) {
      do if (id == baseId) return true;
      while (id = getBase(id));
    }
    return false;
  }

  baseModule.__instanceof = __instanceof;

  // Pull basic exports to baseModule so code in preInstantiate can use them
  baseModule.memory = baseModule.memory || memory;
  baseModule.table  = baseModule.table  || table;

  // Demangle exports and provide the usual utility on the prototype
  return demangle(rawExports, baseModule);
}

function isResponse(o) {
  return typeof Response !== "undefined" && o instanceof Response;
}

/** Asynchronously instantiates an AssemblyScript module from anything that can be instantiated. */
async function instantiate(source, imports) {
  if (isResponse(source = await source)) return instantiateStreaming(source, imports);
  return postInstantiate(
    preInstantiate(imports || (imports = {})),
    await WebAssembly.instantiate(
      source instanceof WebAssembly.Module
        ? source
        : await WebAssembly.compile(source),
      imports
    )
  );
}

exports.instantiate = instantiate;

/** Synchronously instantiates an AssemblyScript module from a WebAssembly.Module or binary buffer. */
function instantiateSync(source, imports) {
  return postInstantiate(
    preInstantiate(imports || (imports = {})),
    new WebAssembly.Instance(
      source instanceof WebAssembly.Module
        ? source
        : new WebAssembly.Module(source),
      imports
    )
  )
}

exports.instantiateSync = instantiateSync;

/** Asynchronously instantiates an AssemblyScript module from a response, i.e. as obtained by `fetch`. */
async function instantiateStreaming(source, imports) {
  if (!WebAssembly.instantiateStreaming) {
    return instantiate(
      isResponse(source = await source)
        ? source.arrayBuffer()
        : source,
      imports
    );
  }
  return postInstantiate(
    preInstantiate(imports || (imports = {})),
    (await WebAssembly.instantiateStreaming(source, imports)).instance
  );
}

exports.instantiateStreaming = instantiateStreaming;

/** Demangles an AssemblyScript module's exports to a friendly object structure. */
function demangle(exports, baseModule) {
  var module = baseModule ? Object.create(baseModule) : {};
  var setArgumentsLength = exports["__argumentsLength"]
    ? function(length) { exports["__argumentsLength"].value = length; }
    : exports["__setArgumentsLength"] || exports["__setargc"] || function() {};
  for (let internalName in exports) {
    if (!Object.prototype.hasOwnProperty.call(exports, internalName)) continue;
    const elem = exports[internalName];
    let parts = internalName.split(".");
    let curr = module;
    while (parts.length > 1) {
      let part = parts.shift();
      if (!Object.prototype.hasOwnProperty.call(curr, part)) curr[part] = {};
      curr = curr[part];
    }
    let name = parts[0];
    let hash = name.indexOf("#");
    if (hash >= 0) {
      let className = name.substring(0, hash);
      let classElem = curr[className];
      if (typeof classElem === "undefined" || !classElem.prototype) {
        let ctor = function(...args) {
          return ctor.wrap(ctor.prototype.constructor(0, ...args));
        };
        ctor.prototype = {
          valueOf: function valueOf() {
            return this[THIS];
          }
        };
        ctor.wrap = function(thisValue) {
          return Object.create(ctor.prototype, { [THIS]: { value: thisValue, writable: false } });
        };
        if (classElem) Object.getOwnPropertyNames(classElem).forEach(name =>
          Object.defineProperty(ctor, name, Object.getOwnPropertyDescriptor(classElem, name))
        );
        curr[className] = ctor;
      }
      name = name.substring(hash + 1);
      curr = curr[className].prototype;
      if (/^(get|set):/.test(name)) {
        if (!Object.prototype.hasOwnProperty.call(curr, name = name.substring(4))) {
          let getter = exports[internalName.replace("set:", "get:")];
          let setter = exports[internalName.replace("get:", "set:")];
          Object.defineProperty(curr, name, {
            get: function() { return getter(this[THIS]); },
            set: function(value) { setter(this[THIS], value); },
            enumerable: true
          });
        }
      } else {
        if (name === 'constructor') {
          (curr[name] = (...args) => {
            setArgumentsLength(args.length);
            return elem(...args);
          }).original = elem;
        } else { // instance method
          (curr[name] = function(...args) { // !
            setArgumentsLength(args.length);
            return elem(this[THIS], ...args);
          }).original = elem;
        }
      }
    } else {
      if (/^(get|set):/.test(name)) {
        if (!Object.prototype.hasOwnProperty.call(curr, name = name.substring(4))) {
          Object.defineProperty(curr, name, {
            get: exports[internalName.replace("set:", "get:")],
            set: exports[internalName.replace("get:", "set:")],
            enumerable: true
          });
        }
      } else if (typeof elem === "function" && elem !== setArgumentsLength) {
        (curr[name] = (...args) => {
          setArgumentsLength(args.length);
          return elem(...args);
        }).original = elem;
      } else {
        curr[name] = elem;
      }
    }
  }
  return module;
}

exports.demangle = demangle;


/***/ }),

/***/ 2805:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var reader = __nccwpck_require__(7677);
var indexer = __nccwpck_require__(3038);
var iterator = __nccwpck_require__(8229);
var writer = __nccwpck_require__(9478);
var indexedReader = __nccwpck_require__(4378);



exports.CarReader = reader.CarReader;
exports.CarIndexer = indexer.CarIndexer;
exports.CarBlockIterator = iterator.CarBlockIterator;
exports.CarCIDIterator = iterator.CarCIDIterator;
exports.CarWriter = writer.CarWriter;
exports.CarIndexedReader = indexedReader.CarIndexedReader;


/***/ }),

/***/ 7490:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var varint = __nccwpck_require__(8018);
var cid = __nccwpck_require__(6447);
var Digest = __nccwpck_require__(76);
var dagCbor = __nccwpck_require__(6477);

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var varint__default = /*#__PURE__*/_interopDefaultLegacy(varint);
var Digest__namespace = /*#__PURE__*/_interopNamespace(Digest);

const CIDV0_BYTES = {
  SHA2_256: 18,
  LENGTH: 32,
  DAG_PB: 112
};
async function readVarint(reader) {
  const bytes = await reader.upTo(8);
  const i = varint__default['default'].decode(bytes);
  reader.seek(varint__default['default'].decode.bytes);
  return i;
}
async function readHeader(reader) {
  const length = await readVarint(reader);
  const header = await reader.exactly(length);
  reader.seek(length);
  const block = dagCbor.decode(header);
  if (block == null || Array.isArray(block) || typeof block !== 'object') {
    throw new Error('Invalid CAR header format');
  }
  if (block.version !== 1) {
    if (typeof block.version === 'string') {
      throw new Error(`Invalid CAR version: "${ block.version }"`);
    }
    throw new Error(`Invalid CAR version: ${ block.version }`);
  }
  if (!Array.isArray(block.roots)) {
    throw new Error('Invalid CAR header format');
  }
  if (Object.keys(block).filter(p => p !== 'roots' && p !== 'version').length) {
    throw new Error('Invalid CAR header format');
  }
  return block;
}
async function readMultihash(reader) {
  const bytes = await reader.upTo(8);
  varint__default['default'].decode(bytes);
  const codeLength = varint__default['default'].decode.bytes;
  const length = varint__default['default'].decode(bytes.subarray(varint__default['default'].decode.bytes));
  const lengthLength = varint__default['default'].decode.bytes;
  const mhLength = codeLength + lengthLength + length;
  const multihash = await reader.exactly(mhLength);
  reader.seek(mhLength);
  return multihash;
}
async function readCid(reader) {
  const first = await reader.exactly(2);
  if (first[0] === CIDV0_BYTES.SHA2_256 && first[1] === CIDV0_BYTES.LENGTH) {
    const bytes = await reader.exactly(34);
    reader.seek(34);
    const multihash = Digest__namespace.decode(bytes);
    return cid.CID.create(0, CIDV0_BYTES.DAG_PB, multihash);
  }
  const version = await readVarint(reader);
  if (version !== 1) {
    throw new Error(`Unexpected CID version (${ version })`);
  }
  const codec = await readVarint(reader);
  const bytes = await readMultihash(reader);
  const multihash = Digest__namespace.decode(bytes);
  return cid.CID.create(version, codec, multihash);
}
async function readBlockHead(reader) {
  const start = reader.pos;
  const length = await readVarint(reader) + (reader.pos - start);
  const cid = await readCid(reader);
  const blockLength = length - (reader.pos - start);
  return {
    cid,
    length,
    blockLength
  };
}
async function readBlock(reader) {
  const {cid, blockLength} = await readBlockHead(reader);
  const bytes = await reader.exactly(blockLength);
  reader.seek(blockLength);
  return {
    bytes,
    cid
  };
}
async function readBlockIndex(reader) {
  const offset = reader.pos;
  const {cid, length, blockLength} = await readBlockHead(reader);
  const index = {
    cid,
    length,
    blockLength,
    offset,
    blockOffset: reader.pos
  };
  reader.seek(index.blockLength);
  return index;
}
function createDecoder(reader) {
  const headerPromise = readHeader(reader);
  return {
    header: () => headerPromise,
    async *blocks() {
      await headerPromise;
      while ((await reader.upTo(8)).length > 0) {
        yield await readBlock(reader);
      }
    },
    async *blocksIndex() {
      await headerPromise;
      while ((await reader.upTo(8)).length > 0) {
        yield await readBlockIndex(reader);
      }
    }
  };
}
function bytesReader(bytes) {
  let pos = 0;
  return {
    async upTo(length) {
      return bytes.subarray(pos, pos + Math.min(length, bytes.length - pos));
    },
    async exactly(length) {
      if (length > bytes.length - pos) {
        throw new Error('Unexpected end of data');
      }
      return bytes.subarray(pos, pos + length);
    },
    seek(length) {
      pos += length;
    },
    get pos() {
      return pos;
    }
  };
}
function chunkReader(readChunk) {
  let pos = 0;
  let have = 0;
  let offset = 0;
  let currentChunk = new Uint8Array(0);
  const read = async length => {
    have = currentChunk.length - offset;
    const bufa = [currentChunk.subarray(offset)];
    while (have < length) {
      const chunk = await readChunk();
      if (chunk.length === 0) {
        break;
      }
      if (have < 0) {
        if (chunk.length > have) {
          bufa.push(chunk.subarray(-have));
        }
      } else {
        bufa.push(chunk);
      }
      have += chunk.length;
    }
    currentChunk = new Uint8Array(bufa.reduce((p, c) => p + c.length, 0));
    let off = 0;
    for (const b of bufa) {
      currentChunk.set(b, off);
      off += b.length;
    }
    offset = 0;
  };
  return {
    async upTo(length) {
      if (currentChunk.length - offset < length) {
        await read(length);
      }
      return currentChunk.subarray(offset, offset + Math.min(currentChunk.length - offset, length));
    },
    async exactly(length) {
      if (currentChunk.length - offset < length) {
        await read(length);
      }
      if (currentChunk.length - offset < length) {
        throw new Error('Unexpected end of data');
      }
      return currentChunk.subarray(offset, offset + length);
    },
    seek(length) {
      pos += length;
      offset += length;
    },
    get pos() {
      return pos;
    }
  };
}
function asyncIterableReader(asyncIterable) {
  const iterator = asyncIterable[Symbol.asyncIterator]();
  async function readChunk() {
    const next = await iterator.next();
    if (next.done) {
      return new Uint8Array(0);
    }
    return next.value;
  }
  return chunkReader(readChunk);
}

exports.asyncIterableReader = asyncIterableReader;
exports.bytesReader = bytesReader;
exports.chunkReader = chunkReader;
exports.createDecoder = createDecoder;
exports.readHeader = readHeader;


/***/ }),

/***/ 9464:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var varint = __nccwpck_require__(8018);
var dagCbor = __nccwpck_require__(6477);

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var varint__default = /*#__PURE__*/_interopDefaultLegacy(varint);

function createHeader(roots) {
  const headerBytes = dagCbor.encode({
    version: 1,
    roots
  });
  const varintBytes = varint__default['default'].encode(headerBytes.length);
  const header = new Uint8Array(varintBytes.length + headerBytes.length);
  header.set(varintBytes, 0);
  header.set(headerBytes, varintBytes.length);
  return header;
}
function createEncoder(writer) {
  return {
    async setRoots(roots) {
      const bytes = createHeader(roots);
      await writer.write(bytes);
    },
    async writeBlock(block) {
      const {cid, bytes} = block;
      await writer.write(new Uint8Array(varint__default['default'].encode(cid.bytes.length + bytes.length)));
      await writer.write(cid.bytes);
      await writer.write(bytes);
    },
    async close() {
      return writer.end();
    }
  };
}

exports.createEncoder = createEncoder;
exports.createHeader = createHeader;


/***/ }),

/***/ 4378:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var fs = __nccwpck_require__(5747);
var stream = __nccwpck_require__(2413);
var cid = __nccwpck_require__(6447);
var indexer = __nccwpck_require__(3038);
var reader = __nccwpck_require__(7677);

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);

class CarIndexedReader {
  constructor(version, path, roots, index, order) {
    this._version = version;
    this._path = path;
    this._roots = roots;
    this._index = index;
    this._order = order;
    this._fd = null;
  }
  get version() {
    return this._version;
  }
  async getRoots() {
    return this._roots;
  }
  async has(key) {
    return this._index.has(key.toString());
  }
  async get(key) {
    const blockIndex = this._index.get(key.toString());
    if (!blockIndex) {
      return undefined;
    }
    if (!this._fd) {
      this._fd = await fs__default['default'].promises.open(this._path, 'r');
    }
    const readIndex = {
      cid: key,
      length: 0,
      offset: 0,
      blockLength: blockIndex.blockLength,
      blockOffset: blockIndex.blockOffset
    };
    return reader.CarReader.readRaw(this._fd, readIndex);
  }
  async *blocks() {
    for (const cidStr of this._order) {
      const block = await this.get(cid.CID.parse(cidStr));
      if (!block) {
        throw new Error('Unexpected internal error');
      }
      yield block;
    }
  }
  async *cids() {
    for (const cidStr of this._order) {
      yield cid.CID.parse(cidStr);
    }
  }
  async close() {
    if (this._fd) {
      return this._fd.close();
    }
  }
  static async fromFile(path) {
    if (typeof path !== 'string') {
      throw new TypeError('fromFile() requires a file path string');
    }
    const iterable = await indexer.CarIndexer.fromIterable(stream.Readable.from(fs__default['default'].createReadStream(path)));
    const index = new Map();
    const order = [];
    for await (const {cid, blockLength, blockOffset} of iterable) {
      const cidStr = cid.toString();
      index.set(cidStr, {
        blockLength,
        blockOffset
      });
      order.push(cidStr);
    }
    return new CarIndexedReader(iterable.version, path, await iterable.getRoots(), index, order);
  }
}
const __browser = false;

exports.CarIndexedReader = CarIndexedReader;
exports.__browser = __browser;


/***/ }),

/***/ 3038:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var decoder = __nccwpck_require__(7490);

class CarIndexer {
  constructor(version, roots, iterator) {
    this._version = version;
    this._roots = roots;
    this._iterator = iterator;
  }
  get version() {
    return this._version;
  }
  async getRoots() {
    return this._roots;
  }
  [Symbol.asyncIterator]() {
    return this._iterator;
  }
  static async fromBytes(bytes) {
    if (!(bytes instanceof Uint8Array)) {
      throw new TypeError('fromBytes() requires a Uint8Array');
    }
    return decodeIndexerComplete(decoder.bytesReader(bytes));
  }
  static async fromIterable(asyncIterable) {
    if (!asyncIterable || !(typeof asyncIterable[Symbol.asyncIterator] === 'function')) {
      throw new TypeError('fromIterable() requires an async iterable');
    }
    return decodeIndexerComplete(decoder.asyncIterableReader(asyncIterable));
  }
}
async function decodeIndexerComplete(reader) {
  const decoder$1 = decoder.createDecoder(reader);
  const {version, roots} = await decoder$1.header();
  return new CarIndexer(version, roots, decoder$1.blocksIndex());
}

exports.CarIndexer = CarIndexer;


/***/ }),

/***/ 1330:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

function noop() {
}
function create() {
  const chunkQueue = [];
  let drainer = null;
  let drainerResolver = noop;
  let ended = false;
  let outWait = null;
  let outWaitResolver = noop;
  const makeDrainer = () => {
    if (!drainer) {
      drainer = new Promise(resolve => {
        drainerResolver = () => {
          drainer = null;
          drainerResolver = noop;
          resolve();
        };
      });
    }
    return drainer;
  };
  const writer = {
    write(chunk) {
      chunkQueue.push(chunk);
      const drainer = makeDrainer();
      outWaitResolver();
      return drainer;
    },
    async end() {
      ended = true;
      const drainer = makeDrainer();
      outWaitResolver();
      return drainer;
    }
  };
  const iterator = {
    async next() {
      const chunk = chunkQueue.shift();
      if (chunk) {
        if (chunkQueue.length === 0) {
          drainerResolver();
        }
        return {
          done: false,
          value: chunk
        };
      }
      if (ended) {
        drainerResolver();
        return {
          done: true,
          value: undefined
        };
      }
      if (!outWait) {
        outWait = new Promise(resolve => {
          outWaitResolver = () => {
            outWait = null;
            outWaitResolver = noop;
            return resolve(iterator.next());
          };
        });
      }
      return outWait;
    }
  };
  return {
    writer,
    iterator
  };
}

exports.create = create;


/***/ }),

/***/ 8229:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var decoder = __nccwpck_require__(7490);

class CarIteratorBase {
  constructor(version, roots, iterable) {
    this._version = version;
    this._roots = roots;
    this._iterable = iterable;
    this._decoded = false;
  }
  get version() {
    return this._version;
  }
  async getRoots() {
    return this._roots;
  }
}
class CarBlockIterator extends CarIteratorBase {
  [Symbol.asyncIterator]() {
    if (this._decoded) {
      throw new Error('Cannot decode more than once');
    }
    if (!this._iterable) {
      throw new Error('Block iterable not found');
    }
    this._decoded = true;
    return this._iterable[Symbol.asyncIterator]();
  }
  static async fromBytes(bytes) {
    const {version, roots, iterator} = await fromBytes(bytes);
    return new CarBlockIterator(version, roots, iterator);
  }
  static async fromIterable(asyncIterable) {
    const {version, roots, iterator} = await fromIterable(asyncIterable);
    return new CarBlockIterator(version, roots, iterator);
  }
}
class CarCIDIterator extends CarIteratorBase {
  [Symbol.asyncIterator]() {
    if (this._decoded) {
      throw new Error('Cannot decode more than once');
    }
    if (!this._iterable) {
      throw new Error('Block iterable not found');
    }
    this._decoded = true;
    const iterable = this._iterable[Symbol.asyncIterator]();
    return {
      async next() {
        const next = await iterable.next();
        if (next.done) {
          return next;
        }
        return {
          done: false,
          value: next.value.cid
        };
      }
    };
  }
  static async fromBytes(bytes) {
    const {version, roots, iterator} = await fromBytes(bytes);
    return new CarCIDIterator(version, roots, iterator);
  }
  static async fromIterable(asyncIterable) {
    const {version, roots, iterator} = await fromIterable(asyncIterable);
    return new CarCIDIterator(version, roots, iterator);
  }
}
async function fromBytes(bytes) {
  if (!(bytes instanceof Uint8Array)) {
    throw new TypeError('fromBytes() requires a Uint8Array');
  }
  return decodeIterator(decoder.bytesReader(bytes));
}
async function fromIterable(asyncIterable) {
  if (!asyncIterable || !(typeof asyncIterable[Symbol.asyncIterator] === 'function')) {
    throw new TypeError('fromIterable() requires an async iterable');
  }
  return decodeIterator(decoder.asyncIterableReader(asyncIterable));
}
async function decodeIterator(reader) {
  const decoder$1 = decoder.createDecoder(reader);
  const {version, roots} = await decoder$1.header();
  return {
    version,
    roots,
    iterator: decoder$1.blocks()
  };
}

exports.CarBlockIterator = CarBlockIterator;
exports.CarCIDIterator = CarCIDIterator;
exports.CarIteratorBase = CarIteratorBase;


/***/ }),

/***/ 1599:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var decoder = __nccwpck_require__(7490);

class CarReader {
  constructor(version, roots, blocks) {
    this._version = version;
    this._roots = roots;
    this._blocks = blocks;
    this._keys = blocks.map(b => b.cid.toString());
  }
  get version() {
    return this._version;
  }
  async getRoots() {
    return this._roots;
  }
  async has(key) {
    return this._keys.indexOf(key.toString()) > -1;
  }
  async get(key) {
    const index = this._keys.indexOf(key.toString());
    return index > -1 ? this._blocks[index] : undefined;
  }
  async *blocks() {
    for (const block of this._blocks) {
      yield block;
    }
  }
  async *cids() {
    for (const block of this._blocks) {
      yield block.cid;
    }
  }
  static async fromBytes(bytes) {
    if (!(bytes instanceof Uint8Array)) {
      throw new TypeError('fromBytes() requires a Uint8Array');
    }
    return decodeReaderComplete(decoder.bytesReader(bytes));
  }
  static async fromIterable(asyncIterable) {
    if (!asyncIterable || !(typeof asyncIterable[Symbol.asyncIterator] === 'function')) {
      throw new TypeError('fromIterable() requires an async iterable');
    }
    return decodeReaderComplete(decoder.asyncIterableReader(asyncIterable));
  }
}
async function decodeReaderComplete(reader) {
  const decoder$1 = decoder.createDecoder(reader);
  const {version, roots} = await decoder$1.header();
  const blocks = [];
  for await (const block of decoder$1.blocks()) {
    blocks.push(block);
  }
  return new CarReader(version, roots, blocks);
}
const __browser = true;

exports.CarReader = CarReader;
exports.__browser = __browser;


/***/ }),

/***/ 7677:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var fs = __nccwpck_require__(5747);
var util = __nccwpck_require__(1669);
var readerBrowser = __nccwpck_require__(1599);

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);

const fsread = util.promisify(fs__default['default'].read);
class CarReader extends readerBrowser.CarReader {
  static async readRaw(fd, blockIndex) {
    const {cid, blockLength, blockOffset} = blockIndex;
    const bytes = new Uint8Array(blockLength);
    let read;
    if (typeof fd === 'number') {
      read = (await fsread(fd, bytes, 0, blockLength, blockOffset)).bytesRead;
    } else if (typeof fd === 'object' && typeof fd.read === 'function') {
      read = (await fd.read(bytes, 0, blockLength, blockOffset)).bytesRead;
    } else {
      throw new TypeError('Bad fd');
    }
    if (read !== blockLength) {
      throw new Error(`Failed to read entire block (${ read } instead of ${ blockLength })`);
    }
    return {
      cid,
      bytes
    };
  }
}
const __browser = false;

exports.CarReader = CarReader;
exports.__browser = __browser;


/***/ }),

/***/ 5479:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var cid = __nccwpck_require__(6447);
var encoder = __nccwpck_require__(9464);
var iteratorChannel = __nccwpck_require__(1330);
var decoder = __nccwpck_require__(7490);

class CarWriter {
  constructor(roots, encoder) {
    this._encoder = encoder;
    this._mutex = encoder.setRoots(roots);
    this._ended = false;
  }
  async put(block) {
    if (!(block.bytes instanceof Uint8Array) || !block.cid) {
      throw new TypeError('Can only write {cid, bytes} objects');
    }
    if (this._ended) {
      throw new Error('Already closed');
    }
    const cid$1 = cid.CID.asCID(block.cid);
    if (!cid$1) {
      throw new TypeError('Can only write {cid, bytes} objects');
    }
    this._mutex = this._mutex.then(() => this._encoder.writeBlock({
      cid: cid$1,
      bytes: block.bytes
    }));
    return this._mutex;
  }
  async close() {
    if (this._ended) {
      throw new Error('Already closed');
    }
    await this._mutex;
    this._ended = true;
    return this._encoder.close();
  }
  static create(roots) {
    roots = toRoots(roots);
    const {encoder, iterator} = encodeWriter();
    const writer = new CarWriter(roots, encoder);
    const out = new CarWriterOut(iterator);
    return {
      writer,
      out
    };
  }
  static createAppender() {
    const {encoder, iterator} = encodeWriter();
    encoder.setRoots = () => Promise.resolve();
    const writer = new CarWriter([], encoder);
    const out = new CarWriterOut(iterator);
    return {
      writer,
      out
    };
  }
  static async updateRootsInBytes(bytes, roots) {
    const reader = decoder.bytesReader(bytes);
    await decoder.readHeader(reader);
    const newHeader = encoder.createHeader(roots);
    if (reader.pos !== newHeader.length) {
      throw new Error(`updateRoots() can only overwrite a header of the same length (old header is ${ reader.pos } bytes, new header is ${ newHeader.length } bytes)`);
    }
    bytes.set(newHeader, 0);
    return bytes;
  }
}
class CarWriterOut {
  constructor(iterator) {
    this._iterator = iterator;
  }
  [Symbol.asyncIterator]() {
    if (this._iterating) {
      throw new Error('Multiple iterator not supported');
    }
    this._iterating = true;
    return this._iterator;
  }
}
function encodeWriter() {
  const iw = iteratorChannel.create();
  const {writer, iterator} = iw;
  const encoder$1 = encoder.createEncoder(writer);
  return {
    encoder: encoder$1,
    iterator
  };
}
function toRoots(roots) {
  if (roots === undefined) {
    return [];
  }
  if (!Array.isArray(roots)) {
    const cid$1 = cid.CID.asCID(roots);
    if (!cid$1) {
      throw new TypeError('roots must be a single CID or an array of CIDs');
    }
    return [cid$1];
  }
  const _roots = [];
  for (const root of roots) {
    const _root = cid.CID.asCID(root);
    if (!_root) {
      throw new TypeError('roots must be a single CID or an array of CIDs');
    }
    _roots.push(_root);
  }
  return _roots;
}
const __browser = true;

exports.CarWriter = CarWriter;
exports.CarWriterOut = CarWriterOut;
exports.__browser = __browser;


/***/ }),

/***/ 9478:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var fs = __nccwpck_require__(5747);
var util = __nccwpck_require__(1669);
var writerBrowser = __nccwpck_require__(5479);
var decoder = __nccwpck_require__(7490);
var encoder = __nccwpck_require__(9464);

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);

const fsread = util.promisify(fs__default['default'].read);
const fswrite = util.promisify(fs__default['default'].write);
class CarWriter extends writerBrowser.CarWriter {
  static async updateRootsInFile(fd, roots) {
    const chunkSize = 256;
    let bytes;
    let offset = 0;
    let readChunk;
    if (typeof fd === 'number') {
      readChunk = async () => (await fsread(fd, bytes, 0, chunkSize, offset)).bytesRead;
    } else if (typeof fd === 'object' && typeof fd.read === 'function') {
      readChunk = async () => (await fd.read(bytes, 0, chunkSize, offset)).bytesRead;
    } else {
      throw new TypeError('Bad fd');
    }
    const fdReader = decoder.chunkReader(async () => {
      bytes = new Uint8Array(chunkSize);
      const read = await readChunk();
      offset += read;
      return read < chunkSize ? bytes.subarray(0, read) : bytes;
    });
    await decoder.readHeader(fdReader);
    const newHeader = encoder.createHeader(roots);
    if (fdReader.pos !== newHeader.length) {
      throw new Error(`updateRoots() can only overwrite a header of the same length (old header is ${ fdReader.pos } bytes, new header is ${ newHeader.length } bytes)`);
    }
    if (typeof fd === 'number') {
      await fswrite(fd, newHeader, 0, newHeader.length, 0);
    } else if (typeof fd === 'object' && typeof fd.read === 'function') {
      await fd.write(newHeader, 0, newHeader.length, 0);
    }
  }
}
const __browser = false;

exports.CarWriter = CarWriter;
exports.__browser = __browser;


/***/ }),

/***/ 6477:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var cborg = __nccwpck_require__(8694);
var cid = __nccwpck_require__(6447);

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var cborg__namespace = /*#__PURE__*/_interopNamespace(cborg);

const CID_CBOR_TAG = 42;
function cidEncoder(obj) {
  if (obj.asCID !== obj) {
    return null;
  }
  const cid$1 = cid.CID.asCID(obj);
  if (!cid$1) {
    return null;
  }
  const bytes = new Uint8Array(cid$1.bytes.byteLength + 1);
  bytes.set(cid$1.bytes, 1);
  return [
    new cborg__namespace.Token(cborg__namespace.Type.tag, CID_CBOR_TAG),
    new cborg__namespace.Token(cborg__namespace.Type.bytes, bytes)
  ];
}
function undefinedEncoder() {
  throw new Error('`undefined` is not supported by the IPLD Data Model and cannot be encoded');
}
function numberEncoder(num) {
  if (Number.isNaN(num)) {
    throw new Error('`NaN` is not supported by the IPLD Data Model and cannot be encoded');
  }
  if (num === Infinity || num === -Infinity) {
    throw new Error('`Infinity` and `-Infinity` is not supported by the IPLD Data Model and cannot be encoded');
  }
  return null;
}
const encodeOptions = {
  float64: true,
  typeEncoders: {
    Object: cidEncoder,
    undefined: undefinedEncoder,
    number: numberEncoder
  }
};
function cidDecoder(bytes) {
  if (bytes[0] !== 0) {
    throw new Error('Invalid CID for CBOR tag 42; expected leading 0x00');
  }
  return cid.CID.decode(bytes.subarray(1));
}
const decodeOptions = {
  allowIndefinite: false,
  allowUndefined: false,
  allowNaN: false,
  allowInfinity: false,
  allowBigInt: true,
  strict: true,
  useMaps: false,
  tags: []
};
decodeOptions.tags[CID_CBOR_TAG] = cidDecoder;
const name = 'dag-cbor';
const code = 113;
const encode = node => cborg__namespace.encode(node, encodeOptions);
const decode = data => cborg__namespace.decode(data, decodeOptions);

exports.code = code;
exports.decode = decode;
exports.encode = encode;
exports.name = name;


/***/ }),

/***/ 8012:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var cid = __nccwpck_require__(6447);
var pbDecode = __nccwpck_require__(5060);
var pbEncode = __nccwpck_require__(9977);
var util = __nccwpck_require__(4820);

const name = 'dag-pb';
const code = 112;
function encode(node) {
  util.validate(node);
  const pbn = {};
  if (node.Links) {
    pbn.Links = node.Links.map(l => {
      const link = {};
      if (l.Hash) {
        link.Hash = l.Hash.bytes;
      }
      if (l.Name !== undefined) {
        link.Name = l.Name;
      }
      if (l.Tsize !== undefined) {
        link.Tsize = l.Tsize;
      }
      return link;
    });
  }
  if (node.Data) {
    pbn.Data = node.Data;
  }
  return pbEncode.encodeNode(pbn);
}
function decode(bytes) {
  const pbn = pbDecode.decodeNode(bytes);
  const node = {};
  if (pbn.Data) {
    node.Data = pbn.Data;
  }
  if (pbn.Links) {
    node.Links = pbn.Links.map(l => {
      const link = {};
      try {
        link.Hash = cid.CID.decode(l.Hash);
      } catch (e) {
      }
      if (!link.Hash) {
        throw new Error('Invalid Hash field found in link, expected CID');
      }
      if (l.Name !== undefined) {
        link.Name = l.Name;
      }
      if (l.Tsize !== undefined) {
        link.Tsize = l.Tsize;
      }
      return link;
    });
  }
  return node;
}

exports.createLink = util.createLink;
exports.createNode = util.createNode;
exports.prepare = util.prepare;
exports.validate = util.validate;
exports.code = code;
exports.decode = decode;
exports.encode = encode;
exports.name = name;


/***/ }),

/***/ 5060:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

const textDecoder = new TextDecoder();
function decodeVarint(bytes, offset) {
  let v = 0;
  for (let shift = 0;; shift += 7) {
    if (shift >= 64) {
      throw new Error('protobuf: varint overflow');
    }
    if (offset >= bytes.length) {
      throw new Error('protobuf: unexpected end of data');
    }
    const b = bytes[offset++];
    v += shift < 28 ? (b & 127) << shift : (b & 127) * 2 ** shift;
    if (b < 128) {
      break;
    }
  }
  return [
    v,
    offset
  ];
}
function decodeBytes(bytes, offset) {
  let byteLen;
  [byteLen, offset] = decodeVarint(bytes, offset);
  const postOffset = offset + byteLen;
  if (byteLen < 0 || postOffset < 0) {
    throw new Error('protobuf: invalid length');
  }
  if (postOffset > bytes.length) {
    throw new Error('protobuf: unexpected end of data');
  }
  return [
    bytes.subarray(offset, postOffset),
    postOffset
  ];
}
function decodeKey(bytes, index) {
  let wire;
  [wire, index] = decodeVarint(bytes, index);
  return [
    wire & 7,
    wire >> 3,
    index
  ];
}
function decodeLink(bytes) {
  const link = {};
  const l = bytes.length;
  let index = 0;
  while (index < l) {
    let wireType, fieldNum;
    [wireType, fieldNum, index] = decodeKey(bytes, index);
    if (fieldNum === 1) {
      if (link.Hash) {
        throw new Error('protobuf: (PBLink) duplicate Hash section');
      }
      if (wireType !== 2) {
        throw new Error(`protobuf: (PBLink) wrong wireType (${ wireType }) for Hash`);
      }
      if (link.Name !== undefined) {
        throw new Error('protobuf: (PBLink) invalid order, found Name before Hash');
      }
      if (link.Tsize !== undefined) {
        throw new Error('protobuf: (PBLink) invalid order, found Tsize before Hash');
      }
      ;
      [link.Hash, index] = decodeBytes(bytes, index);
    } else if (fieldNum === 2) {
      if (link.Name !== undefined) {
        throw new Error('protobuf: (PBLink) duplicate Name section');
      }
      if (wireType !== 2) {
        throw new Error(`protobuf: (PBLink) wrong wireType (${ wireType }) for Name`);
      }
      if (link.Tsize !== undefined) {
        throw new Error('protobuf: (PBLink) invalid order, found Tsize before Name');
      }
      let byts;
      [byts, index] = decodeBytes(bytes, index);
      link.Name = textDecoder.decode(byts);
    } else if (fieldNum === 3) {
      if (link.Tsize !== undefined) {
        throw new Error('protobuf: (PBLink) duplicate Tsize section');
      }
      if (wireType !== 0) {
        throw new Error(`protobuf: (PBLink) wrong wireType (${ wireType }) for Tsize`);
      }
      ;
      [link.Tsize, index] = decodeVarint(bytes, index);
    } else {
      throw new Error(`protobuf: (PBLink) invalid fieldNumber, expected 1, 2 or 3, got ${ fieldNum }`);
    }
  }
  if (index > l) {
    throw new Error('protobuf: (PBLink) unexpected end of data');
  }
  return link;
}
function decodeNode(bytes) {
  const l = bytes.length;
  let index = 0;
  let links;
  let linksBeforeData = false;
  let data;
  while (index < l) {
    let wireType, fieldNum;
    [wireType, fieldNum, index] = decodeKey(bytes, index);
    if (wireType !== 2) {
      throw new Error(`protobuf: (PBNode) invalid wireType, expected 2, got ${ wireType }`);
    }
    if (fieldNum === 1) {
      if (data) {
        throw new Error('protobuf: (PBNode) duplicate Data section');
      }
      ;
      [data, index] = decodeBytes(bytes, index);
      if (links) {
        linksBeforeData = true;
      }
    } else if (fieldNum === 2) {
      if (linksBeforeData) {
        throw new Error('protobuf: (PBNode) duplicate Links section');
      } else if (!links) {
        links = [];
      }
      let byts;
      [byts, index] = decodeBytes(bytes, index);
      links.push(decodeLink(byts));
    } else {
      throw new Error(`protobuf: (PBNode) invalid fieldNumber, expected 1 or 2, got ${ fieldNum }`);
    }
  }
  if (index > l) {
    throw new Error('protobuf: (PBNode) unexpected end of data');
  }
  const node = {};
  if (data) {
    node.Data = data;
  }
  node.Links = links || [];
  return node;
}

exports.decodeNode = decodeNode;


/***/ }),

/***/ 9977:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

const textEncoder = new TextEncoder();
const maxInt32 = 2 ** 32;
const maxUInt32 = 2 ** 31;
function encodeLink(link, bytes) {
  let i = bytes.length;
  if (typeof link.Tsize === 'number') {
    if (link.Tsize < 0) {
      throw new Error('Tsize cannot be negative');
    }
    if (!Number.isSafeInteger(link.Tsize)) {
      throw new Error('Tsize too large for encoding');
    }
    i = encodeVarint(bytes, i, link.Tsize) - 1;
    bytes[i] = 24;
  }
  if (typeof link.Name === 'string') {
    const nameBytes = textEncoder.encode(link.Name);
    i -= nameBytes.length;
    bytes.set(nameBytes, i);
    i = encodeVarint(bytes, i, nameBytes.length) - 1;
    bytes[i] = 18;
  }
  if (link.Hash) {
    i -= link.Hash.length;
    bytes.set(link.Hash, i);
    i = encodeVarint(bytes, i, link.Hash.length) - 1;
    bytes[i] = 10;
  }
  return bytes.length - i;
}
function encodeNode(node) {
  const size = sizeNode(node);
  const bytes = new Uint8Array(size);
  let i = size;
  if (node.Data) {
    i -= node.Data.length;
    bytes.set(node.Data, i);
    i = encodeVarint(bytes, i, node.Data.length) - 1;
    bytes[i] = 10;
  }
  if (node.Links) {
    for (let index = node.Links.length - 1; index >= 0; index--) {
      const size = encodeLink(node.Links[index], bytes.subarray(0, i));
      i -= size;
      i = encodeVarint(bytes, i, size) - 1;
      bytes[i] = 18;
    }
  }
  return bytes;
}
function sizeLink(link) {
  let n = 0;
  if (link.Hash) {
    const l = link.Hash.length;
    n += 1 + l + sov(l);
  }
  if (typeof link.Name === 'string') {
    const l = textEncoder.encode(link.Name).length;
    n += 1 + l + sov(l);
  }
  if (typeof link.Tsize === 'number') {
    n += 1 + sov(link.Tsize);
  }
  return n;
}
function sizeNode(node) {
  let n = 0;
  if (node.Data) {
    const l = node.Data.length;
    n += 1 + l + sov(l);
  }
  if (node.Links) {
    for (const link of node.Links) {
      const l = sizeLink(link);
      n += 1 + l + sov(l);
    }
  }
  return n;
}
function encodeVarint(bytes, offset, v) {
  offset -= sov(v);
  const base = offset;
  while (v >= maxUInt32) {
    bytes[offset++] = v & 127 | 128;
    v /= 128;
  }
  while (v >= 128) {
    bytes[offset++] = v & 127 | 128;
    v >>>= 7;
  }
  bytes[offset] = v;
  return base;
}
function sov(x) {
  if (x % 2 === 0) {
    x++;
  }
  return Math.floor((len64(x) + 6) / 7);
}
function len64(x) {
  let n = 0;
  if (x >= maxInt32) {
    x = Math.floor(x / maxInt32);
    n = 32;
  }
  if (x >= 1 << 16) {
    x >>>= 16;
    n += 16;
  }
  if (x >= 1 << 8) {
    x >>>= 8;
    n += 8;
  }
  return n + len8tab[x];
}
const len8tab = [
  0,
  1,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8
];

exports.encodeNode = encodeNode;


/***/ }),

/***/ 4820:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var cid = __nccwpck_require__(6447);

const pbNodeProperties = [
  'Data',
  'Links'
];
const pbLinkProperties = [
  'Hash',
  'Name',
  'Tsize'
];
const textEncoder = new TextEncoder();
function linkComparator(a, b) {
  if (a === b) {
    return 0;
  }
  const abuf = a.Name ? textEncoder.encode(a.Name) : [];
  const bbuf = b.Name ? textEncoder.encode(b.Name) : [];
  let x = abuf.length;
  let y = bbuf.length;
  for (let i = 0, len = Math.min(x, y); i < len; ++i) {
    if (abuf[i] !== bbuf[i]) {
      x = abuf[i];
      y = bbuf[i];
      break;
    }
  }
  return x < y ? -1 : y < x ? 1 : 0;
}
function hasOnlyProperties(node, properties) {
  return !Object.keys(node).some(p => !properties.includes(p));
}
function asLink(link) {
  if (typeof link.asCID === 'object') {
    const Hash = cid.CID.asCID(link);
    if (!Hash) {
      throw new TypeError('Invalid DAG-PB form');
    }
    return { Hash };
  }
  if (typeof link !== 'object' || Array.isArray(link)) {
    throw new TypeError('Invalid DAG-PB form');
  }
  const pbl = {};
  if (link.Hash) {
    let cid$1 = cid.CID.asCID(link.Hash);
    try {
      if (!cid$1) {
        if (typeof link.Hash === 'string') {
          cid$1 = cid.CID.parse(link.Hash);
        } else if (link.Hash instanceof Uint8Array) {
          cid$1 = cid.CID.decode(link.Hash);
        }
      }
    } catch (e) {
      throw new TypeError(`Invalid DAG-PB form: ${ e.message }`);
    }
    if (cid$1) {
      pbl.Hash = cid$1;
    }
  }
  if (!pbl.Hash) {
    throw new TypeError('Invalid DAG-PB form');
  }
  if (typeof link.Name === 'string') {
    pbl.Name = link.Name;
  }
  if (typeof link.Tsize === 'number') {
    pbl.Tsize = link.Tsize;
  }
  return pbl;
}
function prepare(node) {
  if (node instanceof Uint8Array || typeof node === 'string') {
    node = { Data: node };
  }
  if (typeof node !== 'object' || Array.isArray(node)) {
    throw new TypeError('Invalid DAG-PB form');
  }
  const pbn = {};
  if (node.Data !== undefined) {
    if (typeof node.Data === 'string') {
      pbn.Data = textEncoder.encode(node.Data);
    } else if (node.Data instanceof Uint8Array) {
      pbn.Data = node.Data;
    } else {
      throw new TypeError('Invalid DAG-PB form');
    }
  }
  if (node.Links !== undefined) {
    if (Array.isArray(node.Links)) {
      pbn.Links = node.Links.map(asLink);
      pbn.Links.sort(linkComparator);
    } else {
      throw new TypeError('Invalid DAG-PB form');
    }
  } else {
    pbn.Links = [];
  }
  return pbn;
}
function validate(node) {
  if (!node || typeof node !== 'object' || Array.isArray(node)) {
    throw new TypeError('Invalid DAG-PB form');
  }
  if (!hasOnlyProperties(node, pbNodeProperties)) {
    throw new TypeError('Invalid DAG-PB form (extraneous properties)');
  }
  if (node.Data !== undefined && !(node.Data instanceof Uint8Array)) {
    throw new TypeError('Invalid DAG-PB form (Data must be a Uint8Array)');
  }
  if (!Array.isArray(node.Links)) {
    throw new TypeError('Invalid DAG-PB form (Links must be an array)');
  }
  for (let i = 0; i < node.Links.length; i++) {
    const link = node.Links[i];
    if (!link || typeof link !== 'object' || Array.isArray(link)) {
      throw new TypeError('Invalid DAG-PB form (bad link object)');
    }
    if (!hasOnlyProperties(link, pbLinkProperties)) {
      throw new TypeError('Invalid DAG-PB form (extraneous properties on link object)');
    }
    if (!link.Hash) {
      throw new TypeError('Invalid DAG-PB form (link must have a Hash)');
    }
    if (link.Hash.asCID !== link.Hash) {
      throw new TypeError('Invalid DAG-PB form (link Hash must be a CID)');
    }
    if (link.Name !== undefined && typeof link.Name !== 'string') {
      throw new TypeError('Invalid DAG-PB form (link Name must be a string)');
    }
    if (link.Tsize !== undefined && (typeof link.Tsize !== 'number' || link.Tsize % 1 !== 0)) {
      throw new TypeError('Invalid DAG-PB form (link Tsize must be an integer)');
    }
    if (i > 0 && linkComparator(link, node.Links[i - 1]) === -1) {
      throw new TypeError('Invalid DAG-PB form (links must be sorted by Name bytes)');
    }
  }
}
function createNode(data, links = []) {
  return prepare({
    Data: data,
    Links: links
  });
}
function createLink(name, size, cid) {
  return asLink({
    Hash: cid,
    Name: name,
    Tsize: size
  });
}

exports.createLink = createLink;
exports.createNode = createNode;
exports.prepare = prepare;
exports.validate = validate;


/***/ }),

/***/ 252:
/***/ ((module) => {

"use strict";

module.exports = asPromise;

/**
 * Callback as used by {@link util.asPromise}.
 * @typedef asPromiseCallback
 * @type {function}
 * @param {Error|null} error Error, if any
 * @param {...*} params Additional arguments
 * @returns {undefined}
 */

/**
 * Returns a promise from a node-style callback function.
 * @memberof util
 * @param {asPromiseCallback} fn Function to call
 * @param {*} ctx Function context
 * @param {...*} params Function arguments
 * @returns {Promise<*>} Promisified function
 */
function asPromise(fn, ctx/*, varargs */) {
    var params  = new Array(arguments.length - 1),
        offset  = 0,
        index   = 2,
        pending = true;
    while (index < arguments.length)
        params[offset++] = arguments[index++];
    return new Promise(function executor(resolve, reject) {
        params[offset] = function callback(err/*, varargs */) {
            if (pending) {
                pending = false;
                if (err)
                    reject(err);
                else {
                    var params = new Array(arguments.length - 1),
                        offset = 0;
                    while (offset < params.length)
                        params[offset++] = arguments[offset];
                    resolve.apply(null, params);
                }
            }
        };
        try {
            fn.apply(ctx || null, params);
        } catch (err) {
            if (pending) {
                pending = false;
                reject(err);
            }
        }
    });
}


/***/ }),

/***/ 6718:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


/**
 * A minimal base64 implementation for number arrays.
 * @memberof util
 * @namespace
 */
var base64 = exports;

/**
 * Calculates the byte length of a base64 encoded string.
 * @param {string} string Base64 encoded string
 * @returns {number} Byte length
 */
base64.length = function length(string) {
    var p = string.length;
    if (!p)
        return 0;
    var n = 0;
    while (--p % 4 > 1 && string.charAt(p) === "=")
        ++n;
    return Math.ceil(string.length * 3) / 4 - n;
};

// Base64 encoding table
var b64 = new Array(64);

// Base64 decoding table
var s64 = new Array(123);

// 65..90, 97..122, 48..57, 43, 47
for (var i = 0; i < 64;)
    s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;

/**
 * Encodes a buffer to a base64 encoded string.
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} Base64 encoded string
 */
base64.encode = function encode(buffer, start, end) {
    var parts = null,
        chunk = [];
    var i = 0, // output index
        j = 0, // goto index
        t;     // temporary
    while (start < end) {
        var b = buffer[start++];
        switch (j) {
            case 0:
                chunk[i++] = b64[b >> 2];
                t = (b & 3) << 4;
                j = 1;
                break;
            case 1:
                chunk[i++] = b64[t | b >> 4];
                t = (b & 15) << 2;
                j = 2;
                break;
            case 2:
                chunk[i++] = b64[t | b >> 6];
                chunk[i++] = b64[b & 63];
                j = 0;
                break;
        }
        if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
        }
    }
    if (j) {
        chunk[i++] = b64[t];
        chunk[i++] = 61;
        if (j === 1)
            chunk[i++] = 61;
    }
    if (parts) {
        if (i)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i));
};

var invalidEncoding = "invalid encoding";

/**
 * Decodes a base64 encoded string to a buffer.
 * @param {string} string Source string
 * @param {Uint8Array} buffer Destination buffer
 * @param {number} offset Destination offset
 * @returns {number} Number of bytes written
 * @throws {Error} If encoding is invalid
 */
base64.decode = function decode(string, buffer, offset) {
    var start = offset;
    var j = 0, // goto index
        t;     // temporary
    for (var i = 0; i < string.length;) {
        var c = string.charCodeAt(i++);
        if (c === 61 && j > 1)
            break;
        if ((c = s64[c]) === undefined)
            throw Error(invalidEncoding);
        switch (j) {
            case 0:
                t = c;
                j = 1;
                break;
            case 1:
                buffer[offset++] = t << 2 | (c & 48) >> 4;
                t = c;
                j = 2;
                break;
            case 2:
                buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
                t = c;
                j = 3;
                break;
            case 3:
                buffer[offset++] = (t & 3) << 6 | c;
                j = 0;
                break;
        }
    }
    if (j === 1)
        throw Error(invalidEncoding);
    return offset - start;
};

/**
 * Tests if the specified string appears to be base64 encoded.
 * @param {string} string String to test
 * @returns {boolean} `true` if probably base64 encoded, otherwise false
 */
base64.test = function test(string) {
    return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
};


/***/ }),

/***/ 6850:
/***/ ((module) => {

"use strict";

module.exports = EventEmitter;

/**
 * Constructs a new event emitter instance.
 * @classdesc A minimal event emitter.
 * @memberof util
 * @constructor
 */
function EventEmitter() {

    /**
     * Registered listeners.
     * @type {Object.<string,*>}
     * @private
     */
    this._listeners = {};
}

/**
 * Registers an event listener.
 * @param {string} evt Event name
 * @param {function} fn Listener
 * @param {*} [ctx] Listener context
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.on = function on(evt, fn, ctx) {
    (this._listeners[evt] || (this._listeners[evt] = [])).push({
        fn  : fn,
        ctx : ctx || this
    });
    return this;
};

/**
 * Removes an event listener or any matching listeners if arguments are omitted.
 * @param {string} [evt] Event name. Removes all listeners if omitted.
 * @param {function} [fn] Listener to remove. Removes all listeners of `evt` if omitted.
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.off = function off(evt, fn) {
    if (evt === undefined)
        this._listeners = {};
    else {
        if (fn === undefined)
            this._listeners[evt] = [];
        else {
            var listeners = this._listeners[evt];
            for (var i = 0; i < listeners.length;)
                if (listeners[i].fn === fn)
                    listeners.splice(i, 1);
                else
                    ++i;
        }
    }
    return this;
};

/**
 * Emits an event by calling its listeners with the specified arguments.
 * @param {string} evt Event name
 * @param {...*} args Arguments
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.emit = function emit(evt) {
    var listeners = this._listeners[evt];
    if (listeners) {
        var args = [],
            i = 1;
        for (; i < arguments.length;)
            args.push(arguments[i++]);
        for (i = 0; i < listeners.length;)
            listeners[i].fn.apply(listeners[i++].ctx, args);
    }
    return this;
};


/***/ }),

/***/ 1843:
/***/ ((module) => {

"use strict";


module.exports = factory(factory);

/**
 * Reads / writes floats / doubles from / to buffers.
 * @name util.float
 * @namespace
 */

/**
 * Writes a 32 bit float to a buffer using little endian byte order.
 * @name util.float.writeFloatLE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Writes a 32 bit float to a buffer using big endian byte order.
 * @name util.float.writeFloatBE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Reads a 32 bit float from a buffer using little endian byte order.
 * @name util.float.readFloatLE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Reads a 32 bit float from a buffer using big endian byte order.
 * @name util.float.readFloatBE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Writes a 64 bit double to a buffer using little endian byte order.
 * @name util.float.writeDoubleLE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Writes a 64 bit double to a buffer using big endian byte order.
 * @name util.float.writeDoubleBE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Reads a 64 bit double from a buffer using little endian byte order.
 * @name util.float.readDoubleLE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Reads a 64 bit double from a buffer using big endian byte order.
 * @name util.float.readDoubleBE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

// Factory function for the purpose of node-based testing in modified global environments
function factory(exports) {

    // float: typed array
    if (typeof Float32Array !== "undefined") (function() {

        var f32 = new Float32Array([ -0 ]),
            f8b = new Uint8Array(f32.buffer),
            le  = f8b[3] === 128;

        function writeFloat_f32_cpy(val, buf, pos) {
            f32[0] = val;
            buf[pos    ] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
        }

        function writeFloat_f32_rev(val, buf, pos) {
            f32[0] = val;
            buf[pos    ] = f8b[3];
            buf[pos + 1] = f8b[2];
            buf[pos + 2] = f8b[1];
            buf[pos + 3] = f8b[0];
        }

        /* istanbul ignore next */
        exports.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
        /* istanbul ignore next */
        exports.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;

        function readFloat_f32_cpy(buf, pos) {
            f8b[0] = buf[pos    ];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            return f32[0];
        }

        function readFloat_f32_rev(buf, pos) {
            f8b[3] = buf[pos    ];
            f8b[2] = buf[pos + 1];
            f8b[1] = buf[pos + 2];
            f8b[0] = buf[pos + 3];
            return f32[0];
        }

        /* istanbul ignore next */
        exports.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
        /* istanbul ignore next */
        exports.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;

    // float: ieee754
    })(); else (function() {

        function writeFloat_ieee754(writeUint, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
                val = -val;
            if (val === 0)
                writeUint(1 / val > 0 ? /* positive */ 0 : /* negative 0 */ 2147483648, buf, pos);
            else if (isNaN(val))
                writeUint(2143289344, buf, pos);
            else if (val > 3.4028234663852886e+38) // +-Infinity
                writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
            else if (val < 1.1754943508222875e-38) // denormal
                writeUint((sign << 31 | Math.round(val / 1.401298464324817e-45)) >>> 0, buf, pos);
            else {
                var exponent = Math.floor(Math.log(val) / Math.LN2),
                    mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
                writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
            }
        }

        exports.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
        exports.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);

        function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos),
                sign = (uint >> 31) * 2 + 1,
                exponent = uint >>> 23 & 255,
                mantissa = uint & 8388607;
            return exponent === 255
                ? mantissa
                ? NaN
                : sign * Infinity
                : exponent === 0 // denormal
                ? sign * 1.401298464324817e-45 * mantissa
                : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
        }

        exports.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
        exports.readFloatBE = readFloat_ieee754.bind(null, readUintBE);

    })();

    // double: typed array
    if (typeof Float64Array !== "undefined") (function() {

        var f64 = new Float64Array([-0]),
            f8b = new Uint8Array(f64.buffer),
            le  = f8b[7] === 128;

        function writeDouble_f64_cpy(val, buf, pos) {
            f64[0] = val;
            buf[pos    ] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
            buf[pos + 4] = f8b[4];
            buf[pos + 5] = f8b[5];
            buf[pos + 6] = f8b[6];
            buf[pos + 7] = f8b[7];
        }

        function writeDouble_f64_rev(val, buf, pos) {
            f64[0] = val;
            buf[pos    ] = f8b[7];
            buf[pos + 1] = f8b[6];
            buf[pos + 2] = f8b[5];
            buf[pos + 3] = f8b[4];
            buf[pos + 4] = f8b[3];
            buf[pos + 5] = f8b[2];
            buf[pos + 6] = f8b[1];
            buf[pos + 7] = f8b[0];
        }

        /* istanbul ignore next */
        exports.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
        /* istanbul ignore next */
        exports.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;

        function readDouble_f64_cpy(buf, pos) {
            f8b[0] = buf[pos    ];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            f8b[4] = buf[pos + 4];
            f8b[5] = buf[pos + 5];
            f8b[6] = buf[pos + 6];
            f8b[7] = buf[pos + 7];
            return f64[0];
        }

        function readDouble_f64_rev(buf, pos) {
            f8b[7] = buf[pos    ];
            f8b[6] = buf[pos + 1];
            f8b[5] = buf[pos + 2];
            f8b[4] = buf[pos + 3];
            f8b[3] = buf[pos + 4];
            f8b[2] = buf[pos + 5];
            f8b[1] = buf[pos + 6];
            f8b[0] = buf[pos + 7];
            return f64[0];
        }

        /* istanbul ignore next */
        exports.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
        /* istanbul ignore next */
        exports.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;

    // double: ieee754
    })(); else (function() {

        function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
                val = -val;
            if (val === 0) {
                writeUint(0, buf, pos + off0);
                writeUint(1 / val > 0 ? /* positive */ 0 : /* negative 0 */ 2147483648, buf, pos + off1);
            } else if (isNaN(val)) {
                writeUint(0, buf, pos + off0);
                writeUint(2146959360, buf, pos + off1);
            } else if (val > 1.7976931348623157e+308) { // +-Infinity
                writeUint(0, buf, pos + off0);
                writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
            } else {
                var mantissa;
                if (val < 2.2250738585072014e-308) { // denormal
                    mantissa = val / 5e-324;
                    writeUint(mantissa >>> 0, buf, pos + off0);
                    writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
                } else {
                    var exponent = Math.floor(Math.log(val) / Math.LN2);
                    if (exponent === 1024)
                        exponent = 1023;
                    mantissa = val * Math.pow(2, -exponent);
                    writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                    writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
                }
            }
        }

        exports.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
        exports.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);

        function readDouble_ieee754(readUint, off0, off1, buf, pos) {
            var lo = readUint(buf, pos + off0),
                hi = readUint(buf, pos + off1);
            var sign = (hi >> 31) * 2 + 1,
                exponent = hi >>> 20 & 2047,
                mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047
                ? mantissa
                ? NaN
                : sign * Infinity
                : exponent === 0 // denormal
                ? sign * 5e-324 * mantissa
                : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
        }

        exports.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
        exports.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);

    })();

    return exports;
}

// uint helpers

function writeUintLE(val, buf, pos) {
    buf[pos    ] =  val        & 255;
    buf[pos + 1] =  val >>> 8  & 255;
    buf[pos + 2] =  val >>> 16 & 255;
    buf[pos + 3] =  val >>> 24;
}

function writeUintBE(val, buf, pos) {
    buf[pos    ] =  val >>> 24;
    buf[pos + 1] =  val >>> 16 & 255;
    buf[pos + 2] =  val >>> 8  & 255;
    buf[pos + 3] =  val        & 255;
}

function readUintLE(buf, pos) {
    return (buf[pos    ]
          | buf[pos + 1] << 8
          | buf[pos + 2] << 16
          | buf[pos + 3] << 24) >>> 0;
}

function readUintBE(buf, pos) {
    return (buf[pos    ] << 24
          | buf[pos + 1] << 16
          | buf[pos + 2] << 8
          | buf[pos + 3]) >>> 0;
}


/***/ }),

/***/ 94:
/***/ ((module) => {

"use strict";

module.exports = inquire;

/**
 * Requires a module only if available.
 * @memberof util
 * @param {string} moduleName Module to require
 * @returns {?Object} Required module if available and not empty, otherwise `null`
 */
function inquire(moduleName) {
    try {
        var mod = eval("quire".replace(/^/,"re"))(moduleName); // eslint-disable-line no-eval
        if (mod && (mod.length || Object.keys(mod).length))
            return mod;
    } catch (e) {} // eslint-disable-line no-empty
    return null;
}


/***/ }),

/***/ 7743:
/***/ ((module) => {

"use strict";

module.exports = pool;

/**
 * An allocator as used by {@link util.pool}.
 * @typedef PoolAllocator
 * @type {function}
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */

/**
 * A slicer as used by {@link util.pool}.
 * @typedef PoolSlicer
 * @type {function}
 * @param {number} start Start offset
 * @param {number} end End offset
 * @returns {Uint8Array} Buffer slice
 * @this {Uint8Array}
 */

/**
 * A general purpose buffer pool.
 * @memberof util
 * @function
 * @param {PoolAllocator} alloc Allocator
 * @param {PoolSlicer} slice Slicer
 * @param {number} [size=8192] Slab size
 * @returns {PoolAllocator} Pooled allocator
 */
function pool(alloc, slice, size) {
    var SIZE   = size || 8192;
    var MAX    = SIZE >>> 1;
    var slab   = null;
    var offset = SIZE;
    return function pool_alloc(size) {
        if (size < 1 || size > MAX)
            return alloc(size);
        if (offset + size > SIZE) {
            slab = alloc(SIZE);
            offset = 0;
        }
        var buf = slice.call(slab, offset, offset += size);
        if (offset & 7) // align to 32 bit
            offset = (offset | 7) + 1;
        return buf;
    };
}


/***/ }),

/***/ 9049:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


/**
 * A minimal UTF8 implementation for number arrays.
 * @memberof util
 * @namespace
 */
var utf8 = exports;

/**
 * Calculates the UTF8 byte length of a string.
 * @param {string} string String
 * @returns {number} Byte length
 */
utf8.length = function utf8_length(string) {
    var len = 0,
        c = 0;
    for (var i = 0; i < string.length; ++i) {
        c = string.charCodeAt(i);
        if (c < 128)
            len += 1;
        else if (c < 2048)
            len += 2;
        else if ((c & 0xFC00) === 0xD800 && (string.charCodeAt(i + 1) & 0xFC00) === 0xDC00) {
            ++i;
            len += 4;
        } else
            len += 3;
    }
    return len;
};

/**
 * Reads UTF8 bytes as a string.
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} String read
 */
utf8.read = function utf8_read(buffer, start, end) {
    var len = end - start;
    if (len < 1)
        return "";
    var parts = null,
        chunk = [],
        i = 0, // char offset
        t;     // temporary
    while (start < end) {
        t = buffer[start++];
        if (t < 128)
            chunk[i++] = t;
        else if (t > 191 && t < 224)
            chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
        else if (t > 239 && t < 365) {
            t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 0x10000;
            chunk[i++] = 0xD800 + (t >> 10);
            chunk[i++] = 0xDC00 + (t & 1023);
        } else
            chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
        if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
        }
    }
    if (parts) {
        if (i)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i));
};

/**
 * Writes a string as UTF8 bytes.
 * @param {string} string Source string
 * @param {Uint8Array} buffer Destination buffer
 * @param {number} offset Destination offset
 * @returns {number} Bytes written
 */
utf8.write = function utf8_write(string, buffer, offset) {
    var start = offset,
        c1, // character 1
        c2; // character 2
    for (var i = 0; i < string.length; ++i) {
        c1 = string.charCodeAt(i);
        if (c1 < 128) {
            buffer[offset++] = c1;
        } else if (c1 < 2048) {
            buffer[offset++] = c1 >> 6       | 192;
            buffer[offset++] = c1       & 63 | 128;
        } else if ((c1 & 0xFC00) === 0xD800 && ((c2 = string.charCodeAt(i + 1)) & 0xFC00) === 0xDC00) {
            c1 = 0x10000 + ((c1 & 0x03FF) << 10) + (c2 & 0x03FF);
            ++i;
            buffer[offset++] = c1 >> 18      | 240;
            buffer[offset++] = c1 >> 12 & 63 | 128;
            buffer[offset++] = c1 >> 6  & 63 | 128;
            buffer[offset++] = c1       & 63 | 128;
        } else {
            buffer[offset++] = c1 >> 12      | 224;
            buffer[offset++] = c1 >> 6  & 63 | 128;
            buffer[offset++] = c1       & 63 | 128;
        }
    }
    return offset - start;
};


/***/ }),

/***/ 9417:
/***/ ((module) => {

"use strict";

module.exports = balanced;
function balanced(a, b, str) {
  if (a instanceof RegExp) a = maybeMatch(a, str);
  if (b instanceof RegExp) b = maybeMatch(b, str);

  var r = range(a, b, str);

  return r && {
    start: r[0],
    end: r[1],
    pre: str.slice(0, r[0]),
    body: str.slice(r[0] + a.length, r[1]),
    post: str.slice(r[1] + b.length)
  };
}

function maybeMatch(reg, str) {
  var m = str.match(reg);
  return m ? m[0] : null;
}

balanced.range = range;
function range(a, b, str) {
  var begs, beg, left, right, result;
  var ai = str.indexOf(a);
  var bi = str.indexOf(b, ai + 1);
  var i = ai;

  if (ai >= 0 && bi > 0) {
    if(a===b) {
      return [ai, bi];
    }
    begs = [];
    left = str.length;

    while (i >= 0 && !result) {
      if (i == ai) {
        begs.push(i);
        ai = str.indexOf(a, i + 1);
      } else if (begs.length == 1) {
        result = [ begs.pop(), bi ];
      } else {
        beg = begs.pop();
        if (beg < left) {
          left = beg;
          right = bi;
        }

        bi = str.indexOf(b, i + 1);
      }

      i = ai < bi && ai >= 0 ? ai : bi;
    }

    if (begs.length) {
      result = [ left, right ];
    }
  }

  return result;
}


/***/ }),

/***/ 7842:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/* eslint-env browser */



const browserReadableStreamToIt = __nccwpck_require__(664)

/**
 * @param {Blob} blob
 * @returns {AsyncIterable<Uint8Array>}
 */
function blobToIt (blob) {
  if (typeof blob.stream === 'function') {
    return browserReadableStreamToIt(blob.stream())
  }

  // firefox < 69 does not support blob.stream()
  // @ts-ignore - response.body is optional, but in practice it's a stream.
  return browserReadableStreamToIt(new Response(blob).body)
}

module.exports = blobToIt


/***/ }),

/***/ 3717:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var concatMap = __nccwpck_require__(6891);
var balanced = __nccwpck_require__(9417);

module.exports = expandTop;

var escSlash = '\0SLASH'+Math.random()+'\0';
var escOpen = '\0OPEN'+Math.random()+'\0';
var escClose = '\0CLOSE'+Math.random()+'\0';
var escComma = '\0COMMA'+Math.random()+'\0';
var escPeriod = '\0PERIOD'+Math.random()+'\0';

function numeric(str) {
  return parseInt(str, 10) == str
    ? parseInt(str, 10)
    : str.charCodeAt(0);
}

function escapeBraces(str) {
  return str.split('\\\\').join(escSlash)
            .split('\\{').join(escOpen)
            .split('\\}').join(escClose)
            .split('\\,').join(escComma)
            .split('\\.').join(escPeriod);
}

function unescapeBraces(str) {
  return str.split(escSlash).join('\\')
            .split(escOpen).join('{')
            .split(escClose).join('}')
            .split(escComma).join(',')
            .split(escPeriod).join('.');
}


// Basically just str.split(","), but handling cases
// where we have nested braced sections, which should be
// treated as individual members, like {a,{b,c},d}
function parseCommaParts(str) {
  if (!str)
    return [''];

  var parts = [];
  var m = balanced('{', '}', str);

  if (!m)
    return str.split(',');

  var pre = m.pre;
  var body = m.body;
  var post = m.post;
  var p = pre.split(',');

  p[p.length-1] += '{' + body + '}';
  var postParts = parseCommaParts(post);
  if (post.length) {
    p[p.length-1] += postParts.shift();
    p.push.apply(p, postParts);
  }

  parts.push.apply(parts, p);

  return parts;
}

function expandTop(str) {
  if (!str)
    return [];

  // I don't know why Bash 4.3 does this, but it does.
  // Anything starting with {} will have the first two bytes preserved
  // but *only* at the top level, so {},a}b will not expand to anything,
  // but a{},b}c will be expanded to [a}c,abc].
  // One could argue that this is a bug in Bash, but since the goal of
  // this module is to match Bash's rules, we escape a leading {}
  if (str.substr(0, 2) === '{}') {
    str = '\\{\\}' + str.substr(2);
  }

  return expand(escapeBraces(str), true).map(unescapeBraces);
}

function identity(e) {
  return e;
}

function embrace(str) {
  return '{' + str + '}';
}
function isPadded(el) {
  return /^-?0\d/.test(el);
}

function lte(i, y) {
  return i <= y;
}
function gte(i, y) {
  return i >= y;
}

function expand(str, isTop) {
  var expansions = [];

  var m = balanced('{', '}', str);
  if (!m || /\$$/.test(m.pre)) return [str];

  var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
  var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
  var isSequence = isNumericSequence || isAlphaSequence;
  var isOptions = m.body.indexOf(',') >= 0;
  if (!isSequence && !isOptions) {
    // {a},b}
    if (m.post.match(/,.*\}/)) {
      str = m.pre + '{' + m.body + escClose + m.post;
      return expand(str);
    }
    return [str];
  }

  var n;
  if (isSequence) {
    n = m.body.split(/\.\./);
  } else {
    n = parseCommaParts(m.body);
    if (n.length === 1) {
      // x{{a,b}}y ==> x{a}y x{b}y
      n = expand(n[0], false).map(embrace);
      if (n.length === 1) {
        var post = m.post.length
          ? expand(m.post, false)
          : [''];
        return post.map(function(p) {
          return m.pre + n[0] + p;
        });
      }
    }
  }

  // at this point, n is the parts, and we know it's not a comma set
  // with a single entry.

  // no need to expand pre, since it is guaranteed to be free of brace-sets
  var pre = m.pre;
  var post = m.post.length
    ? expand(m.post, false)
    : [''];

  var N;

  if (isSequence) {
    var x = numeric(n[0]);
    var y = numeric(n[1]);
    var width = Math.max(n[0].length, n[1].length)
    var incr = n.length == 3
      ? Math.abs(numeric(n[2]))
      : 1;
    var test = lte;
    var reverse = y < x;
    if (reverse) {
      incr *= -1;
      test = gte;
    }
    var pad = n.some(isPadded);

    N = [];

    for (var i = x; test(i, y); i += incr) {
      var c;
      if (isAlphaSequence) {
        c = String.fromCharCode(i);
        if (c === '\\')
          c = '';
      } else {
        c = String(i);
        if (pad) {
          var need = width - c.length;
          if (need > 0) {
            var z = new Array(need + 1).join('0');
            if (i < 0)
              c = '-' + z + c.slice(1);
            else
              c = z + c;
          }
        }
      }
      N.push(c);
    }
  } else {
    N = concatMap(n, function(el) { return expand(el, false) });
  }

  for (var j = 0; j < N.length; j++) {
    for (var k = 0; k < post.length; k++) {
      var expansion = pre + N[j] + post[k];
      if (!isTop || isSequence || expansion)
        expansions.push(expansion);
    }
  }

  return expansions;
}



/***/ }),

/***/ 664:
/***/ ((module) => {

"use strict";


/**
 * Turns a browser readable stream into an async iterable. Async iteration over
 * returned iterable will lock give stream, preventing any other consumer from
 * acquiring a reader. The lock will be released if iteration loop is broken. To
 * prevent stream cancelling optional `{ preventCancel: true }` could be passed
 * as a second argument.
 * @template T
 * @param {ReadableStream<T>} stream
 * @param {Object} [options]
 * @param {boolean} [options.preventCancel=boolean]
 * @returns {AsyncIterable<T>}
 */
async function * browserReadableStreamToIt (stream, options = {}) {
  const reader = stream.getReader()

  try {
    while (true) {
      const result = await reader.read()

      if (result.done) {
        return
      }

      yield result.value
    }
  } finally {
    if (options.preventCancel !== true) {
      reader.cancel()
    }

    reader.releaseLock()
  }
}

module.exports = browserReadableStreamToIt


/***/ }),

/***/ 6025:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var splitter = __nccwpck_require__(8208);
var joiner = __nccwpck_require__(3917);



exports.TreewalkCarSplitter = splitter.TreewalkCarSplitter;
exports.TreewalkCarJoiner = joiner.TreewalkCarJoiner;


/***/ }),

/***/ 3917:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var car = __nccwpck_require__(2805);

class TreewalkCarJoiner {
  constructor(cars) {
    this._cars = Array.from(cars);
    if (!this._cars.length)
      throw new Error('missing CARs');
  }
  async *car() {
    const reader = this._cars[0];
    const roots = await reader.getRoots();
    const {writer, out} = car.CarWriter.create(roots);
    const writeCar = async () => {
      const written = new Set();
      const writeBlocks = async reader => {
        for await (const b of reader.blocks()) {
          if (written.has(b.cid.toString()))
            continue;
          await writer.put(b);
          written.add(b.cid.toString());
        }
      };
      try {
        await writeBlocks(reader);
        for (const reader of this._cars.slice(1)) {
          await writeBlocks(reader);
        }
      } catch (err) {
        console.error(err);
      } finally {
        await writer.close();
      }
    };
    writeCar();
    yield* out;
  }
}

exports.TreewalkCarJoiner = TreewalkCarJoiner;


/***/ }),

/***/ 8208:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var car = __nccwpck_require__(2805);
var block = __nccwpck_require__(4594);
var raw = __nccwpck_require__(2048);
var dagCbor = __nccwpck_require__(6477);
var pb = __nccwpck_require__(8012);

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var raw__namespace = /*#__PURE__*/_interopNamespace(raw);
var dagCbor__namespace = /*#__PURE__*/_interopNamespace(dagCbor);
var pb__namespace = /*#__PURE__*/_interopNamespace(pb);

class TreewalkCarSplitter {
  constructor(reader, targetSize, options = {}) {
    if (typeof targetSize !== 'number' || targetSize <= 0) {
      throw new Error('invalid target chunk size');
    }
    this._reader = reader;
    this._targetSize = targetSize;
    this._decoders = [
      pb__namespace,
      raw__namespace,
      dagCbor__namespace,
      ...options.decoders || []
    ];
  }
  async *cars() {
    const roots = await this._reader.getRoots();
    if (roots.length !== 1)
      throw new Error(`unexpected number of roots: ${ roots.length }`);
    let channel;
    for await (const val of this._cars(roots[0])) {
      channel = val.channel;
      if (val.out)
        yield val.out;
    }
    if (!channel) {
      throw new Error('missing CAR writer channel');
    }
    channel.writer.close();
    yield channel.out;
  }
  async _get(cid) {
    const rawBlock = await this._reader.get(cid);
    if (!rawBlock)
      throw new Error(`missing block for ${ cid }`);
    const {bytes} = rawBlock;
    const decoder = this._decoders.find(d => d.code === cid.code);
    if (!decoder)
      throw new Error(`missing decoder for ${ cid.code }`);
    return new block.Block({
      cid,
      bytes,
      value: decoder.decode(bytes)
    });
  }
  async *_cars(cid, parents = [], channel = undefined) {
    const block = await this._get(cid);
    channel = channel || Object.assign(car.CarWriter.create(cid), { size: 0 });
    if (channel.size > 0 && channel.size + block.bytes.byteLength >= this._targetSize) {
      channel.writer.close();
      const {out} = channel;
      channel = newCar(parents);
      yield {
        channel,
        out
      };
    }
    parents = parents.concat(block);
    channel.size += block.bytes.byteLength;
    channel.writer.put(block);
    for (const [, cid] of block.links()) {
      for await (const val of this._cars(cid, parents, channel)) {
        channel = val.channel;
        yield val;
      }
    }
    if (!channel) {
      throw new Error('missing CAR writer channel');
    }
    yield { channel };
  }
  static async fromIterable(iterable, targetSize, options) {
    const reader = await car.CarReader.fromIterable(iterable);
    return new TreewalkCarSplitter(reader, targetSize, options);
  }
  static async fromBlob(blob, targetSize, options) {
    const buffer = await blob.arrayBuffer();
    const reader = await car.CarReader.fromBytes(new Uint8Array(buffer));
    return new TreewalkCarSplitter(reader, targetSize, options);
  }
}
function newCar(parents) {
  const ch = Object.assign(car.CarWriter.create(parents[0].cid), { size: parents.reduce((size, b) => size + b.bytes.byteLength, 0) });
  for (const b of parents) {
    ch.writer.put(b);
  }
  return ch;
}

exports.TreewalkCarSplitter = TreewalkCarSplitter;


/***/ }),

/***/ 8694:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var encode = __nccwpck_require__(1138);
var decode = __nccwpck_require__(2207);
var token = __nccwpck_require__(7423);



exports.encode = encode.encode;
exports.decode = decode.decode;
exports.Token = token.Token;
exports.Type = token.Type;


/***/ }),

/***/ 3256:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var token = __nccwpck_require__(7423);
var common = __nccwpck_require__(6754);

const uintBoundaries = [
  24,
  256,
  65536,
  4294967296,
  BigInt('18446744073709551616')
];
function readUint8(data, offset, options) {
  common.assertEnoughData(data, offset, 1);
  const value = data[offset];
  if (options.strict === true && value < uintBoundaries[0]) {
    throw new Error(`${ common.decodeErrPrefix } integer encoded in more bytes than necessary (strict decode)`);
  }
  return value;
}
function readUint16(data, offset, options) {
  common.assertEnoughData(data, offset, 2);
  const value = data[offset] << 8 | data[offset + 1];
  if (options.strict === true && value < uintBoundaries[1]) {
    throw new Error(`${ common.decodeErrPrefix } integer encoded in more bytes than necessary (strict decode)`);
  }
  return value;
}
function readUint32(data, offset, options) {
  common.assertEnoughData(data, offset, 4);
  const value = data[offset] * 16777216 + (data[offset + 1] << 16) + (data[offset + 2] << 8) + data[offset + 3];
  if (options.strict === true && value < uintBoundaries[2]) {
    throw new Error(`${ common.decodeErrPrefix } integer encoded in more bytes than necessary (strict decode)`);
  }
  return value;
}
function readUint64(data, offset, options) {
  common.assertEnoughData(data, offset, 8);
  const hi = data[offset] * 16777216 + (data[offset + 1] << 16) + (data[offset + 2] << 8) + data[offset + 3];
  const lo = data[offset + 4] * 16777216 + (data[offset + 5] << 16) + (data[offset + 6] << 8) + data[offset + 7];
  const value = (BigInt(hi) << BigInt(32)) + BigInt(lo);
  if (options.strict === true && value < uintBoundaries[3]) {
    throw new Error(`${ common.decodeErrPrefix } integer encoded in more bytes than necessary (strict decode)`);
  }
  if (value <= Number.MAX_SAFE_INTEGER) {
    return Number(value);
  }
  if (options.allowBigInt === true) {
    return value;
  }
  throw new Error(`${ common.decodeErrPrefix } integers outside of the safe integer range are not supported`);
}
function decodeUint8(data, pos, _minor, options) {
  return new token.Token(token.Type.uint, readUint8(data, pos + 1, options), 2);
}
function decodeUint16(data, pos, _minor, options) {
  return new token.Token(token.Type.uint, readUint16(data, pos + 1, options), 3);
}
function decodeUint32(data, pos, _minor, options) {
  return new token.Token(token.Type.uint, readUint32(data, pos + 1, options), 5);
}
function decodeUint64(data, pos, _minor, options) {
  return new token.Token(token.Type.uint, readUint64(data, pos + 1, options), 9);
}
function encodeUint(buf, token) {
  return encodeUintValue(buf, 0, token.value);
}
function encodeUintValue(buf, major, uint) {
  if (uint < uintBoundaries[0]) {
    const nuint = Number(uint);
    buf.push([major | nuint]);
  } else if (uint < uintBoundaries[1]) {
    const nuint = Number(uint);
    buf.push([
      major | 24,
      nuint
    ]);
  } else if (uint < uintBoundaries[2]) {
    const nuint = Number(uint);
    buf.push([
      major | 25,
      nuint >>> 8,
      nuint & 255
    ]);
  } else if (uint < uintBoundaries[3]) {
    const nuint = Number(uint);
    buf.push([
      major | 26,
      nuint >>> 24 & 255,
      nuint >>> 16 & 255,
      nuint >>> 8 & 255,
      nuint & 255
    ]);
  } else {
    const buint = BigInt(uint);
    if (buint < uintBoundaries[4]) {
      const set = [
        major | 27,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ];
      let lo = Number(buint & BigInt(4294967295));
      let hi = Number(buint >> BigInt(32) & BigInt(4294967295));
      set[8] = lo & 255;
      lo = lo >> 8;
      set[7] = lo & 255;
      lo = lo >> 8;
      set[6] = lo & 255;
      lo = lo >> 8;
      set[5] = lo & 255;
      set[4] = hi & 255;
      hi = hi >> 8;
      set[3] = hi & 255;
      hi = hi >> 8;
      set[2] = hi & 255;
      hi = hi >> 8;
      set[1] = hi & 255;
      buf.push(set);
    } else {
      throw new Error(`${ common.decodeErrPrefix } encountered BigInt larger than allowable range`);
    }
  }
}
encodeUint.encodedSize = function encodedSize(token) {
  return encodeUintValue.encodedSize(token.value);
};
encodeUintValue.encodedSize = function encodedSize(uint) {
  if (uint < uintBoundaries[0]) {
    return 1;
  }
  if (uint < uintBoundaries[1]) {
    return 2;
  }
  if (uint < uintBoundaries[2]) {
    return 3;
  }
  if (uint < uintBoundaries[3]) {
    return 5;
  }
  return 9;
};
encodeUint.compareTokens = function compareTokens(tok1, tok2) {
  return tok1.value < tok2.value ? -1 : tok1.value > tok2.value ? 1 : 0;
};

exports.decodeUint16 = decodeUint16;
exports.decodeUint32 = decodeUint32;
exports.decodeUint64 = decodeUint64;
exports.decodeUint8 = decodeUint8;
exports.encodeUint = encodeUint;
exports.encodeUintValue = encodeUintValue;
exports.readUint16 = readUint16;
exports.readUint32 = readUint32;
exports.readUint64 = readUint64;
exports.readUint8 = readUint8;
exports.uintBoundaries = uintBoundaries;


/***/ }),

/***/ 1005:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var token = __nccwpck_require__(7423);
var _0uint = __nccwpck_require__(3256);
var common = __nccwpck_require__(6754);

function decodeNegint8(data, pos, _minor, options) {
  return new token.Token(token.Type.negint, -1 - _0uint.readUint8(data, pos + 1, options), 2);
}
function decodeNegint16(data, pos, _minor, options) {
  return new token.Token(token.Type.negint, -1 - _0uint.readUint16(data, pos + 1, options), 3);
}
function decodeNegint32(data, pos, _minor, options) {
  return new token.Token(token.Type.negint, -1 - _0uint.readUint32(data, pos + 1, options), 5);
}
const neg1b = BigInt(-1);
const pos1b = BigInt(1);
function decodeNegint64(data, pos, _minor, options) {
  const int = _0uint.readUint64(data, pos + 1, options);
  if (typeof int !== 'bigint') {
    const value = -1 - int;
    if (value >= Number.MIN_SAFE_INTEGER) {
      return new token.Token(token.Type.negint, value, 9);
    }
  }
  if (options.allowBigInt !== true) {
    throw new Error(`${ common.decodeErrPrefix } integers outside of the safe integer range are not supported`);
  }
  return new token.Token(token.Type.negint, neg1b - BigInt(int), 9);
}
function encodeNegint(buf, token) {
  const negint = token.value;
  const unsigned = typeof negint === 'bigint' ? negint * neg1b - pos1b : negint * -1 - 1;
  _0uint.encodeUintValue(buf, token.type.majorEncoded, unsigned);
}
encodeNegint.encodedSize = function encodedSize(token) {
  const negint = token.value;
  const unsigned = typeof negint === 'bigint' ? negint * neg1b - pos1b : negint * -1 - 1;
  if (unsigned < _0uint.uintBoundaries[0]) {
    return 1;
  }
  if (unsigned < _0uint.uintBoundaries[1]) {
    return 2;
  }
  if (unsigned < _0uint.uintBoundaries[2]) {
    return 3;
  }
  if (unsigned < _0uint.uintBoundaries[3]) {
    return 5;
  }
  return 9;
};
encodeNegint.compareTokens = function compareTokens(tok1, tok2) {
  return tok1.value < tok2.value ? 1 : tok1.value > tok2.value ? -1 : 0;
};

exports.decodeNegint16 = decodeNegint16;
exports.decodeNegint32 = decodeNegint32;
exports.decodeNegint64 = decodeNegint64;
exports.decodeNegint8 = decodeNegint8;
exports.encodeNegint = encodeNegint;


/***/ }),

/***/ 9550:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var token = __nccwpck_require__(7423);
var common = __nccwpck_require__(6754);
var _0uint = __nccwpck_require__(3256);
var byteUtils = __nccwpck_require__(2543);

function toToken(data, pos, prefix, length) {
  common.assertEnoughData(data, pos, prefix + length);
  const buf = byteUtils.slice(data, pos + prefix, pos + prefix + length);
  return new token.Token(token.Type.bytes, buf, prefix + length);
}
function decodeBytesCompact(data, pos, minor, _options) {
  return toToken(data, pos, 1, minor);
}
function decodeBytes8(data, pos, _minor, options) {
  return toToken(data, pos, 2, _0uint.readUint8(data, pos + 1, options));
}
function decodeBytes16(data, pos, _minor, options) {
  return toToken(data, pos, 3, _0uint.readUint16(data, pos + 1, options));
}
function decodeBytes32(data, pos, _minor, options) {
  return toToken(data, pos, 5, _0uint.readUint32(data, pos + 1, options));
}
function decodeBytes64(data, pos, _minor, options) {
  const l = _0uint.readUint64(data, pos + 1, options);
  if (typeof l === 'bigint') {
    throw new Error(`${ common.decodeErrPrefix } 64-bit integer bytes lengths not supported`);
  }
  return toToken(data, pos, 9, l);
}
function tokenBytes(token$1) {
  if (token$1.encodedBytes === undefined) {
    token$1.encodedBytes = token$1.type === token.Type.string ? byteUtils.fromString(token$1.value) : token$1.value;
  }
  return token$1.encodedBytes;
}
function encodeBytes(buf, token) {
  const bytes = tokenBytes(token);
  _0uint.encodeUintValue(buf, token.type.majorEncoded, bytes.length);
  buf.push(bytes);
}
encodeBytes.encodedSize = function encodedSize(token) {
  const bytes = tokenBytes(token);
  return _0uint.encodeUintValue.encodedSize(bytes.length) + bytes.length;
};
encodeBytes.compareTokens = function compareTokens(tok1, tok2) {
  return compareBytes(tokenBytes(tok1), tokenBytes(tok2));
};
function compareBytes(b1, b2) {
  return b1.length < b2.length ? -1 : b1.length > b2.length ? 1 : byteUtils.compare(b1, b2);
}

exports.compareBytes = compareBytes;
exports.decodeBytes16 = decodeBytes16;
exports.decodeBytes32 = decodeBytes32;
exports.decodeBytes64 = decodeBytes64;
exports.decodeBytes8 = decodeBytes8;
exports.decodeBytesCompact = decodeBytesCompact;
exports.encodeBytes = encodeBytes;


/***/ }),

/***/ 2195:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var token = __nccwpck_require__(7423);
var common = __nccwpck_require__(6754);
var _0uint = __nccwpck_require__(3256);
var _2bytes = __nccwpck_require__(9550);
var byteUtils = __nccwpck_require__(2543);

function toToken(data, pos, prefix, length) {
  const totLength = prefix + length;
  common.assertEnoughData(data, pos, totLength);
  return new token.Token(token.Type.string, byteUtils.toString(data, pos + prefix, pos + totLength), totLength);
}
function decodeStringCompact(data, pos, minor, _options) {
  return toToken(data, pos, 1, minor);
}
function decodeString8(data, pos, _minor, options) {
  return toToken(data, pos, 2, _0uint.readUint8(data, pos + 1, options));
}
function decodeString16(data, pos, _minor, options) {
  return toToken(data, pos, 3, _0uint.readUint16(data, pos + 1, options));
}
function decodeString32(data, pos, _minor, options) {
  return toToken(data, pos, 5, _0uint.readUint32(data, pos + 1, options));
}
function decodeString64(data, pos, _minor, options) {
  const l = _0uint.readUint64(data, pos + 1, options);
  if (typeof l === 'bigint') {
    throw new Error(`${ common.decodeErrPrefix } 64-bit integer string lengths not supported`);
  }
  return toToken(data, pos, 9, l);
}
const encodeString = _2bytes.encodeBytes;

exports.decodeString16 = decodeString16;
exports.decodeString32 = decodeString32;
exports.decodeString64 = decodeString64;
exports.decodeString8 = decodeString8;
exports.decodeStringCompact = decodeStringCompact;
exports.encodeString = encodeString;


/***/ }),

/***/ 4441:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var token = __nccwpck_require__(7423);
var _0uint = __nccwpck_require__(3256);
var common = __nccwpck_require__(6754);

function toToken(_data, _pos, prefix, length) {
  return new token.Token(token.Type.array, length, prefix);
}
function decodeArrayCompact(data, pos, minor, _options) {
  return toToken(data, pos, 1, minor);
}
function decodeArray8(data, pos, _minor, options) {
  return toToken(data, pos, 2, _0uint.readUint8(data, pos + 1, options));
}
function decodeArray16(data, pos, _minor, options) {
  return toToken(data, pos, 3, _0uint.readUint16(data, pos + 1, options));
}
function decodeArray32(data, pos, _minor, options) {
  return toToken(data, pos, 5, _0uint.readUint32(data, pos + 1, options));
}
function decodeArray64(data, pos, _minor, options) {
  const l = _0uint.readUint64(data, pos + 1, options);
  if (typeof l === 'bigint') {
    throw new Error(`${ common.decodeErrPrefix } 64-bit integer array lengths not supported`);
  }
  return toToken(data, pos, 9, l);
}
function decodeArrayIndefinite(data, pos, _minor, options) {
  if (options.allowIndefinite === false) {
    throw new Error(`${ common.decodeErrPrefix } indefinite length items not allowed`);
  }
  return toToken(data, pos, 1, Infinity);
}
function encodeArray(buf, token$1) {
  _0uint.encodeUintValue(buf, token.Type.array.majorEncoded, token$1.value);
}
encodeArray.compareTokens = _0uint.encodeUint.compareTokens;

exports.decodeArray16 = decodeArray16;
exports.decodeArray32 = decodeArray32;
exports.decodeArray64 = decodeArray64;
exports.decodeArray8 = decodeArray8;
exports.decodeArrayCompact = decodeArrayCompact;
exports.decodeArrayIndefinite = decodeArrayIndefinite;
exports.encodeArray = encodeArray;


/***/ }),

/***/ 619:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var token = __nccwpck_require__(7423);
var _0uint = __nccwpck_require__(3256);
var common = __nccwpck_require__(6754);

function toToken(_data, _pos, prefix, length) {
  return new token.Token(token.Type.map, length, prefix);
}
function decodeMapCompact(data, pos, minor, _options) {
  return toToken(data, pos, 1, minor);
}
function decodeMap8(data, pos, _minor, options) {
  return toToken(data, pos, 2, _0uint.readUint8(data, pos + 1, options));
}
function decodeMap16(data, pos, _minor, options) {
  return toToken(data, pos, 3, _0uint.readUint16(data, pos + 1, options));
}
function decodeMap32(data, pos, _minor, options) {
  return toToken(data, pos, 5, _0uint.readUint32(data, pos + 1, options));
}
function decodeMap64(data, pos, _minor, options) {
  const l = _0uint.readUint64(data, pos + 1, options);
  if (typeof l === 'bigint') {
    throw new Error(`${ common.decodeErrPrefix } 64-bit integer map lengths not supported`);
  }
  return toToken(data, pos, 9, l);
}
function decodeMapIndefinite(data, pos, _minor, options) {
  if (options.allowIndefinite === false) {
    throw new Error(`${ common.decodeErrPrefix } indefinite length items not allowed`);
  }
  return toToken(data, pos, 1, Infinity);
}
function encodeMap(buf, token$1) {
  _0uint.encodeUintValue(buf, token.Type.map.majorEncoded, token$1.value);
}
encodeMap.compareTokens = _0uint.encodeUint.compareTokens;

exports.decodeMap16 = decodeMap16;
exports.decodeMap32 = decodeMap32;
exports.decodeMap64 = decodeMap64;
exports.decodeMap8 = decodeMap8;
exports.decodeMapCompact = decodeMapCompact;
exports.decodeMapIndefinite = decodeMapIndefinite;
exports.encodeMap = encodeMap;


/***/ }),

/***/ 6880:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var token = __nccwpck_require__(7423);
var _0uint = __nccwpck_require__(3256);

function decodeTagCompact(_data, _pos, minor, _options) {
  return new token.Token(token.Type.tag, minor, 1);
}
function decodeTag8(data, pos, _minor, options) {
  return new token.Token(token.Type.tag, _0uint.readUint8(data, pos + 1, options), 2);
}
function decodeTag16(data, pos, _minor, options) {
  return new token.Token(token.Type.tag, _0uint.readUint16(data, pos + 1, options), 3);
}
function decodeTag32(data, pos, _minor, options) {
  return new token.Token(token.Type.tag, _0uint.readUint32(data, pos + 1, options), 5);
}
function decodeTag64(data, pos, _minor, options) {
  return new token.Token(token.Type.tag, _0uint.readUint64(data, pos + 1, options), 9);
}
function encodeTag(buf, token$1) {
  _0uint.encodeUintValue(buf, token.Type.tag.majorEncoded, token$1.value);
}
encodeTag.compareTokens = _0uint.encodeUint.compareTokens;

exports.decodeTag16 = decodeTag16;
exports.decodeTag32 = decodeTag32;
exports.decodeTag64 = decodeTag64;
exports.decodeTag8 = decodeTag8;
exports.decodeTagCompact = decodeTagCompact;
exports.encodeTag = encodeTag;


/***/ }),

/***/ 1760:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var token = __nccwpck_require__(7423);
var common = __nccwpck_require__(6754);
var _0uint = __nccwpck_require__(3256);

const MINOR_FALSE = 20;
const MINOR_TRUE = 21;
const MINOR_NULL = 22;
const MINOR_UNDEFINED = 23;
function decodeUndefined(_data, _pos, _minor, options) {
  if (options.allowUndefined === false) {
    throw new Error(`${ common.decodeErrPrefix } undefined values are not supported`);
  }
  return new token.Token(token.Type.undefined, undefined, 1);
}
function decodeBreak(_data, _pos, _minor, options) {
  if (options.allowIndefinite === false) {
    throw new Error(`${ common.decodeErrPrefix } indefinite length items not allowed`);
  }
  return new token.Token(token.Type.break, undefined, 1);
}
function createToken(value, bytes, options) {
  if (options) {
    if (options.allowNaN === false && Number.isNaN(value)) {
      throw new Error(`${ common.decodeErrPrefix } NaN values are not supported`);
    }
    if (options.allowInfinity === false && (value === Infinity || value === -Infinity)) {
      throw new Error(`${ common.decodeErrPrefix } Infinity values are not supported`);
    }
  }
  return new token.Token(token.Type.float, value, bytes);
}
function decodeFloat16(data, pos, _minor, options) {
  return createToken(readFloat16(data, pos + 1), 3, options);
}
function decodeFloat32(data, pos, _minor, options) {
  return createToken(readFloat32(data, pos + 1), 5, options);
}
function decodeFloat64(data, pos, _minor, options) {
  return createToken(readFloat64(data, pos + 1), 9, options);
}
function encodeFloat(buf, token$1, options) {
  const float = token$1.value;
  if (float === false) {
    buf.push([token.Type.float.majorEncoded | MINOR_FALSE]);
  } else if (float === true) {
    buf.push([token.Type.float.majorEncoded | MINOR_TRUE]);
  } else if (float === null) {
    buf.push([token.Type.float.majorEncoded | MINOR_NULL]);
  } else if (float === undefined) {
    buf.push([token.Type.float.majorEncoded | MINOR_UNDEFINED]);
  } else {
    let decoded;
    let success = false;
    if (!options || options.float64 !== true) {
      encodeFloat16(float);
      decoded = readFloat16(ui8a, 1);
      if (float === decoded || Number.isNaN(float)) {
        ui8a[0] = 249;
        buf.push(ui8a.slice(0, 3));
        success = true;
      } else {
        encodeFloat32(float);
        decoded = readFloat32(ui8a, 1);
        if (float === decoded) {
          ui8a[0] = 250;
          buf.push(ui8a.slice(0, 5));
          success = true;
        }
      }
    }
    if (!success) {
      encodeFloat64(float);
      decoded = readFloat64(ui8a, 1);
      ui8a[0] = 251;
      buf.push(ui8a.slice(0, 9));
    }
  }
}
encodeFloat.encodedSize = function encodedSize(token, options) {
  const float = token.value;
  if (float === false || float === true || float === null || float === undefined) {
    return 1;
  }
  let decoded;
  if (!options || options.float64 !== true) {
    encodeFloat16(float);
    decoded = readFloat16(ui8a, 1);
    if (float === decoded || Number.isNaN(float)) {
      return 3;
    }
    encodeFloat32(float);
    decoded = readFloat32(ui8a, 1);
    if (float === decoded) {
      return 5;
    }
  }
  return 9;
};
const buffer = new ArrayBuffer(9);
const dataView = new DataView(buffer, 1);
const ui8a = new Uint8Array(buffer, 0);
function encodeFloat16(inp) {
  if (inp === Infinity) {
    dataView.setUint16(0, 31744, false);
  } else if (inp === -Infinity) {
    dataView.setUint16(0, 64512, false);
  } else if (Number.isNaN(inp)) {
    dataView.setUint16(0, 32256, false);
  } else {
    dataView.setFloat32(0, inp);
    const valu32 = dataView.getUint32(0);
    const exponent = (valu32 & 2139095040) >> 23;
    const mantissa = valu32 & 8388607;
    if (exponent === 255) {
      dataView.setUint16(0, 31744, false);
    } else if (exponent === 0) {
      dataView.setUint16(0, (inp & 2147483648) >> 16 | mantissa >> 13, false);
    } else {
      const logicalExponent = exponent - 127;
      if (logicalExponent < -24) {
        dataView.setUint16(0, 0);
      } else if (logicalExponent < -14) {
        dataView.setUint16(0, (valu32 & 2147483648) >> 16 | 1 << 24 + logicalExponent, false);
      } else {
        dataView.setUint16(0, (valu32 & 2147483648) >> 16 | logicalExponent + 15 << 10 | mantissa >> 13, false);
      }
    }
  }
}
function readFloat16(ui8a, pos) {
  if (ui8a.length - pos < 2) {
    throw new Error(`${ common.decodeErrPrefix } not enough data for float16`);
  }
  const half = (ui8a[pos] << 8) + ui8a[pos + 1];
  if (half === 31744) {
    return Infinity;
  }
  if (half === 64512) {
    return -Infinity;
  }
  if (half === 32256) {
    return NaN;
  }
  const exp = half >> 10 & 31;
  const mant = half & 1023;
  let val;
  if (exp === 0) {
    val = mant * 2 ** -24;
  } else if (exp !== 31) {
    val = (mant + 1024) * 2 ** (exp - 25);
  } else {
    val = mant === 0 ? Infinity : NaN;
  }
  return half & 32768 ? -val : val;
}
function encodeFloat32(inp) {
  dataView.setFloat32(0, inp, false);
}
function readFloat32(ui8a, pos) {
  if (ui8a.length - pos < 4) {
    throw new Error(`${ common.decodeErrPrefix } not enough data for float32`);
  }
  const offset = (ui8a.byteOffset || 0) + pos;
  return new DataView(ui8a.buffer, offset, 4).getFloat32(0, false);
}
function encodeFloat64(inp) {
  dataView.setFloat64(0, inp, false);
}
function readFloat64(ui8a, pos) {
  if (ui8a.length - pos < 8) {
    throw new Error(`${ common.decodeErrPrefix } not enough data for float64`);
  }
  const offset = (ui8a.byteOffset || 0) + pos;
  return new DataView(ui8a.buffer, offset, 8).getFloat64(0, false);
}
encodeFloat.compareTokens = _0uint.encodeUint.compareTokens;

exports.decodeBreak = decodeBreak;
exports.decodeFloat16 = decodeFloat16;
exports.decodeFloat32 = decodeFloat32;
exports.decodeFloat64 = decodeFloat64;
exports.decodeUndefined = decodeUndefined;
exports.encodeFloat = encodeFloat;


/***/ }),

/***/ 783:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var byteUtils = __nccwpck_require__(2543);

const defaultChunkSize = 256;
class Bl {
  constructor(chunkSize = defaultChunkSize) {
    this.chunkSize = chunkSize;
    this.cursor = 0;
    this.maxCursor = -1;
    this.chunks = [];
    this._initReuseChunk = null;
  }
  reset() {
    this.chunks = [];
    this.cursor = 0;
    this.maxCursor = -1;
    if (this._initReuseChunk !== null) {
      this.chunks.push(this._initReuseChunk);
      this.maxCursor = this._initReuseChunk.length - 1;
    }
  }
  push(bytes) {
    let topChunk = this.chunks[this.chunks.length - 1];
    const newMax = this.cursor + bytes.length;
    if (newMax <= this.maxCursor + 1) {
      const chunkPos = topChunk.length - (this.maxCursor - this.cursor) - 1;
      topChunk.set(bytes, chunkPos);
    } else {
      if (topChunk) {
        const chunkPos = topChunk.length - (this.maxCursor - this.cursor) - 1;
        if (chunkPos < topChunk.length) {
          this.chunks[this.chunks.length - 1] = topChunk.subarray(0, chunkPos);
          this.maxCursor = this.cursor - 1;
        }
      }
      if (bytes.length < 64 && bytes.length < this.chunkSize) {
        topChunk = byteUtils.alloc(this.chunkSize);
        this.chunks.push(topChunk);
        this.maxCursor += topChunk.length;
        if (this._initReuseChunk === null) {
          this._initReuseChunk = topChunk;
        }
        topChunk.set(bytes, 0);
      } else {
        this.chunks.push(bytes);
        this.maxCursor += bytes.length;
      }
    }
    this.cursor += bytes.length;
  }
  toBytes(reset = false) {
    let byts;
    if (this.chunks.length === 1) {
      const chunk = this.chunks[0];
      if (reset && this.cursor > chunk.length / 2) {
        byts = this.cursor === chunk.length ? chunk : chunk.subarray(0, this.cursor);
        this._initReuseChunk = null;
        this.chunks = [];
      } else {
        byts = byteUtils.slice(chunk, 0, this.cursor);
      }
    } else {
      byts = byteUtils.concat(this.chunks, this.cursor);
    }
    if (reset) {
      this.reset();
    }
    return byts;
  }
}

exports.Bl = Bl;


/***/ }),

/***/ 2543:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

const useBuffer = globalThis.process && !globalThis.process.browser && globalThis.Buffer && typeof globalThis.Buffer.isBuffer === 'function';
const textDecoder = new TextDecoder();
const textEncoder = new TextEncoder();
function isBuffer(buf) {
  return useBuffer && globalThis.Buffer.isBuffer(buf);
}
function asU8A(buf) {
  if (!(buf instanceof Uint8Array)) {
    return Uint8Array.from(buf);
  }
  return isBuffer(buf) ? new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength) : buf;
}
const toString = useBuffer ? (bytes, start, end) => {
  return end - start > 64 ? globalThis.Buffer.from(bytes.subarray(start, end)).toString('utf8') : utf8Slice(bytes, start, end);
} : (bytes, start, end) => {
  return end - start > 64 ? textDecoder.decode(bytes.subarray(start, end)) : utf8Slice(bytes, start, end);
};
const fromString = useBuffer ? string => {
  return string.length > 64 ? globalThis.Buffer.from(string) : utf8ToBytes(string);
} : string => {
  return string.length > 64 ? textEncoder.encode(string) : utf8ToBytes(string);
};
const fromArray = arr => {
  return Uint8Array.from(arr);
};
const slice = useBuffer ? (bytes, start, end) => {
  if (isBuffer(bytes)) {
    return new Uint8Array(bytes.subarray(start, end));
  }
  return bytes.slice(start, end);
} : (bytes, start, end) => {
  return bytes.slice(start, end);
};
const concat = useBuffer ? (chunks, length) => {
  chunks = chunks.map(c => c instanceof Uint8Array ? c : globalThis.Buffer.from(c));
  return asU8A(globalThis.Buffer.concat(chunks, length));
} : (chunks, length) => {
  const out = new Uint8Array(length);
  let off = 0;
  for (let b of chunks) {
    if (off + b.length > out.length) {
      b = b.subarray(0, out.length - off);
    }
    out.set(b, off);
    off += b.length;
  }
  return out;
};
const alloc = useBuffer ? size => {
  return globalThis.Buffer.allocUnsafe(size);
} : size => {
  return new Uint8Array(size);
};
const toHex = useBuffer ? d => {
  if (typeof d === 'string') {
    return d;
  }
  return globalThis.Buffer.from(toBytes(d)).toString('hex');
} : d => {
  if (typeof d === 'string') {
    return d;
  }
  return Array.prototype.reduce.call(toBytes(d), (p, c) => `${ p }${ c.toString(16).padStart(2, '0') }`, '');
};
const fromHex = useBuffer ? hex => {
  if (hex instanceof Uint8Array) {
    return hex;
  }
  return globalThis.Buffer.from(hex, 'hex');
} : hex => {
  if (hex instanceof Uint8Array) {
    return hex;
  }
  if (!hex.length) {
    return new Uint8Array(0);
  }
  return new Uint8Array(hex.split('').map((c, i, d) => i % 2 === 0 ? `0x${ c }${ d[i + 1] }` : '').filter(Boolean).map(e => parseInt(e, 16)));
};
function toBytes(obj) {
  if (obj instanceof Uint8Array && obj.constructor.name === 'Uint8Array') {
    return obj;
  }
  if (obj instanceof ArrayBuffer) {
    return new Uint8Array(obj);
  }
  if (ArrayBuffer.isView(obj)) {
    return new Uint8Array(obj.buffer, obj.byteOffset, obj.byteLength);
  }
  throw new Error('Unknown type, must be binary type');
}
function compare(b1, b2) {
  if (isBuffer(b1) && isBuffer(b2)) {
    return b1.compare(b2);
  }
  for (let i = 0; i < b1.length; i++) {
    if (b1[i] === b2[i]) {
      continue;
    }
    return b1[i] < b2[i] ? -1 : 1;
  }
  return 0;
}
function utf8ToBytes(string, units = Infinity) {
  let codePoint;
  const length = string.length;
  let leadSurrogate = null;
  const bytes = [];
  for (let i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);
    if (codePoint > 55295 && codePoint < 57344) {
      if (!leadSurrogate) {
        if (codePoint > 56319) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
          continue;
        } else if (i + 1 === length) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
          continue;
        }
        leadSurrogate = codePoint;
        continue;
      }
      if (codePoint < 56320) {
        if ((units -= 3) > -1)
          bytes.push(239, 191, 189);
        leadSurrogate = codePoint;
        continue;
      }
      codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
    } else if (leadSurrogate) {
      if ((units -= 3) > -1)
        bytes.push(239, 191, 189);
    }
    leadSurrogate = null;
    if (codePoint < 128) {
      if ((units -= 1) < 0)
        break;
      bytes.push(codePoint);
    } else if (codePoint < 2048) {
      if ((units -= 2) < 0)
        break;
      bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
    } else if (codePoint < 65536) {
      if ((units -= 3) < 0)
        break;
      bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
    } else if (codePoint < 1114112) {
      if ((units -= 4) < 0)
        break;
      bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
    } else {
      throw new Error('Invalid code point');
    }
  }
  return bytes;
}
function utf8Slice(buf, offset, end) {
  const res = [];
  while (offset < end) {
    const firstByte = buf[offset];
    let codePoint = null;
    let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
    if (offset + bytesPerSequence <= end) {
      let secondByte, thirdByte, fourthByte, tempCodePoint;
      switch (bytesPerSequence) {
      case 1:
        if (firstByte < 128) {
          codePoint = firstByte;
        }
        break;
      case 2:
        secondByte = buf[offset + 1];
        if ((secondByte & 192) === 128) {
          tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
          if (tempCodePoint > 127) {
            codePoint = tempCodePoint;
          }
        }
        break;
      case 3:
        secondByte = buf[offset + 1];
        thirdByte = buf[offset + 2];
        if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
          tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
          if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
            codePoint = tempCodePoint;
          }
        }
        break;
      case 4:
        secondByte = buf[offset + 1];
        thirdByte = buf[offset + 2];
        fourthByte = buf[offset + 3];
        if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
          tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
          if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
            codePoint = tempCodePoint;
          }
        }
      }
    }
    if (codePoint === null) {
      codePoint = 65533;
      bytesPerSequence = 1;
    } else if (codePoint > 65535) {
      codePoint -= 65536;
      res.push(codePoint >>> 10 & 1023 | 55296);
      codePoint = 56320 | codePoint & 1023;
    }
    res.push(codePoint);
    offset += bytesPerSequence;
  }
  return decodeCodePointsArray(res);
}
const MAX_ARGUMENTS_LENGTH = 4096;
function decodeCodePointsArray(codePoints) {
  const len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints);
  }
  let res = '';
  let i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
  }
  return res;
}

exports.alloc = alloc;
exports.asU8A = asU8A;
exports.compare = compare;
exports.concat = concat;
exports.decodeCodePointsArray = decodeCodePointsArray;
exports.fromArray = fromArray;
exports.fromHex = fromHex;
exports.fromString = fromString;
exports.slice = slice;
exports.toHex = toHex;
exports.toString = toString;
exports.useBuffer = useBuffer;


/***/ }),

/***/ 6754:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

const decodeErrPrefix = 'CBOR decode error:';
const encodeErrPrefix = 'CBOR encode error:';
const uintMinorPrefixBytes = [];
uintMinorPrefixBytes[23] = 1;
uintMinorPrefixBytes[24] = 2;
uintMinorPrefixBytes[25] = 3;
uintMinorPrefixBytes[26] = 5;
uintMinorPrefixBytes[27] = 9;
function assertEnoughData(data, pos, need) {
  if (data.length - pos < need) {
    throw new Error(`${ decodeErrPrefix } not enough data for type`);
  }
}

exports.assertEnoughData = assertEnoughData;
exports.decodeErrPrefix = decodeErrPrefix;
exports.encodeErrPrefix = encodeErrPrefix;
exports.uintMinorPrefixBytes = uintMinorPrefixBytes;


/***/ }),

/***/ 2207:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var common = __nccwpck_require__(6754);
var token = __nccwpck_require__(7423);
var jump = __nccwpck_require__(4092);

const defaultDecodeOptions = {
  strict: false,
  allowIndefinite: true,
  allowUndefined: true,
  allowBigInt: true
};
class Tokeniser {
  constructor(data, options = {}) {
    this.pos = 0;
    this.data = data;
    this.options = options;
  }
  done() {
    return this.pos >= this.data.length;
  }
  next() {
    const byt = this.data[this.pos];
    let token = jump.quick[byt];
    if (token === undefined) {
      const decoder = jump.jump[byt];
      if (!decoder) {
        throw new Error(`${ common.decodeErrPrefix } no decoder for major type ${ byt >>> 5 } (byte 0x${ byt.toString(16).padStart(2, '0') })`);
      }
      const minor = byt & 31;
      token = decoder(this.data, this.pos, minor, this.options);
    }
    this.pos += token.encodedLength;
    return token;
  }
}
const DONE = Symbol.for('DONE');
const BREAK = Symbol.for('BREAK');
function tokenToArray(token, tokeniser, options) {
  const arr = [];
  for (let i = 0; i < token.value; i++) {
    const value = tokensToObject(tokeniser, options);
    if (value === BREAK) {
      if (token.value === Infinity) {
        break;
      }
      throw new Error(`${ common.decodeErrPrefix } got unexpected break to lengthed array`);
    }
    if (value === DONE) {
      throw new Error(`${ common.decodeErrPrefix } found array but not enough entries (got ${ i }, expected ${ token.value })`);
    }
    arr[i] = value;
  }
  return arr;
}
function tokenToMap(token, tokeniser, options) {
  const useMaps = options.useMaps === true;
  const obj = useMaps ? undefined : {};
  const m = useMaps ? new Map() : undefined;
  for (let i = 0; i < token.value; i++) {
    const key = tokensToObject(tokeniser, options);
    if (key === BREAK) {
      if (token.value === Infinity) {
        break;
      }
      throw new Error(`${ common.decodeErrPrefix } got unexpected break to lengthed map`);
    }
    if (key === DONE) {
      throw new Error(`${ common.decodeErrPrefix } found map but not enough entries (got ${ i } [no key], expected ${ token.value })`);
    }
    if (useMaps !== true && typeof key !== 'string') {
      throw new Error(`${ common.decodeErrPrefix } non-string keys not supported (got ${ typeof key })`);
    }
    const value = tokensToObject(tokeniser, options);
    if (value === DONE) {
      throw new Error(`${ common.decodeErrPrefix } found map but not enough entries (got ${ i } [no value], expected ${ token.value })`);
    }
    if (useMaps) {
      m.set(key, value);
    } else {
      obj[key] = value;
    }
  }
  return useMaps ? m : obj;
}
function tokensToObject(tokeniser, options) {
  if (tokeniser.done()) {
    return DONE;
  }
  const token$1 = tokeniser.next();
  if (token$1.type === token.Type.break) {
    return BREAK;
  }
  if (token$1.type.terminal) {
    return token$1.value;
  }
  if (token$1.type === token.Type.array) {
    return tokenToArray(token$1, tokeniser, options);
  }
  if (token$1.type === token.Type.map) {
    return tokenToMap(token$1, tokeniser, options);
  }
  if (token$1.type === token.Type.tag) {
    if (options.tags && typeof options.tags[token$1.value] === 'function') {
      const tagged = tokensToObject(tokeniser, options);
      return options.tags[token$1.value](tagged);
    }
    throw new Error(`${ common.decodeErrPrefix } tag not supported (${ token$1.value })`);
  }
  throw new Error('unsupported');
}
function decode(data, options) {
  if (!(data instanceof Uint8Array)) {
    throw new Error(`${ common.decodeErrPrefix } data to decode must be a Uint8Array`);
  }
  options = Object.assign({}, defaultDecodeOptions, options);
  const tokeniser = options.tokenizer || new Tokeniser(data, options);
  const decoded = tokensToObject(tokeniser, options);
  if (decoded === DONE) {
    throw new Error(`${ common.decodeErrPrefix } did not find any content to decode`);
  }
  if (decoded === BREAK) {
    throw new Error(`${ common.decodeErrPrefix } got unexpected break`);
  }
  if (!tokeniser.done()) {
    throw new Error(`${ common.decodeErrPrefix } too many terminals, data makes no sense`);
  }
  return decoded;
}

exports.Tokeniser = Tokeniser;
exports.decode = decode;
exports.tokensToObject = tokensToObject;


/***/ }),

/***/ 1138:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var is = __nccwpck_require__(5876);
var token = __nccwpck_require__(7423);
var bl = __nccwpck_require__(783);
var common = __nccwpck_require__(6754);
var jump = __nccwpck_require__(4092);
var byteUtils = __nccwpck_require__(2543);
var _0uint = __nccwpck_require__(3256);
var _1negint = __nccwpck_require__(1005);
var _2bytes = __nccwpck_require__(9550);
var _3string = __nccwpck_require__(2195);
var _4array = __nccwpck_require__(4441);
var _5map = __nccwpck_require__(619);
var _6tag = __nccwpck_require__(6880);
var _7float = __nccwpck_require__(1760);

const defaultEncodeOptions = {
  float64: false,
  mapSorter,
  quickEncodeToken: jump.quickEncodeToken
};
const cborEncoders = [];
cborEncoders[token.Type.uint.major] = _0uint.encodeUint;
cborEncoders[token.Type.negint.major] = _1negint.encodeNegint;
cborEncoders[token.Type.bytes.major] = _2bytes.encodeBytes;
cborEncoders[token.Type.string.major] = _3string.encodeString;
cborEncoders[token.Type.array.major] = _4array.encodeArray;
cborEncoders[token.Type.map.major] = _5map.encodeMap;
cborEncoders[token.Type.tag.major] = _6tag.encodeTag;
cborEncoders[token.Type.float.major] = _7float.encodeFloat;
const buf = new bl.Bl();
class Ref {
  constructor(obj, parent) {
    this.obj = obj;
    this.parent = parent;
  }
  includes(obj) {
    let p = this;
    do {
      if (p.obj === obj) {
        return true;
      }
    } while (p = p.parent);
    return false;
  }
  static createCheck(stack, obj) {
    if (stack && stack.includes(obj)) {
      throw new Error(`${ common.encodeErrPrefix } object contains circular references`);
    }
    return new Ref(obj, stack);
  }
}
const simpleTokens = {
  null: new token.Token(token.Type.null, null),
  undefined: new token.Token(token.Type.undefined, undefined),
  true: new token.Token(token.Type.true, true),
  false: new token.Token(token.Type.false, false),
  emptyArray: new token.Token(token.Type.array, 0),
  emptyMap: new token.Token(token.Type.map, 0)
};
const typeEncoders = {
  number(obj, _typ, _options, _refStack) {
    if (!Number.isInteger(obj) || !Number.isSafeInteger(obj)) {
      return new token.Token(token.Type.float, obj);
    } else if (obj >= 0) {
      return new token.Token(token.Type.uint, obj);
    } else {
      return new token.Token(token.Type.negint, obj);
    }
  },
  bigint(obj, _typ, _options, _refStack) {
    if (obj >= BigInt(0)) {
      return new token.Token(token.Type.uint, obj);
    } else {
      return new token.Token(token.Type.negint, obj);
    }
  },
  Uint8Array(obj, _typ, _options, _refStack) {
    return new token.Token(token.Type.bytes, obj);
  },
  string(obj, _typ, _options, _refStack) {
    return new token.Token(token.Type.string, obj);
  },
  boolean(obj, _typ, _options, _refStack) {
    return obj ? simpleTokens.true : simpleTokens.false;
  },
  null(_obj, _typ, _options, _refStack) {
    return simpleTokens.null;
  },
  undefined(_obj, _typ, _options, _refStack) {
    return simpleTokens.undefined;
  },
  ArrayBuffer(obj, _typ, _options, _refStack) {
    return new token.Token(token.Type.bytes, new Uint8Array(obj));
  },
  DataView(obj, _typ, _options, _refStack) {
    return new token.Token(token.Type.bytes, new Uint8Array(obj.buffer, obj.byteOffset, obj.byteLength));
  },
  Array(obj, _typ, options, refStack) {
    if (!obj.length) {
      if (options.addBreakTokens === true) {
        return [
          simpleTokens.emptyArray,
          new token.Token(token.Type.break)
        ];
      }
      return simpleTokens.emptyArray;
    }
    refStack = Ref.createCheck(refStack, obj);
    const entries = [];
    let i = 0;
    for (const e of obj) {
      entries[i++] = objectToTokens(e, options, refStack);
    }
    if (options.addBreakTokens) {
      return [
        new token.Token(token.Type.array, obj.length),
        entries,
        new token.Token(token.Type.break)
      ];
    }
    return [
      new token.Token(token.Type.array, obj.length),
      entries
    ];
  },
  Object(obj, typ, options, refStack) {
    const isMap = typ !== 'Object';
    const keys = isMap ? obj.keys() : Object.keys(obj);
    const length = isMap ? obj.size : keys.length;
    if (!length) {
      if (options.addBreakTokens === true) {
        return [
          simpleTokens.emptyMap,
          new token.Token(token.Type.break)
        ];
      }
      return simpleTokens.emptyMap;
    }
    refStack = Ref.createCheck(refStack, obj);
    const entries = [];
    let i = 0;
    for (const key of keys) {
      entries[i++] = [
        objectToTokens(key, options, refStack),
        objectToTokens(isMap ? obj.get(key) : obj[key], options, refStack)
      ];
    }
    sortMapEntries(entries, options);
    if (options.addBreakTokens) {
      return [
        new token.Token(token.Type.map, length),
        entries,
        new token.Token(token.Type.break)
      ];
    }
    return [
      new token.Token(token.Type.map, length),
      entries
    ];
  }
};
typeEncoders.Map = typeEncoders.Object;
typeEncoders.Buffer = typeEncoders.Uint8Array;
for (const typ of 'Uint8Clamped Uint16 Uint32 Int8 Int16 Int32 BigUint64 BigInt64 Float32 Float64'.split(' ')) {
  typeEncoders[`${ typ }Array`] = typeEncoders.DataView;
}
function objectToTokens(obj, options = {}, refStack) {
  const typ = is.is(obj);
  const customTypeEncoder = options && options.typeEncoders && options.typeEncoders[typ] || typeEncoders[typ];
  if (typeof customTypeEncoder === 'function') {
    const tokens = customTypeEncoder(obj, typ, options, refStack);
    if (tokens != null) {
      return tokens;
    }
  }
  const typeEncoder = typeEncoders[typ];
  if (!typeEncoder) {
    throw new Error(`${ common.encodeErrPrefix } unsupported type: ${ typ }`);
  }
  return typeEncoder(obj, typ, options, refStack);
}
function sortMapEntries(entries, options) {
  if (options.mapSorter) {
    entries.sort(options.mapSorter);
  }
}
function mapSorter(e1, e2) {
  const keyToken1 = Array.isArray(e1[0]) ? e1[0][0] : e1[0];
  const keyToken2 = Array.isArray(e2[0]) ? e2[0][0] : e2[0];
  if (keyToken1.type !== keyToken2.type) {
    return keyToken1.type.compare(keyToken2.type);
  }
  const major = keyToken1.type.major;
  const tcmp = cborEncoders[major].compareTokens(keyToken1, keyToken2);
  if (tcmp === 0) {
    console.warn('WARNING: complex key types used, CBOR key sorting guarantees are gone');
  }
  return tcmp;
}
function tokensToEncoded(buf, tokens, encoders, options) {
  if (Array.isArray(tokens)) {
    for (const token of tokens) {
      tokensToEncoded(buf, token, encoders, options);
    }
  } else {
    encoders[tokens.type.major](buf, tokens, options);
  }
}
function encodeCustom(data, encoders, options) {
  const tokens = objectToTokens(data, options);
  if (!Array.isArray(tokens) && options.quickEncodeToken) {
    const quickBytes = options.quickEncodeToken(tokens);
    if (quickBytes) {
      return quickBytes;
    }
    const encoder = encoders[tokens.type.major];
    if (encoder.encodedSize) {
      const size = encoder.encodedSize(tokens, options);
      const buf = new bl.Bl(size);
      encoder(buf, tokens, options);
      if (buf.chunks.length !== 1) {
        throw new Error(`Unexpected error: pre-calculated length for ${ tokens } was wrong`);
      }
      return byteUtils.asU8A(buf.chunks[0]);
    }
  }
  tokensToEncoded(buf, tokens, encoders, options);
  return buf.toBytes(true);
}
function encode(data, options) {
  options = Object.assign({}, defaultEncodeOptions, options);
  return encodeCustom(data, cborEncoders, options);
}

exports.Ref = Ref;
exports.encode = encode;
exports.encodeCustom = encodeCustom;
exports.objectToTokens = objectToTokens;


/***/ }),

/***/ 5876:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

const typeofs = [
  'string',
  'number',
  'bigint',
  'symbol'
];
const objectTypeNames = [
  'Function',
  'Generator',
  'AsyncGenerator',
  'GeneratorFunction',
  'AsyncGeneratorFunction',
  'AsyncFunction',
  'Observable',
  'Array',
  'Buffer',
  'Object',
  'RegExp',
  'Date',
  'Error',
  'Map',
  'Set',
  'WeakMap',
  'WeakSet',
  'ArrayBuffer',
  'SharedArrayBuffer',
  'DataView',
  'Promise',
  'URL',
  'HTMLElement',
  'Int8Array',
  'Uint8Array',
  'Uint8ClampedArray',
  'Int16Array',
  'Uint16Array',
  'Int32Array',
  'Uint32Array',
  'Float32Array',
  'Float64Array',
  'BigInt64Array',
  'BigUint64Array'
];
function is(value) {
  if (value === null) {
    return 'null';
  }
  if (value === undefined) {
    return 'undefined';
  }
  if (value === true || value === false) {
    return 'boolean';
  }
  const typeOf = typeof value;
  if (typeofs.includes(typeOf)) {
    return typeOf;
  }
  if (typeOf === 'function') {
    return 'Function';
  }
  if (Array.isArray(value)) {
    return 'Array';
  }
  if (isBuffer(value)) {
    return 'Buffer';
  }
  const objectType = getObjectType(value);
  if (objectType) {
    return objectType;
  }
  return 'Object';
}
function isBuffer(value) {
  return value && value.constructor && value.constructor.isBuffer && value.constructor.isBuffer.call(null, value);
}
function getObjectType(value) {
  const objectTypeName = Object.prototype.toString.call(value).slice(8, -1);
  if (objectTypeNames.includes(objectTypeName)) {
    return objectTypeName;
  }
  return undefined;
}

exports.is = is;


/***/ }),

/***/ 4092:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var token = __nccwpck_require__(7423);
var _0uint = __nccwpck_require__(3256);
var _1negint = __nccwpck_require__(1005);
var _2bytes = __nccwpck_require__(9550);
var _3string = __nccwpck_require__(2195);
var _4array = __nccwpck_require__(4441);
var _5map = __nccwpck_require__(619);
var _6tag = __nccwpck_require__(6880);
var _7float = __nccwpck_require__(1760);
var common = __nccwpck_require__(6754);
var byteUtils = __nccwpck_require__(2543);

function invalidMinor(data, pos, minor) {
  throw new Error(`${ common.decodeErrPrefix } encountered invalid minor (${ minor }) for major ${ data[pos] >>> 5 }`);
}
function errorer(msg) {
  return () => {
    throw new Error(`${ common.decodeErrPrefix } ${ msg }`);
  };
}
const jump = [];
for (let i = 0; i <= 23; i++) {
  jump[i] = invalidMinor;
}
jump[24] = _0uint.decodeUint8;
jump[25] = _0uint.decodeUint16;
jump[26] = _0uint.decodeUint32;
jump[27] = _0uint.decodeUint64;
jump[28] = invalidMinor;
jump[29] = invalidMinor;
jump[30] = invalidMinor;
jump[31] = invalidMinor;
for (let i = 32; i <= 55; i++) {
  jump[i] = invalidMinor;
}
jump[56] = _1negint.decodeNegint8;
jump[57] = _1negint.decodeNegint16;
jump[58] = _1negint.decodeNegint32;
jump[59] = _1negint.decodeNegint64;
jump[60] = invalidMinor;
jump[61] = invalidMinor;
jump[62] = invalidMinor;
jump[63] = invalidMinor;
for (let i = 64; i <= 87; i++) {
  jump[i] = _2bytes.decodeBytesCompact;
}
jump[88] = _2bytes.decodeBytes8;
jump[89] = _2bytes.decodeBytes16;
jump[90] = _2bytes.decodeBytes32;
jump[91] = _2bytes.decodeBytes64;
jump[92] = invalidMinor;
jump[93] = invalidMinor;
jump[94] = invalidMinor;
jump[95] = errorer('indefinite length bytes/strings are not supported');
for (let i = 96; i <= 119; i++) {
  jump[i] = _3string.decodeStringCompact;
}
jump[120] = _3string.decodeString8;
jump[121] = _3string.decodeString16;
jump[122] = _3string.decodeString32;
jump[123] = _3string.decodeString64;
jump[124] = invalidMinor;
jump[125] = invalidMinor;
jump[126] = invalidMinor;
jump[127] = errorer('indefinite length bytes/strings are not supported');
for (let i = 128; i <= 151; i++) {
  jump[i] = _4array.decodeArrayCompact;
}
jump[152] = _4array.decodeArray8;
jump[153] = _4array.decodeArray16;
jump[154] = _4array.decodeArray32;
jump[155] = _4array.decodeArray64;
jump[156] = invalidMinor;
jump[157] = invalidMinor;
jump[158] = invalidMinor;
jump[159] = _4array.decodeArrayIndefinite;
for (let i = 160; i <= 183; i++) {
  jump[i] = _5map.decodeMapCompact;
}
jump[184] = _5map.decodeMap8;
jump[185] = _5map.decodeMap16;
jump[186] = _5map.decodeMap32;
jump[187] = _5map.decodeMap64;
jump[188] = invalidMinor;
jump[189] = invalidMinor;
jump[190] = invalidMinor;
jump[191] = _5map.decodeMapIndefinite;
for (let i = 192; i <= 215; i++) {
  jump[i] = _6tag.decodeTagCompact;
}
jump[216] = _6tag.decodeTag8;
jump[217] = _6tag.decodeTag16;
jump[218] = _6tag.decodeTag32;
jump[219] = _6tag.decodeTag64;
jump[220] = invalidMinor;
jump[221] = invalidMinor;
jump[222] = invalidMinor;
jump[223] = invalidMinor;
for (let i = 224; i <= 243; i++) {
  jump[i] = errorer('simple values are not supported');
}
jump[244] = invalidMinor;
jump[245] = invalidMinor;
jump[246] = invalidMinor;
jump[247] = _7float.decodeUndefined;
jump[248] = errorer('simple values are not supported');
jump[249] = _7float.decodeFloat16;
jump[250] = _7float.decodeFloat32;
jump[251] = _7float.decodeFloat64;
jump[252] = invalidMinor;
jump[253] = invalidMinor;
jump[254] = invalidMinor;
jump[255] = _7float.decodeBreak;
const quick = [];
for (let i = 0; i < 24; i++) {
  quick[i] = new token.Token(token.Type.uint, i, 1);
}
for (let i = -1; i >= -24; i--) {
  quick[31 - i] = new token.Token(token.Type.negint, i, 1);
}
quick[64] = new token.Token(token.Type.bytes, new Uint8Array(0), 1);
quick[96] = new token.Token(token.Type.string, '', 1);
quick[128] = new token.Token(token.Type.array, 0, 1);
quick[160] = new token.Token(token.Type.map, 0, 1);
quick[244] = new token.Token(token.Type.false, false, 1);
quick[245] = new token.Token(token.Type.true, true, 1);
quick[246] = new token.Token(token.Type.null, null, 1);
function quickEncodeToken(token$1) {
  switch (token$1.type) {
  case token.Type.false:
    return byteUtils.fromArray([244]);
  case token.Type.true:
    return byteUtils.fromArray([245]);
  case token.Type.null:
    return byteUtils.fromArray([246]);
  case token.Type.bytes:
    if (!token$1.value.length) {
      return byteUtils.fromArray([64]);
    }
    return;
  case token.Type.string:
    if (token$1.value === '') {
      return byteUtils.fromArray([96]);
    }
    return;
  case token.Type.array:
    if (token$1.value === 0) {
      return byteUtils.fromArray([128]);
    }
    return;
  case token.Type.map:
    if (token$1.value === 0) {
      return byteUtils.fromArray([160]);
    }
    return;
  case token.Type.uint:
    if (token$1.value < 24) {
      return byteUtils.fromArray([Number(token$1.value)]);
    }
    return;
  case token.Type.negint:
    if (token$1.value >= -24) {
      return byteUtils.fromArray([31 - Number(token$1.value)]);
    }
  }
}

exports.jump = jump;
exports.quick = quick;
exports.quickEncodeToken = quickEncodeToken;


/***/ }),

/***/ 7423:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

class Type {
  constructor(major, name, terminal) {
    this.major = major;
    this.majorEncoded = major << 5;
    this.name = name;
    this.terminal = terminal;
  }
  toString() {
    return `Type[${ this.major }].${ this.name }`;
  }
  compare(typ) {
    return this.major < typ.major ? -1 : this.major > typ.major ? 1 : 0;
  }
}
Type.uint = new Type(0, 'uint', true);
Type.negint = new Type(1, 'negint', true);
Type.bytes = new Type(2, 'bytes', true);
Type.string = new Type(3, 'string', true);
Type.array = new Type(4, 'array', false);
Type.map = new Type(5, 'map', false);
Type.tag = new Type(6, 'tag', false);
Type.float = new Type(7, 'float', true);
Type.false = new Type(7, 'false', true);
Type.true = new Type(7, 'true', true);
Type.null = new Type(7, 'null', true);
Type.undefined = new Type(7, 'undefined', true);
Type.break = new Type(7, 'break', true);
class Token {
  constructor(type, value, encodedLength) {
    this.type = type;
    this.value = value;
    this.encodedLength = encodedLength;
    this.encodedBytes = undefined;
  }
  toString() {
    return `Token[${ this.type }].${ this.value }`;
  }
}

exports.Token = Token;
exports.Type = Type;


/***/ }),

/***/ 6891:
/***/ ((module) => {

module.exports = function (xs, fn) {
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        var x = fn(xs[i], i);
        if (isArray(x)) res.push.apply(res, x);
        else res.push(x);
    }
    return res;
};

var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),

/***/ 2371:
/***/ ((module) => {

"use strict";

/**
 * Returns a `Buffer` instance from the given data URI `uri`.
 *
 * @param {String} uri Data URI to turn into a Buffer instance
 * @return {Buffer} Buffer instance from Data URI
 * @api public
 */
function dataUriToBuffer(uri) {
    if (!/^data:/i.test(uri)) {
        throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
    }
    // strip newlines
    uri = uri.replace(/\r?\n/g, '');
    // split the URI up into the "metadata" and the "data" portions
    const firstComma = uri.indexOf(',');
    if (firstComma === -1 || firstComma <= 4) {
        throw new TypeError('malformed data: URI');
    }
    // remove the "data:" scheme and parse the metadata
    const meta = uri.substring(5, firstComma).split(';');
    let charset = '';
    let base64 = false;
    const type = meta[0] || 'text/plain';
    let typeFull = type;
    for (let i = 1; i < meta.length; i++) {
        if (meta[i] === 'base64') {
            base64 = true;
        }
        else {
            typeFull += `;${meta[i]}`;
            if (meta[i].indexOf('charset=') === 0) {
                charset = meta[i].substring(8);
            }
        }
    }
    // defaults to US-ASCII only if type is not provided
    if (!meta[0] && !charset.length) {
        typeFull += ';charset=US-ASCII';
        charset = 'US-ASCII';
    }
    // get the encoded data portion and decode URI-encoded chars
    const encoding = base64 ? 'base64' : 'ascii';
    const data = unescape(uri.substring(firstComma + 1));
    const buffer = Buffer.from(data, encoding);
    // set `.type` and `.typeFull` properties to MIME type
    buffer.type = type;
    buffer.typeFull = typeFull;
    // set the `.charset` property
    buffer.charset = charset;
    return buffer;
}
module.exports = dataUriToBuffer;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 2997:
/***/ ((module) => {

"use strict";


/**
 * @typedef {{ [key: string]: any }} Extensions
 * @typedef {Error} Err
 * @property {string} message
 */

/**
 *
 * @param {Error} obj
 * @param {Extensions} props
 * @returns {Error & Extensions}
 */
function assign(obj, props) {
    for (const key in props) {
        Object.defineProperty(obj, key, {
            value: props[key],
            enumerable: true,
            configurable: true,
        });
    }

    return obj;
}

/**
 *
 * @param {any} err - An Error
 * @param {string|Extensions} code - A string code or props to set on the error
 * @param {Extensions} [props] - Props to set on the error
 * @returns {Error & Extensions}
 */
function createError(err, code, props) {
    if (!err || typeof err === 'string') {
        throw new TypeError('Please pass an Error to err-code');
    }

    if (!props) {
        props = {};
    }

    if (typeof code === 'object') {
        props = code;
        code = '';
    }

    if (code) {
        props.code = code;
    }

    try {
        return assign(err, props);
    } catch (_) {
        props.message = err.message;
        props.stack = err.stack;

        const ErrClass = function () {};

        ErrClass.prototype = Object.create(Object.getPrototypeOf(err));

        // @ts-ignore
        const output = assign(new ErrClass(), props);

        return output;
    }
}

module.exports = createError;


/***/ }),

/***/ 5090:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var Path = __nccwpck_require__(5622);
var fs = __nccwpck_require__(5747);
var glob = __nccwpck_require__(402);
var errCode = __nccwpck_require__(2997);

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Path__default = /*#__PURE__*/_interopDefaultLegacy(Path);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var glob__default = /*#__PURE__*/_interopDefaultLegacy(glob);
var errCode__default = /*#__PURE__*/_interopDefaultLegacy(errCode);

async function getFilesFromPath(paths, options) {
  const files = [];
  for await (const file of filesFromPath(paths, options)) {
    files.push(file);
  }
  return files;
}
async function* filesFromPath(paths, options) {
  options = options || {};
  if (typeof paths === 'string') {
    paths = [paths];
  }
  const globSourceOptions = {
    recursive: true,
    glob: {
      dot: Boolean(options.hidden),
      ignore: Array.isArray(options.ignore) ? options.ignore : [],
      follow: options.followSymlinks != null ? options.followSymlinks : true
    }
  };
  for await (const path of paths) {
    if (typeof path !== 'string') {
      throw errCode__default['default'](new Error('Path must be a string'), 'ERR_INVALID_PATH', { path });
    }
    const absolutePath = Path__default['default'].resolve(process.cwd(), path);
    const stat = await fs.promises.stat(absolutePath);
    const prefix = Path__default['default'].dirname(absolutePath);
    let mode = options.mode;
    if (options.preserveMode) {
      mode = stat.mode;
    }
    let mtime = options.mtime;
    if (options.preserveMtime) {
      mtime = stat.mtime;
    }
    yield* toGlobSource({
      path,
      type: stat.isDirectory() ? 'dir' : 'file',
      prefix,
      mode,
      mtime,
      size: stat.size,
      preserveMode: options.preserveMode,
      preserveMtime: options.preserveMtime
    }, globSourceOptions);
  }
}
async function* toGlobSource({path, type, prefix, mode, mtime, size, preserveMode, preserveMtime}, options) {
  options = options || {};
  const baseName = Path__default['default'].basename(path);
  if (type === 'file') {
    yield {
      name: `/${ baseName.replace(prefix, '') }`,
      stream: () => fs__default['default'].createReadStream(Path__default['default'].isAbsolute(path) ? path : Path__default['default'].join(process.cwd(), path)),
      mode,
      mtime,
      size
    };
    return;
  }
  const globOptions = Object.assign({}, options.glob, {
    cwd: path,
    nodir: false,
    realpath: false,
    absolute: true
  });
  for await (const p of glob__default['default'](path, '**/*', globOptions)) {
    const stat = await fs.promises.stat(p);
    if (!stat.isFile()) {
      continue;
    }
    if (preserveMode || preserveMtime) {
      if (preserveMode) {
        mode = stat.mode;
      }
      if (preserveMtime) {
        mtime = stat.mtime;
      }
    }
    yield {
      name: toPosix(p.replace(prefix, '')),
      stream: () => fs__default['default'].createReadStream(p),
      mode,
      mtime,
      size: stat.size
    };
  }
}
const toPosix = path => path.replace(/\\/g, '/');

exports.filesFromPath = filesFromPath;
exports.getFilesFromPath = getFilesFromPath;


/***/ }),

/***/ 5252:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


// @ts-ignore
const SparseArray = __nccwpck_require__(1128)
const uint8ArrayFromString = __nccwpck_require__(828)

/**
 * @typedef {import('./consumable-hash').InfiniteHash} InfiniteHash
 * @typedef {import('../').UserBucketOptions} UserBucketOptions
 */

/**
 * @template V
 * @typedef {object} BucketChild<V>
 * @property {string} key
 * @property {V} value
 * @property {InfiniteHash} hash
 */

/**
 * @template B
 *
 * @typedef {object} SA<B>
 * @property {number} length
 * @property {() => B[]} compactArray
 * @property {(i: number) => B} get
 * @property {(i: number, value: B) => void} set
 * @property {<A> (fn: (acc: A, curr: B, index: number) => A, initial: A) => B} reduce
 * @property {(fn: (item: B) => boolean) => B | undefined} find
 * @property {() => number[]} bitField
 * @property {(i: number) => void} unset
 */

/**
 * @template T
 *
 * @typedef {object} BucketPosition<T>
 * @property {Bucket<T>} bucket
 * @property {number} pos
 * @property {InfiniteHash} hash
 * @property {BucketChild<T>} [existingChild]
 */

/**
 * @typedef {object} BucketOptions
 * @property {number} bits
 * @property {(value: Uint8Array | InfiniteHash) => InfiniteHash} hash
 */

/**
 * @template T
 */
class Bucket {
  /**
   * @param {BucketOptions} options
   * @param {Bucket<T>} [parent]
   * @param {number} [posAtParent=0]
   */
  constructor (options, parent, posAtParent = 0) {
    this._options = options
    this._popCount = 0
    this._parent = parent
    this._posAtParent = posAtParent

    /** @type {SA<Bucket<T> | BucketChild<T>>} */
    this._children = new SparseArray()

    /** @type {string | null} */
    this.key = null
  }

  /**
   * @param {string} key
   * @param {T} value
   */
  async put (key, value) {
    const place = await this._findNewBucketAndPos(key)

    await place.bucket._putAt(place, key, value)
  }

  /**
   * @param {string} key
   */
  async get (key) {
    const child = await this._findChild(key)

    if (child) {
      return child.value
    }
  }

  /**
   * @param {string} key
   */
  async del (key) {
    const place = await this._findPlace(key)
    const child = place.bucket._at(place.pos)

    if (child && child.key === key) {
      place.bucket._delAt(place.pos)
    }
  }

  /**
   * @returns {number}
   */
  leafCount () {
    const children = this._children.compactArray()

    return children.reduce((acc, child) => {
      if (child instanceof Bucket) {
        return acc + child.leafCount()
      }

      return acc + 1
    }, 0)
  }

  childrenCount () {
    return this._children.length
  }

  onlyChild () {
    return this._children.get(0)
  }

  /**
   * @returns {Iterable<BucketChild<T>>}
   */
  * eachLeafSeries () {
    const children = this._children.compactArray()

    for (const child of children) {
      if (child instanceof Bucket) {
        yield * child.eachLeafSeries()
      } else {
        yield child
      }
    }

    // this is necessary because tsc requires a @return annotation as it
    // can't derive a return type due to the recursion, and eslint requires
    // a return statement when there is a @return annotation
    return []
  }

  /**
   * @param {(value: BucketChild<T>, index: number) => T} map
   * @param {(reduced: any) => any} reduce
   */
  serialize (map, reduce) {
    /** @type {T[]} */
    const acc = []
    // serialize to a custom non-sparse representation
    return reduce(this._children.reduce((acc, child, index) => {
      if (child) {
        if (child instanceof Bucket) {
          acc.push(child.serialize(map, reduce))
        } else {
          acc.push(map(child, index))
        }
      }
      return acc
    }, acc))
  }

  /**
   * @param {(value: BucketChild<T>) => Promise<T[]>} asyncMap
   * @param {(reduced: any) => Promise<any>} asyncReduce
   */
  asyncTransform (asyncMap, asyncReduce) {
    return asyncTransformBucket(this, asyncMap, asyncReduce)
  }

  toJSON () {
    return this.serialize(mapNode, reduceNodes)
  }

  prettyPrint () {
    return JSON.stringify(this.toJSON(), null, '  ')
  }

  tableSize () {
    return Math.pow(2, this._options.bits)
  }

  /**
   * @param {string} key
   * @returns {Promise<BucketChild<T> | undefined>}
   */
  async _findChild (key) {
    const result = await this._findPlace(key)
    const child = result.bucket._at(result.pos)

    if (child instanceof Bucket) {
      // should not be possible, this._findPlace should always
      // return a location for a child, not a bucket
      return undefined
    }

    if (child && child.key === key) {
      return child
    }
  }

  /**
   * @param {string | InfiniteHash} key
   * @returns {Promise<BucketPosition<T>>}
   */
  async _findPlace (key) {
    const hashValue = this._options.hash(typeof key === 'string' ? uint8ArrayFromString(key) : key)
    const index = await hashValue.take(this._options.bits)

    const child = this._children.get(index)

    if (child instanceof Bucket) {
      return child._findPlace(hashValue)
    }

    return {
      bucket: this,
      pos: index,
      hash: hashValue,
      existingChild: child
    }
  }

  /**
   * @param {string | InfiniteHash} key
   * @returns {Promise<BucketPosition<T>>}
   */
  async _findNewBucketAndPos (key) {
    const place = await this._findPlace(key)

    if (place.existingChild && place.existingChild.key !== key) {
      // conflict
      const bucket = new Bucket(this._options, place.bucket, place.pos)
      place.bucket._putObjectAt(place.pos, bucket)

      // put the previous value
      const newPlace = await bucket._findPlace(place.existingChild.hash)
      newPlace.bucket._putAt(newPlace, place.existingChild.key, place.existingChild.value)

      return bucket._findNewBucketAndPos(place.hash)
    }

    // no conflict, we found the place
    return place
  }

  /**
   * @param {BucketPosition<T>} place
   * @param {string} key
   * @param {T} value
   */
  _putAt (place, key, value) {
    this._putObjectAt(place.pos, {
      key: key,
      value: value,
      hash: place.hash
    })
  }

  /**
   * @param {number} pos
   * @param {Bucket<T> | BucketChild<T>} object
   */
  _putObjectAt (pos, object) {
    if (!this._children.get(pos)) {
      this._popCount++
    }
    this._children.set(pos, object)
  }

  /**
   * @param {number} pos
   */
  _delAt (pos) {
    if (pos === -1) {
      throw new Error('Invalid position')
    }

    if (this._children.get(pos)) {
      this._popCount--
    }
    this._children.unset(pos)
    this._level()
  }

  _level () {
    if (this._parent && this._popCount <= 1) {
      if (this._popCount === 1) {
        // remove myself from parent, replacing me with my only child
        const onlyChild = this._children.find(exists)

        if (onlyChild && !(onlyChild instanceof Bucket)) {
          const hash = onlyChild.hash
          hash.untake(this._options.bits)
          const place = {
            pos: this._posAtParent,
            hash: hash,
            bucket: this._parent
          }
          this._parent._putAt(place, onlyChild.key, onlyChild.value)
        }
      } else {
        this._parent._delAt(this._posAtParent)
      }
    }
  }

  /**
   * @param {number} index
   * @returns {BucketChild<T> | Bucket<T> | undefined}
   */
  _at (index) {
    return this._children.get(index)
  }
}

/**
 * @param {any} o
 */
function exists (o) {
  return Boolean(o)
}

/**
 *
 * @param {*} node
 * @param {number} index
 */
function mapNode (node, index) {
  return node.key
}

/**
 * @param {*} nodes
 */
function reduceNodes (nodes) {
  return nodes
}

/**
 * @template T
 *
 * @param {Bucket<T>} bucket
 * @param {(value: BucketChild<T>) => Promise<T[]>} asyncMap
 * @param {(reduced: any) => Promise<any>} asyncReduce
 */
async function asyncTransformBucket (bucket, asyncMap, asyncReduce) {
  const output = []

  for (const child of bucket._children.compactArray()) {
    if (child instanceof Bucket) {
      await asyncTransformBucket(child, asyncMap, asyncReduce)
    } else {
      const mappedChildren = await asyncMap(child)

      output.push({
        bitField: bucket._children.bitField(),
        children: mappedChildren
      })
    }
  }

  return asyncReduce(output)
}

module.exports = Bucket


/***/ }),

/***/ 6514:
/***/ ((module) => {

"use strict";


const START_MASKS = [
  0b11111111,
  0b11111110,
  0b11111100,
  0b11111000,
  0b11110000,
  0b11100000,
  0b11000000,
  0b10000000
]

const STOP_MASKS = [
  0b00000001,
  0b00000011,
  0b00000111,
  0b00001111,
  0b00011111,
  0b00111111,
  0b01111111,
  0b11111111
]

module.exports = class ConsumableBuffer {
  /**
   * @param {Uint8Array} value
   */
  constructor (value) {
    this._value = value
    this._currentBytePos = value.length - 1
    this._currentBitPos = 7
  }

  availableBits () {
    return this._currentBitPos + 1 + this._currentBytePos * 8
  }

  totalBits () {
    return this._value.length * 8
  }

  /**
   * @param {number} bits
   */
  take (bits) {
    let pendingBits = bits
    let result = 0
    while (pendingBits && this._haveBits()) {
      const byte = this._value[this._currentBytePos]
      const availableBits = this._currentBitPos + 1
      const taking = Math.min(availableBits, pendingBits)
      const value = byteBitsToInt(byte, availableBits - taking, taking)
      result = (result << taking) + value

      pendingBits -= taking

      this._currentBitPos -= taking
      if (this._currentBitPos < 0) {
        this._currentBitPos = 7
        this._currentBytePos--
      }
    }

    return result
  }

  /**
   * @param {number} bits
   */
  untake (bits) {
    this._currentBitPos += bits
    while (this._currentBitPos > 7) {
      this._currentBitPos -= 8
      this._currentBytePos += 1
    }
  }

  _haveBits () {
    return this._currentBytePos >= 0
  }
}

/**
 * @param {number} byte
 * @param {number} start
 * @param {number} length
 */
function byteBitsToInt (byte, start, length) {
  const mask = maskFor(start, length)
  return (byte & mask) >>> start
}

/**
 * @param {number} start
 * @param {number} length
 */
function maskFor (start, length) {
  return START_MASKS[start] & STOP_MASKS[Math.min(length + start - 1, 7)]
}


/***/ }),

/***/ 2950:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const ConsumableBuffer = __nccwpck_require__(6514)
const uint8ArrayConcat = __nccwpck_require__(7952)

/**
 * @param {(value: Uint8Array) => Promise<Uint8Array>} hashFn
 */
function wrapHash (hashFn) {
  /**
   * @param {InfiniteHash | Uint8Array} value
   */
  function hashing (value) {
    if (value instanceof InfiniteHash) {
      // already a hash. return it
      return value
    } else {
      return new InfiniteHash(value, hashFn)
    }
  }

  return hashing
}

class InfiniteHash {
  /**
   *
   * @param {Uint8Array} value
   * @param {(value: Uint8Array) => Promise<Uint8Array>} hashFn
   */
  constructor (value, hashFn) {
    if (!(value instanceof Uint8Array)) {
      throw new Error('can only hash Uint8Arrays')
    }

    this._value = value
    this._hashFn = hashFn
    this._depth = -1
    this._availableBits = 0
    this._currentBufferIndex = 0

    /** @type {ConsumableBuffer[]} */
    this._buffers = []
  }

  /**
   * @param {number} bits
   */
  async take (bits) {
    let pendingBits = bits

    while (this._availableBits < pendingBits) {
      await this._produceMoreBits()
    }

    let result = 0

    while (pendingBits > 0) {
      const hash = this._buffers[this._currentBufferIndex]
      const available = Math.min(hash.availableBits(), pendingBits)
      const took = hash.take(available)
      result = (result << available) + took
      pendingBits -= available
      this._availableBits -= available

      if (hash.availableBits() === 0) {
        this._currentBufferIndex++
      }
    }

    return result
  }

  /**
   * @param {number} bits
   */
  untake (bits) {
    let pendingBits = bits

    while (pendingBits > 0) {
      const hash = this._buffers[this._currentBufferIndex]
      const availableForUntake = Math.min(hash.totalBits() - hash.availableBits(), pendingBits)
      hash.untake(availableForUntake)
      pendingBits -= availableForUntake
      this._availableBits += availableForUntake

      if (this._currentBufferIndex > 0 && hash.totalBits() === hash.availableBits()) {
        this._depth--
        this._currentBufferIndex--
      }
    }
  }

  async _produceMoreBits () {
    this._depth++

    const value = this._depth ? uint8ArrayConcat([this._value, Uint8Array.from([this._depth])]) : this._value
    const hashValue = await this._hashFn(value)
    const buffer = new ConsumableBuffer(hashValue)

    this._buffers.push(buffer)
    this._availableBits += buffer.availableBits()
  }
}

module.exports = wrapHash
module.exports.InfiniteHash = InfiniteHash


/***/ }),

/***/ 7820:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const Bucket = __nccwpck_require__(5252)
const wrapHash = __nccwpck_require__(2950)

/**
 * @typedef {object} UserBucketOptions
 * @property {(value: Uint8Array) => Promise<Uint8Array>} hashFn
 * @property {number} [bits=8]
 */

/**
 * @param {UserBucketOptions} options
 */
function createHAMT (options) {
  if (!options || !options.hashFn) {
    throw new Error('please define an options.hashFn')
  }

  const bucketOptions = {
    bits: options.bits || 8,
    hash: wrapHash(options.hashFn)
  }

  return new Bucket(bucketOptions)
}

module.exports = {
  createHAMT,
  Bucket
}


/***/ }),

/***/ 9061:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const drain = __nccwpck_require__(1798)
const filter = __nccwpck_require__(2220)
const take = __nccwpck_require__(2360)
const all = __nccwpck_require__(5810)

/**
 * Collect all values from the iterable and sort them using
 * the passed sorter function
 *
 * @template T
 * @param {AsyncIterable<T> | Iterable<T>} iterable
 * @param {(a: T, b: T) => -1 | 0 | 1} sorter
 * @returns {AsyncIterable<T>}
 */
const sortAll = (iterable, sorter) => {
  return (async function * () {
    const values = await all(iterable)
    yield * values.sort(sorter)
  })()
}

/**
 * @typedef {import('./types').Options} Options
 * @typedef {import('./types').Pair} Pair
 * @typedef {import('./types').Blockstore} Blockstore
 * @typedef {import('./types').Query} Query
 * @typedef {import('./types').KeyQuery} KeyQuery
 * @typedef {import('./types').Batch} Batch
 *
 * @typedef {import('multiformats').CID} CID
 */

/**
 * @template O
 * @typedef {import('interface-store').AwaitIterable<O>} AwaitIterable
 */

/**
 * @implements {Blockstore}
 */
class BlockstoreAdapter {
  /**
   * @returns {Promise<void>}
   */
  open () {
    return Promise.reject(new Error('.open is not implemented'))
  }

  /**
   * @returns {Promise<void>}
   */
  close () {
    return Promise.reject(new Error('.close is not implemented'))
  }

  /**
   * @param {CID} key
   * @param {Uint8Array} val
   * @param {Options} [options]
   * @returns {Promise<void>}
   */
  put (key, val, options) {
    return Promise.reject(new Error('.put is not implemented'))
  }

  /**
   * @param {CID} key
   * @param {Options} [options]
   * @returns {Promise<Uint8Array>}
   */
  get (key, options) {
    return Promise.reject(new Error('.get is not implemented'))
  }

  /**
   * @param {CID} key
   * @param {Options} [options]
   * @returns {Promise<boolean>}
   */
  has (key, options) {
    return Promise.reject(new Error('.has is not implemented'))
  }

  /**
   * @param {CID} key
   * @param {Options} [options]
   * @returns {Promise<void>}
   */
  delete (key, options) {
    return Promise.reject(new Error('.delete is not implemented'))
  }

  /**
   * @param {AwaitIterable<Pair>} source
   * @param {Options} [options]
   * @returns {AsyncIterable<Pair>}
   */
  async * putMany (source, options = {}) {
    for await (const { key, value } of source) {
      await this.put(key, value, options)
      yield { key, value }
    }
  }

  /**
   * @param {AwaitIterable<CID>} source
   * @param {Options} [options]
   * @returns {AsyncIterable<Uint8Array>}
   */
  async * getMany (source, options = {}) {
    for await (const key of source) {
      yield this.get(key, options)
    }
  }

  /**
   * @param {AwaitIterable<CID>} source
   * @param {Options} [options]
   * @returns {AsyncIterable<CID>}
   */
  async * deleteMany (source, options = {}) {
    for await (const key of source) {
      await this.delete(key, options)
      yield key
    }
  }

  /**
   * @returns {Batch}
   */
  batch () {
    /** @type {Pair[]} */
    let puts = []
    /** @type {CID[]} */
    let dels = []

    return {
      put (key, value) {
        puts.push({ key, value })
      },

      delete (key) {
        dels.push(key)
      },
      commit: async (options) => {
        await drain(this.putMany(puts, options))
        puts = []
        await drain(this.deleteMany(dels, options))
        dels = []
      }
    }
  }

  /**
   * Extending classes should override `query` or implement this method
   *
   * @param {Query} q
   * @param {Options} [options]
   * @returns {AsyncIterable<Pair>}
   */
  // eslint-disable-next-line require-yield
  async * _all (q, options) {
    throw new Error('._all is not implemented')
  }

  /**
   * Extending classes should override `queryKeys` or implement this method
   *
   * @param {KeyQuery} q
   * @param {Options} [options]
   * @returns {AsyncIterable<CID>}
   */
  // eslint-disable-next-line require-yield
  async * _allKeys (q, options) {
    throw new Error('._allKeys is not implemented')
  }

  /**
   * @param {Query} q
   * @param {Options} [options]
   */
  query (q, options) {
    let it = this._all(q, options)

    if (q.prefix != null) {
      it = filter(it, (/** @type {Pair} */ e) =>
        e.key.toString().startsWith(q.prefix || '')
      )
    }

    if (Array.isArray(q.filters)) {
      it = q.filters.reduce((it, f) => filter(it, f), it)
    }

    if (Array.isArray(q.orders)) {
      it = q.orders.reduce((it, f) => sortAll(it, f), it)
    }

    if (q.offset != null) {
      let i = 0
      it = filter(it, () => i++ >= (q.offset || 0))
    }

    if (q.limit != null) {
      it = take(it, q.limit)
    }

    return it
  }

  /**
   * @param {KeyQuery} q
   * @param {Options} [options]
   */
  queryKeys (q, options) {
    let it = this._allKeys(q, options)

    if (q.prefix != null) {
      it = filter(it, (/** @type {CID} */ cid) => cid.toString().startsWith(q.prefix || ''))
    }

    if (Array.isArray(q.filters)) {
      it = q.filters.reduce((it, f) => filter(it, f), it)
    }

    if (Array.isArray(q.orders)) {
      it = q.orders.reduce((it, f) => sortAll(it, f), it)
    }

    if (q.offset != null) {
      let i = 0
      it = filter(it, () => i++ >= /** @type {number} */ (q.offset))
    }

    if (q.limit != null) {
      it = take(it, q.limit)
    }

    return it
  }
}

module.exports = BlockstoreAdapter


/***/ }),

/***/ 2883:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const errCode = __nccwpck_require__(2997)

/**
 * @param {Error} [err]
 */
function notFoundError (err) {
  err = err || new Error('Not Found')
  return errCode(err, 'ERR_NOT_FOUND')
}

module.exports = {
  notFoundError
}


/***/ }),

/***/ 6701:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const BlockstoreAdapter = __nccwpck_require__(9061)
const MemoryBlockstore = __nccwpck_require__(3051)

/**
 * @typedef {import('./types').Options} Options
 * @typedef {import('./types').Pair} Pair
 * @typedef {import('./types').Batch} Batch
 * @typedef {import('./types').Blockstore} Blockstore
 * @typedef {import('./types').QueryFilter} QueryFilter
 * @typedef {import('./types').QueryOrder} QueryOrder
 * @typedef {import('./types').Query} Query
 * @typedef {import('./types').KeyQueryFilter} KeyQueryFilter
 * @typedef {import('./types').KeyQueryOrder} KeyQueryOrder
 * @typedef {import('./types').KeyQuery} KeyQuery
 */

module.exports = {
  BlockstoreAdapter,
  MemoryBlockstore
}


/***/ }),

/***/ 3051:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const Adapter = __nccwpck_require__(9061)
const { base32 } = __nccwpck_require__(2884)
const raw = __nccwpck_require__(2048)
const { CID } = __nccwpck_require__(6447)
const Digest = __nccwpck_require__(76)
const Errors = __nccwpck_require__(2883)

/**
 * @typedef {import('./types').Pair} Pair
 * @typedef {import('./types').Blockstore} Blockstore
 * @typedef {import('interface-store').Options} Options
 */

/**
 * @class MemoryBlockstore
 * @implements {Blockstore}
 */
class MemoryBlockstore extends Adapter {
  constructor () {
    super()

    /** @type {Record<string, Uint8Array>} */
    this.data = {}
  }

  open () {
    return Promise.resolve()
  }

  close () {
    return Promise.resolve()
  }

  /**
   * @param {CID} key
   * @param {Uint8Array} val
   */
  async put (key, val) { // eslint-disable-line require-await
    this.data[base32.encode(key.multihash.bytes)] = val
  }

  /**
   * @param {CID} key
   */
  async get (key) {
    const exists = await this.has(key)
    if (!exists) throw Errors.notFoundError()
    return this.data[base32.encode(key.multihash.bytes)]
  }

  /**
   * @param {CID} key
   */
  async has (key) { // eslint-disable-line require-await
    return this.data[base32.encode(key.multihash.bytes)] !== undefined
  }

  /**
   * @param {CID} key
   */
  async delete (key) { // eslint-disable-line require-await
    delete this.data[base32.encode(key.multihash.bytes)]
  }

  async * _all () {
    yield * Object.entries(this.data)
      .map(([key, value]) => ({ key: CID.createV1(raw.code, Digest.decode(base32.decode(key))), value }))
  }

  async * _allKeys () {
    yield * Object.entries(this.data)
      .map(([key]) => CID.createV1(raw.code, Digest.decode(base32.decode(key))))
  }
}

module.exports = MemoryBlockstore


/***/ }),

/***/ 2689:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FsBlockStore = void 0;
const fs_1 = __importDefault(__nccwpck_require__(5747));
const os_1 = __importDefault(__nccwpck_require__(2087));
const multiformats_1 = __nccwpck_require__(5978);
const interface_blockstore_1 = __nccwpck_require__(6701);
class FsBlockStore extends interface_blockstore_1.BlockstoreAdapter {
    constructor() {
        super();
        this.path = `${os_1.default.tmpdir()}/${(parseInt(String(Math.random() * 1e9), 10)).toString() + Date.now()}`;
        this._opened = false;
    }
    async _open() {
        if (this._opening) {
            await this._opening;
        }
        else {
            this._opening = fs_1.default.promises.mkdir(this.path);
            await this._opening;
            this._opened = true;
        }
    }
    async put(cid, bytes) {
        if (!this._opened) {
            await this._open();
        }
        const cidStr = cid.toString();
        const location = `${this.path}/${cidStr}`;
        await fs_1.default.promises.writeFile(location, bytes);
    }
    async get(cid) {
        if (!this._opened) {
            await this._open();
        }
        const cidStr = cid.toString();
        const location = `${this.path}/${cidStr}`;
        const bytes = await fs_1.default.promises.readFile(location);
        return bytes;
    }
    async *blocks() {
        if (!this._opened) {
            await this._open();
        }
        const cids = await fs_1.default.promises.readdir(this.path);
        for (const cidStr of cids) {
            const location = `${this.path}/${cidStr}`;
            const bytes = await fs_1.default.promises.readFile(location);
            yield { cid: multiformats_1.CID.parse(cidStr), bytes };
        }
    }
    async close() {
        if (this._opened) {
            await fs_1.default.promises.rm(this.path, { recursive: true });
        }
        this._opened = false;
    }
}
exports.FsBlockStore = FsBlockStore;


/***/ }),

/***/ 7913:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MemoryBlockStore = void 0;
const multiformats_1 = __nccwpck_require__(5978);
const interface_blockstore_1 = __nccwpck_require__(6701);
class MemoryBlockStore extends interface_blockstore_1.BlockstoreAdapter {
    constructor() {
        super();
        this.store = new Map();
    }
    async *blocks() {
        for (const [cidStr, bytes] of this.store.entries()) {
            yield { cid: multiformats_1.CID.parse(cidStr), bytes };
        }
    }
    put(cid, bytes) {
        this.store.set(cid.toString(), bytes);
        return Promise.resolve();
    }
    get(cid) {
        const bytes = this.store.get(cid.toString());
        if (!bytes) {
            throw new Error(`block with cid ${cid.toString()} no found`);
        }
        return Promise.resolve(bytes);
    }
    close() {
        this.store.clear();
        return Promise.resolve();
    }
}
exports.MemoryBlockStore = MemoryBlockStore;


/***/ }),

/***/ 1563:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.unixfsImporterOptionsDefault = void 0;
const sha2_1 = __nccwpck_require__(6987);
exports.unixfsImporterOptionsDefault = {
    cidVersion: 1,
    chunker: 'fixed',
    maxChunkSize: 262144,
    hasher: sha2_1.sha256,
    rawLeaves: true,
    wrapWithDirectory: true
};


/***/ }),

/***/ 8163:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pack = void 0;
const it_last_1 = __importDefault(__nccwpck_require__(7123));
const it_pipe_1 = __importDefault(__nccwpck_require__(7185));
const car_1 = __nccwpck_require__(2805);
const ipfs_unixfs_importer_1 = __nccwpck_require__(1333);
const index_js_1 = __importDefault(__nccwpck_require__(4369));
const memory_1 = __nccwpck_require__(7913);
const constants_1 = __nccwpck_require__(1563);
async function pack({ input, blockstore: userBlockstore, maxChunkSize, wrapWithDirectory }) {
    if (!input || (Array.isArray(input) && !input.length)) {
        throw new Error('missing input file(s)');
    }
    const blockstore = userBlockstore ? userBlockstore : new memory_1.MemoryBlockStore();
    // Consume the source
    const rootEntry = await it_last_1.default(it_pipe_1.default(index_js_1.default(input), (source) => ipfs_unixfs_importer_1.importer(source, blockstore, {
        ...constants_1.unixfsImporterOptionsDefault,
        maxChunkSize: maxChunkSize || constants_1.unixfsImporterOptionsDefault.maxChunkSize,
        wrapWithDirectory: wrapWithDirectory === false ? false : constants_1.unixfsImporterOptionsDefault.wrapWithDirectory
    })));
    if (!rootEntry || !rootEntry.cid) {
        throw new Error('given input could not be parsed correctly');
    }
    const root = rootEntry.cid;
    const { writer, out } = await car_1.CarWriter.create([root]);
    for await (const block of blockstore.blocks()) {
        writer.put(block);
    }
    writer.close();
    if (!userBlockstore) {
        await blockstore.close();
    }
    return { root, out };
}
exports.pack = pack;


/***/ }),

/***/ 3428:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.unpackStream = exports.unpack = void 0;
const browser_readablestream_to_it_1 = __importDefault(__nccwpck_require__(664));
const iterator_1 = __nccwpck_require__(8229);
const ipfs_unixfs_exporter_1 = __importDefault(__nccwpck_require__(874));
const verifying_get_only_blockstore_1 = __nccwpck_require__(698);
const memory_1 = __nccwpck_require__(7913);
// Export unixfs entries from car file
async function* unpack(carReader, roots) {
    const verifyingBlockService = verifying_get_only_blockstore_1.VerifyingGetOnlyBlockStore.fromCarReader(carReader);
    if (!roots || roots.length === 0) {
        roots = await carReader.getRoots();
    }
    for (const root of roots) {
        yield* ipfs_unixfs_exporter_1.default.recursive(root, verifyingBlockService, { /* options */});
    }
}
exports.unpack = unpack;
async function* unpackStream(readable, { roots, blockstore: userBlockstore } = {}) {
    const carIterator = await iterator_1.CarBlockIterator.fromIterable(asAsyncIterable(readable));
    const blockstore = userBlockstore || new memory_1.MemoryBlockStore();
    for await (const block of carIterator) {
        await blockstore.put(block.cid, block.bytes);
    }
    const verifyingBlockStore = verifying_get_only_blockstore_1.VerifyingGetOnlyBlockStore.fromBlockstore(blockstore);
    if (!roots || roots.length === 0) {
        roots = await carIterator.getRoots();
    }
    for (const root of roots) {
        yield* ipfs_unixfs_exporter_1.default.recursive(root, verifyingBlockStore);
    }
}
exports.unpackStream = unpackStream;
/**
 * Upgrade a ReadableStream to an AsyncIterable if it isn't already
 *
 * ReadableStream (e.g res.body) is asyncIterable in node, but not in chrome, yet.
 * see: https://bugs.chromium.org/p/chromium/issues/detail?id=929585
 */
function asAsyncIterable(readable) {
    // @ts-ignore how to convince tsc that we are checking the type here?
    return Symbol.asyncIterator in readable ? readable : browser_readablestream_to_it_1.default(readable);
}


/***/ }),

/***/ 698:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VerifyingGetOnlyBlockStore = void 0;
const uint8arrays_1 = __nccwpck_require__(5804);
const sha2_1 = __nccwpck_require__(6987);
const interface_blockstore_1 = __nccwpck_require__(6701);
class VerifyingGetOnlyBlockStore extends interface_blockstore_1.BlockstoreAdapter {
    constructor(blockstore) {
        super();
        this.store = blockstore;
    }
    async get(cid) {
        const res = await this.store.get(cid);
        if (!res) {
            throw new Error(`Incomplete CAR. Block missing for CID ${cid}`);
        }
        if (!isValid({ cid, bytes: res })) {
            throw new Error(`Invalid CAR. Hash of block data does not match CID ${cid}`);
        }
        return res;
    }
    static fromBlockstore(b) {
        return new VerifyingGetOnlyBlockStore(b);
    }
    static fromCarReader(cr) {
        return new VerifyingGetOnlyBlockStore({
            // Return bytes in the same fashion as a Blockstore implementation
            get: async (cid) => {
                const block = await cr.get(cid);
                return block === null || block === void 0 ? void 0 : block.bytes;
            }
        });
    }
}
exports.VerifyingGetOnlyBlockStore = VerifyingGetOnlyBlockStore;
async function isValid({ cid, bytes }) {
    const hash = await sha2_1.sha256.digest(bytes);
    return uint8arrays_1.equals(hash.digest, cid.multihash.digest);
}


/***/ }),

/***/ 4369:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const normaliseContent = __nccwpck_require__(1168)
const normaliseInput = __nccwpck_require__(649)

/**
 * @typedef {import('ipfs-core-types/src/utils').ImportCandidateStream} ImportCandidateStream
 * @typedef {import('ipfs-unixfs-importer').ImportCandidate} ImportCandidate
 */

/**
 * Transforms any of the `ipfs.add` input types into
 *
 * ```
 * AsyncIterable<{ path, mode, mtime, content: AsyncIterable<Uint8Array> }>
 * ```
 *
 * See https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md#ipfsadddata-options
 *
 * @param {ImportCandidateStream} input
 * @returns {AsyncGenerator<ImportCandidate, void, undefined>}
 */
module.exports = (input) => normaliseInput(input, normaliseContent)


/***/ }),

/***/ 1168:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const errCode = __nccwpck_require__(2997)
const uint8ArrayFromString = __nccwpck_require__(828)
const browserStreamToIt = __nccwpck_require__(664)
const blobToIt = __nccwpck_require__(7842)
const itPeekable = __nccwpck_require__(2276)
const all = __nccwpck_require__(5810)
const map = __nccwpck_require__(8753)
const {
  isBytes,
  isReadableStream,
  isBlob
} = __nccwpck_require__(5130)

/**
 * @param {import('./normalise-input').ToContent} input
 */
async function * toAsyncIterable (input) {
  // Bytes | String
  if (isBytes(input)) {
    yield toBytes(input)
    return
  }

  if (typeof input === 'string' || input instanceof String) {
    yield toBytes(input.toString())
    return
  }

  // Blob
  if (isBlob(input)) {
    yield * blobToIt(input)
    return
  }

  // Browser stream
  if (isReadableStream(input)) {
    input = browserStreamToIt(input)
  }

  // (Async)Iterator<?>
  if (Symbol.iterator in input || Symbol.asyncIterator in input) {
    /** @type {any} peekable */
    const peekable = itPeekable(input)

    /** @type {any} value */
    const { value, done } = await peekable.peek()

    if (done) {
      // make sure empty iterators result in empty files
      yield * []
      return
    }

    peekable.push(value)

    // (Async)Iterable<Number>
    if (Number.isInteger(value)) {
      yield Uint8Array.from((await all(peekable)))
      return
    }

    // (Async)Iterable<Bytes|String>
    if (isBytes(value) || typeof value === 'string' || value instanceof String) {
      yield * map(peekable, toBytes)
      return
    }
  }

  throw errCode(new Error(`Unexpected input: ${input}`), 'ERR_UNEXPECTED_INPUT')
}

/**
 * @param {ArrayBuffer | ArrayBufferView | string | InstanceType<typeof window.String> | number[]} chunk
 */
function toBytes (chunk) {
  if (chunk instanceof Uint8Array) {
    return chunk
  }

  if (ArrayBuffer.isView(chunk)) {
    return new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength)
  }

  if (chunk instanceof ArrayBuffer) {
    return new Uint8Array(chunk)
  }

  if (Array.isArray(chunk)) {
    return Uint8Array.from(chunk)
  }

  return uint8ArrayFromString(chunk.toString())
}

module.exports = toAsyncIterable


/***/ }),

/***/ 649:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const errCode = __nccwpck_require__(2997)
const browserStreamToIt = __nccwpck_require__(664)
const itPeekable = __nccwpck_require__(2276)
const map = __nccwpck_require__(8753)
const {
  isBytes,
  isBlob,
  isReadableStream,
  isFileObject
} = __nccwpck_require__(5130)
const {
  parseMtime,
  parseMode
} = __nccwpck_require__(9811)

/**
 * @typedef {import('ipfs-core-types/src/utils').ToContent} ToContent
 * @typedef {import('ipfs-unixfs-importer').ImportCandidate} ImporterImportCandidate
 * @typedef {import('ipfs-core-types/src/utils').ImportCandidate} ImportCandidate
 */

/**
 * @param {import('ipfs-core-types/src/utils').ImportCandidateStream} input
 * @param {(content:ToContent) => AsyncIterable<Uint8Array>} normaliseContent
 */
// eslint-disable-next-line complexity
module.exports = async function * normaliseInput (input, normaliseContent) {
  if (input === null || input === undefined) {
    return
  }

  // String
  if (typeof input === 'string' || input instanceof String) {
    yield toFileObject(input.toString(), normaliseContent)
    return
  }

  // Uint8Array|ArrayBuffer|TypedArray
  // Blob|File
  if (isBytes(input) || isBlob(input)) {
    yield toFileObject(input, normaliseContent)
    return
  }

  // Browser ReadableStream
  if (isReadableStream(input)) {
    input = browserStreamToIt(input)
  }

  // Iterable<?>
  if (Symbol.iterator in input || Symbol.asyncIterator in input) {
    /** @type {any} peekable */
    const peekable = itPeekable(input)

    /** @type {any} value **/
    const { value, done } = await peekable.peek()

    if (done) {
      // make sure empty iterators result in empty files
      yield * []
      return
    }

    peekable.push(value)

    // (Async)Iterable<Number>
    // (Async)Iterable<Bytes>
    if (Number.isInteger(value) || isBytes(value)) {
      yield toFileObject(peekable, normaliseContent)
      return
    }

    // (Async)Iterable<Blob>
    // (Async)Iterable<String>
    // (Async)Iterable<{ path, content }>
    if (isFileObject(value) || isBlob(value) || typeof value === 'string' || value instanceof String) {
      yield * map(peekable, (/** @type {ImportCandidate} */ value) => toFileObject(value, normaliseContent))
      return
    }

    // (Async)Iterable<(Async)Iterable<?>>
    // (Async)Iterable<ReadableStream<?>>
    // ReadableStream<(Async)Iterable<?>>
    // ReadableStream<ReadableStream<?>>
    if (value[Symbol.iterator] || value[Symbol.asyncIterator] || isReadableStream(value)) {
      yield * map(peekable, (/** @type {ImportCandidate} */ value) => toFileObject(value, normaliseContent))
      return
    }
  }

  // { path, content: ? }
  // Note: Detected _after_ (Async)Iterable<?> because Node.js streams have a
  // `path` property that passes this check.
  if (isFileObject(input)) {
    yield toFileObject(input, normaliseContent)
    return
  }

  throw errCode(new Error('Unexpected input: ' + typeof input), 'ERR_UNEXPECTED_INPUT')
}

/**
 * @param {ImportCandidate} input
 * @param {(content:ToContent) => AsyncIterable<Uint8Array>} normaliseContent
 */
async function toFileObject (input, normaliseContent) {
  // @ts-ignore - Those properties don't exist on most input types
  const { path, mode, mtime, content } = input

  /** @type {ImporterImportCandidate} */
  const file = {
    path: path || '',
    mode: parseMode(mode),
    mtime: parseMtime(mtime)
  }

  if (content) {
    file.content = await normaliseContent(content)
  } else if (!path) { // Not already a file object with path or content prop
    // @ts-ignore - input still can be different ToContent
    file.content = await normaliseContent(input)
  }

  return file
}


/***/ }),

/***/ 5130:
/***/ ((module) => {

"use strict";


const { Blob } = globalThis

/**
 * @param {any} obj
 * @returns {obj is ArrayBufferView|ArrayBuffer}
 */
function isBytes (obj) {
  return ArrayBuffer.isView(obj) || obj instanceof ArrayBuffer
}

/**
 * @param {any} obj
 * @returns {obj is Blob}
 */
function isBlob (obj) {
  return typeof Blob !== 'undefined' && obj instanceof Blob
}

/**
 * An object with a path or content property
 *
 * @param {any} obj
 * @returns {obj is import('ipfs-core-types/src/utils').ImportCandidate}
 */
function isFileObject (obj) {
  return typeof obj === 'object' && (obj.path || obj.content)
}

/**
 * @param {any} value
 * @returns {value is ReadableStream}
 */
const isReadableStream = (value) =>
  value && typeof value.getReader === 'function'

module.exports = {
  isBytes,
  isBlob,
  isFileObject,
  isReadableStream
}


/***/ }),

/***/ 7381:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const {
  Data: PBData
} = __nccwpck_require__(6189)
const errcode = __nccwpck_require__(2997)

/**
 * @typedef {import('./types').Mtime} Mtime
 * @typedef {import('./types').MtimeLike} MtimeLike
 */

const types = [
  'raw',
  'directory',
  'file',
  'metadata',
  'symlink',
  'hamt-sharded-directory'
]

const dirTypes = [
  'directory',
  'hamt-sharded-directory'
]

const DEFAULT_FILE_MODE = parseInt('0644', 8)
const DEFAULT_DIRECTORY_MODE = parseInt('0755', 8)

/**
 * @param {string | number | undefined} [mode]
 */
function parseMode (mode) {
  if (mode == null) {
    return undefined
  }

  if (typeof mode === 'number') {
    return mode & 0xFFF
  }

  mode = mode.toString()

  if (mode.substring(0, 1) === '0') {
    // octal string
    return parseInt(mode, 8) & 0xFFF
  }

  // decimal string
  return parseInt(mode, 10) & 0xFFF
}

/**
 * @param {any} input
 */
function parseMtime (input) {
  if (input == null) {
    return undefined
  }

  /** @type {Mtime | undefined} */
  let mtime

  // { secs, nsecs }
  if (input.secs != null) {
    mtime = {
      secs: input.secs,
      nsecs: input.nsecs
    }
  }

  // UnixFS TimeSpec
  if (input.Seconds != null) {
    mtime = {
      secs: input.Seconds,
      nsecs: input.FractionalNanoseconds
    }
  }

  // process.hrtime()
  if (Array.isArray(input)) {
    mtime = {
      secs: input[0],
      nsecs: input[1]
    }
  }

  // Javascript Date
  if (input instanceof Date) {
    const ms = input.getTime()
    const secs = Math.floor(ms / 1000)

    mtime = {
      secs: secs,
      nsecs: (ms - (secs * 1000)) * 1000
    }
  }

  /*
  TODO: https://github.com/ipfs/aegir/issues/487

  // process.hrtime.bigint()
  if (input instanceof BigInt) {
    const secs = input / BigInt(1e9)
    const nsecs = input - (secs * BigInt(1e9))

    mtime = {
      secs: parseInt(secs.toString()),
      nsecs: parseInt(nsecs.toString())
    }
  }
  */

  if (!Object.prototype.hasOwnProperty.call(mtime, 'secs')) {
    return undefined
  }

  if (mtime != null && mtime.nsecs != null && (mtime.nsecs < 0 || mtime.nsecs > 999999999)) {
    throw errcode(new Error('mtime-nsecs must be within the range [0,999999999]'), 'ERR_INVALID_MTIME_NSECS')
  }

  return mtime
}

class Data {
  /**
   * Decode from protobuf https://github.com/ipfs/specs/blob/master/UNIXFS.md
   *
   * @param {Uint8Array} marshaled
   */
  static unmarshal (marshaled) {
    const message = PBData.decode(marshaled)
    const decoded = PBData.toObject(message, {
      defaults: false,
      arrays: true,
      longs: Number,
      objects: false
    })

    const data = new Data({
      type: types[decoded.Type],
      data: decoded.Data,
      blockSizes: decoded.blocksizes,
      mode: decoded.mode,
      mtime: decoded.mtime
        ? {
            secs: decoded.mtime.Seconds,
            nsecs: decoded.mtime.FractionalNanoseconds
          }
        : undefined
    })

    // make sure we honour the original mode
    data._originalMode = decoded.mode || 0

    return data
  }

  /**
   * @param {object} [options]
   * @param {string} [options.type='file']
   * @param {Uint8Array} [options.data]
   * @param {number[]} [options.blockSizes]
   * @param {number} [options.hashType]
   * @param {number} [options.fanout]
   * @param {MtimeLike | null} [options.mtime]
   * @param {number | string} [options.mode]
   */
  constructor (options = {
    type: 'file'
  }) {
    const {
      type,
      data,
      blockSizes,
      hashType,
      fanout,
      mtime,
      mode
    } = options

    if (type && !types.includes(type)) {
      throw errcode(new Error('Type: ' + type + ' is not valid'), 'ERR_INVALID_TYPE')
    }

    this.type = type || 'file'
    this.data = data
    this.hashType = hashType
    this.fanout = fanout

    /** @type {number[]} */
    this.blockSizes = blockSizes || []
    this._originalMode = 0
    this.mode = parseMode(mode)

    if (mtime) {
      this.mtime = parseMtime(mtime)

      if (this.mtime && !this.mtime.nsecs) {
        this.mtime.nsecs = 0
      }
    }
  }

  /**
   * @param {number | undefined} mode
   */
  set mode (mode) {
    this._mode = this.isDirectory() ? DEFAULT_DIRECTORY_MODE : DEFAULT_FILE_MODE

    const parsedMode = parseMode(mode)

    if (parsedMode !== undefined) {
      this._mode = parsedMode
    }
  }

  /**
   * @returns {number | undefined}
   */
  get mode () {
    return this._mode
  }

  isDirectory () {
    return Boolean(this.type && dirTypes.includes(this.type))
  }

  /**
   * @param {number} size
   */
  addBlockSize (size) {
    this.blockSizes.push(size)
  }

  /**
   * @param {number} index
   */
  removeBlockSize (index) {
    this.blockSizes.splice(index, 1)
  }

  /**
   * Returns `0` for directories or `data.length + sum(blockSizes)` for everything else
   */
  fileSize () {
    if (this.isDirectory()) {
      // dirs don't have file size
      return 0
    }

    let sum = 0
    this.blockSizes.forEach((size) => {
      sum += size
    })

    if (this.data) {
      sum += this.data.length
    }

    return sum
  }

  /**
   * encode to protobuf Uint8Array
   */
  marshal () {
    let type

    switch (this.type) {
      case 'raw': type = PBData.DataType.Raw; break
      case 'directory': type = PBData.DataType.Directory; break
      case 'file': type = PBData.DataType.File; break
      case 'metadata': type = PBData.DataType.Metadata; break
      case 'symlink': type = PBData.DataType.Symlink; break
      case 'hamt-sharded-directory': type = PBData.DataType.HAMTShard; break
      default:
        throw errcode(new Error('Type: ' + type + ' is not valid'), 'ERR_INVALID_TYPE')
    }

    let data = this.data

    if (!this.data || !this.data.length) {
      data = undefined
    }

    let mode

    if (this.mode != null) {
      mode = (this._originalMode & 0xFFFFF000) | (parseMode(this.mode) || 0)

      if (mode === DEFAULT_FILE_MODE && !this.isDirectory()) {
        mode = undefined
      }

      if (mode === DEFAULT_DIRECTORY_MODE && this.isDirectory()) {
        mode = undefined
      }
    }

    let mtime

    if (this.mtime != null) {
      const parsed = parseMtime(this.mtime)

      if (parsed) {
        mtime = {
          Seconds: parsed.secs,
          FractionalNanoseconds: parsed.nsecs
        }

        if (mtime.FractionalNanoseconds === 0) {
          delete mtime.FractionalNanoseconds
        }
      }
    }

    const pbData = {
      Type: type,
      Data: data,
      filesize: this.isDirectory() ? undefined : this.fileSize(),
      blocksizes: this.blockSizes,
      hashType: this.hashType,
      fanout: this.fanout,
      mode,
      mtime
    }

    return PBData.encode(pbData).finish()
  }
}

module.exports = {
  UnixFS: Data,
  parseMode,
  parseMtime
}


/***/ }),

/***/ 6189:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/*eslint-disable*/


var $protobuf = __nccwpck_require__(6916);

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["ipfs-unixfs"] || ($protobuf.roots["ipfs-unixfs"] = {});

$root.Data = (function() {

    /**
     * Properties of a Data.
     * @exports IData
     * @interface IData
     * @property {Data.DataType} Type Data Type
     * @property {Uint8Array|null} [Data] Data Data
     * @property {number|null} [filesize] Data filesize
     * @property {Array.<number>|null} [blocksizes] Data blocksizes
     * @property {number|null} [hashType] Data hashType
     * @property {number|null} [fanout] Data fanout
     * @property {number|null} [mode] Data mode
     * @property {IUnixTime|null} [mtime] Data mtime
     */

    /**
     * Constructs a new Data.
     * @exports Data
     * @classdesc Represents a Data.
     * @implements IData
     * @constructor
     * @param {IData=} [p] Properties to set
     */
    function Data(p) {
        this.blocksizes = [];
        if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                if (p[ks[i]] != null)
                    this[ks[i]] = p[ks[i]];
    }

    /**
     * Data Type.
     * @member {Data.DataType} Type
     * @memberof Data
     * @instance
     */
    Data.prototype.Type = 0;

    /**
     * Data Data.
     * @member {Uint8Array} Data
     * @memberof Data
     * @instance
     */
    Data.prototype.Data = $util.newBuffer([]);

    /**
     * Data filesize.
     * @member {number} filesize
     * @memberof Data
     * @instance
     */
    Data.prototype.filesize = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Data blocksizes.
     * @member {Array.<number>} blocksizes
     * @memberof Data
     * @instance
     */
    Data.prototype.blocksizes = $util.emptyArray;

    /**
     * Data hashType.
     * @member {number} hashType
     * @memberof Data
     * @instance
     */
    Data.prototype.hashType = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Data fanout.
     * @member {number} fanout
     * @memberof Data
     * @instance
     */
    Data.prototype.fanout = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Data mode.
     * @member {number} mode
     * @memberof Data
     * @instance
     */
    Data.prototype.mode = 0;

    /**
     * Data mtime.
     * @member {IUnixTime|null|undefined} mtime
     * @memberof Data
     * @instance
     */
    Data.prototype.mtime = null;

    /**
     * Encodes the specified Data message. Does not implicitly {@link Data.verify|verify} messages.
     * @function encode
     * @memberof Data
     * @static
     * @param {IData} m Data message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Data.encode = function encode(m, w) {
        if (!w)
            w = $Writer.create();
        w.uint32(8).int32(m.Type);
        if (m.Data != null && Object.hasOwnProperty.call(m, "Data"))
            w.uint32(18).bytes(m.Data);
        if (m.filesize != null && Object.hasOwnProperty.call(m, "filesize"))
            w.uint32(24).uint64(m.filesize);
        if (m.blocksizes != null && m.blocksizes.length) {
            for (var i = 0; i < m.blocksizes.length; ++i)
                w.uint32(32).uint64(m.blocksizes[i]);
        }
        if (m.hashType != null && Object.hasOwnProperty.call(m, "hashType"))
            w.uint32(40).uint64(m.hashType);
        if (m.fanout != null && Object.hasOwnProperty.call(m, "fanout"))
            w.uint32(48).uint64(m.fanout);
        if (m.mode != null && Object.hasOwnProperty.call(m, "mode"))
            w.uint32(56).uint32(m.mode);
        if (m.mtime != null && Object.hasOwnProperty.call(m, "mtime"))
            $root.UnixTime.encode(m.mtime, w.uint32(66).fork()).ldelim();
        return w;
    };

    /**
     * Decodes a Data message from the specified reader or buffer.
     * @function decode
     * @memberof Data
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {Data} Data
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Data.decode = function decode(r, l) {
        if (!(r instanceof $Reader))
            r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l, m = new $root.Data();
        while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
            case 1:
                m.Type = r.int32();
                break;
            case 2:
                m.Data = r.bytes();
                break;
            case 3:
                m.filesize = r.uint64();
                break;
            case 4:
                if (!(m.blocksizes && m.blocksizes.length))
                    m.blocksizes = [];
                if ((t & 7) === 2) {
                    var c2 = r.uint32() + r.pos;
                    while (r.pos < c2)
                        m.blocksizes.push(r.uint64());
                } else
                    m.blocksizes.push(r.uint64());
                break;
            case 5:
                m.hashType = r.uint64();
                break;
            case 6:
                m.fanout = r.uint64();
                break;
            case 7:
                m.mode = r.uint32();
                break;
            case 8:
                m.mtime = $root.UnixTime.decode(r, r.uint32());
                break;
            default:
                r.skipType(t & 7);
                break;
            }
        }
        if (!m.hasOwnProperty("Type"))
            throw $util.ProtocolError("missing required 'Type'", { instance: m });
        return m;
    };

    /**
     * Creates a Data message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Data
     * @static
     * @param {Object.<string,*>} d Plain object
     * @returns {Data} Data
     */
    Data.fromObject = function fromObject(d) {
        if (d instanceof $root.Data)
            return d;
        var m = new $root.Data();
        switch (d.Type) {
        case "Raw":
        case 0:
            m.Type = 0;
            break;
        case "Directory":
        case 1:
            m.Type = 1;
            break;
        case "File":
        case 2:
            m.Type = 2;
            break;
        case "Metadata":
        case 3:
            m.Type = 3;
            break;
        case "Symlink":
        case 4:
            m.Type = 4;
            break;
        case "HAMTShard":
        case 5:
            m.Type = 5;
            break;
        }
        if (d.Data != null) {
            if (typeof d.Data === "string")
                $util.base64.decode(d.Data, m.Data = $util.newBuffer($util.base64.length(d.Data)), 0);
            else if (d.Data.length)
                m.Data = d.Data;
        }
        if (d.filesize != null) {
            if ($util.Long)
                (m.filesize = $util.Long.fromValue(d.filesize)).unsigned = true;
            else if (typeof d.filesize === "string")
                m.filesize = parseInt(d.filesize, 10);
            else if (typeof d.filesize === "number")
                m.filesize = d.filesize;
            else if (typeof d.filesize === "object")
                m.filesize = new $util.LongBits(d.filesize.low >>> 0, d.filesize.high >>> 0).toNumber(true);
        }
        if (d.blocksizes) {
            if (!Array.isArray(d.blocksizes))
                throw TypeError(".Data.blocksizes: array expected");
            m.blocksizes = [];
            for (var i = 0; i < d.blocksizes.length; ++i) {
                if ($util.Long)
                    (m.blocksizes[i] = $util.Long.fromValue(d.blocksizes[i])).unsigned = true;
                else if (typeof d.blocksizes[i] === "string")
                    m.blocksizes[i] = parseInt(d.blocksizes[i], 10);
                else if (typeof d.blocksizes[i] === "number")
                    m.blocksizes[i] = d.blocksizes[i];
                else if (typeof d.blocksizes[i] === "object")
                    m.blocksizes[i] = new $util.LongBits(d.blocksizes[i].low >>> 0, d.blocksizes[i].high >>> 0).toNumber(true);
            }
        }
        if (d.hashType != null) {
            if ($util.Long)
                (m.hashType = $util.Long.fromValue(d.hashType)).unsigned = true;
            else if (typeof d.hashType === "string")
                m.hashType = parseInt(d.hashType, 10);
            else if (typeof d.hashType === "number")
                m.hashType = d.hashType;
            else if (typeof d.hashType === "object")
                m.hashType = new $util.LongBits(d.hashType.low >>> 0, d.hashType.high >>> 0).toNumber(true);
        }
        if (d.fanout != null) {
            if ($util.Long)
                (m.fanout = $util.Long.fromValue(d.fanout)).unsigned = true;
            else if (typeof d.fanout === "string")
                m.fanout = parseInt(d.fanout, 10);
            else if (typeof d.fanout === "number")
                m.fanout = d.fanout;
            else if (typeof d.fanout === "object")
                m.fanout = new $util.LongBits(d.fanout.low >>> 0, d.fanout.high >>> 0).toNumber(true);
        }
        if (d.mode != null) {
            m.mode = d.mode >>> 0;
        }
        if (d.mtime != null) {
            if (typeof d.mtime !== "object")
                throw TypeError(".Data.mtime: object expected");
            m.mtime = $root.UnixTime.fromObject(d.mtime);
        }
        return m;
    };

    /**
     * Creates a plain object from a Data message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Data
     * @static
     * @param {Data} m Data
     * @param {$protobuf.IConversionOptions} [o] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Data.toObject = function toObject(m, o) {
        if (!o)
            o = {};
        var d = {};
        if (o.arrays || o.defaults) {
            d.blocksizes = [];
        }
        if (o.defaults) {
            d.Type = o.enums === String ? "Raw" : 0;
            if (o.bytes === String)
                d.Data = "";
            else {
                d.Data = [];
                if (o.bytes !== Array)
                    d.Data = $util.newBuffer(d.Data);
            }
            if ($util.Long) {
                var n = new $util.Long(0, 0, true);
                d.filesize = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
            } else
                d.filesize = o.longs === String ? "0" : 0;
            if ($util.Long) {
                var n = new $util.Long(0, 0, true);
                d.hashType = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
            } else
                d.hashType = o.longs === String ? "0" : 0;
            if ($util.Long) {
                var n = new $util.Long(0, 0, true);
                d.fanout = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
            } else
                d.fanout = o.longs === String ? "0" : 0;
            d.mode = 0;
            d.mtime = null;
        }
        if (m.Type != null && m.hasOwnProperty("Type")) {
            d.Type = o.enums === String ? $root.Data.DataType[m.Type] : m.Type;
        }
        if (m.Data != null && m.hasOwnProperty("Data")) {
            d.Data = o.bytes === String ? $util.base64.encode(m.Data, 0, m.Data.length) : o.bytes === Array ? Array.prototype.slice.call(m.Data) : m.Data;
        }
        if (m.filesize != null && m.hasOwnProperty("filesize")) {
            if (typeof m.filesize === "number")
                d.filesize = o.longs === String ? String(m.filesize) : m.filesize;
            else
                d.filesize = o.longs === String ? $util.Long.prototype.toString.call(m.filesize) : o.longs === Number ? new $util.LongBits(m.filesize.low >>> 0, m.filesize.high >>> 0).toNumber(true) : m.filesize;
        }
        if (m.blocksizes && m.blocksizes.length) {
            d.blocksizes = [];
            for (var j = 0; j < m.blocksizes.length; ++j) {
                if (typeof m.blocksizes[j] === "number")
                    d.blocksizes[j] = o.longs === String ? String(m.blocksizes[j]) : m.blocksizes[j];
                else
                    d.blocksizes[j] = o.longs === String ? $util.Long.prototype.toString.call(m.blocksizes[j]) : o.longs === Number ? new $util.LongBits(m.blocksizes[j].low >>> 0, m.blocksizes[j].high >>> 0).toNumber(true) : m.blocksizes[j];
            }
        }
        if (m.hashType != null && m.hasOwnProperty("hashType")) {
            if (typeof m.hashType === "number")
                d.hashType = o.longs === String ? String(m.hashType) : m.hashType;
            else
                d.hashType = o.longs === String ? $util.Long.prototype.toString.call(m.hashType) : o.longs === Number ? new $util.LongBits(m.hashType.low >>> 0, m.hashType.high >>> 0).toNumber(true) : m.hashType;
        }
        if (m.fanout != null && m.hasOwnProperty("fanout")) {
            if (typeof m.fanout === "number")
                d.fanout = o.longs === String ? String(m.fanout) : m.fanout;
            else
                d.fanout = o.longs === String ? $util.Long.prototype.toString.call(m.fanout) : o.longs === Number ? new $util.LongBits(m.fanout.low >>> 0, m.fanout.high >>> 0).toNumber(true) : m.fanout;
        }
        if (m.mode != null && m.hasOwnProperty("mode")) {
            d.mode = m.mode;
        }
        if (m.mtime != null && m.hasOwnProperty("mtime")) {
            d.mtime = $root.UnixTime.toObject(m.mtime, o);
        }
        return d;
    };

    /**
     * Converts this Data to JSON.
     * @function toJSON
     * @memberof Data
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Data.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * DataType enum.
     * @name Data.DataType
     * @enum {number}
     * @property {number} Raw=0 Raw value
     * @property {number} Directory=1 Directory value
     * @property {number} File=2 File value
     * @property {number} Metadata=3 Metadata value
     * @property {number} Symlink=4 Symlink value
     * @property {number} HAMTShard=5 HAMTShard value
     */
    Data.DataType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "Raw"] = 0;
        values[valuesById[1] = "Directory"] = 1;
        values[valuesById[2] = "File"] = 2;
        values[valuesById[3] = "Metadata"] = 3;
        values[valuesById[4] = "Symlink"] = 4;
        values[valuesById[5] = "HAMTShard"] = 5;
        return values;
    })();

    return Data;
})();

$root.UnixTime = (function() {

    /**
     * Properties of an UnixTime.
     * @exports IUnixTime
     * @interface IUnixTime
     * @property {number} Seconds UnixTime Seconds
     * @property {number|null} [FractionalNanoseconds] UnixTime FractionalNanoseconds
     */

    /**
     * Constructs a new UnixTime.
     * @exports UnixTime
     * @classdesc Represents an UnixTime.
     * @implements IUnixTime
     * @constructor
     * @param {IUnixTime=} [p] Properties to set
     */
    function UnixTime(p) {
        if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                if (p[ks[i]] != null)
                    this[ks[i]] = p[ks[i]];
    }

    /**
     * UnixTime Seconds.
     * @member {number} Seconds
     * @memberof UnixTime
     * @instance
     */
    UnixTime.prototype.Seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * UnixTime FractionalNanoseconds.
     * @member {number} FractionalNanoseconds
     * @memberof UnixTime
     * @instance
     */
    UnixTime.prototype.FractionalNanoseconds = 0;

    /**
     * Encodes the specified UnixTime message. Does not implicitly {@link UnixTime.verify|verify} messages.
     * @function encode
     * @memberof UnixTime
     * @static
     * @param {IUnixTime} m UnixTime message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UnixTime.encode = function encode(m, w) {
        if (!w)
            w = $Writer.create();
        w.uint32(8).int64(m.Seconds);
        if (m.FractionalNanoseconds != null && Object.hasOwnProperty.call(m, "FractionalNanoseconds"))
            w.uint32(21).fixed32(m.FractionalNanoseconds);
        return w;
    };

    /**
     * Decodes an UnixTime message from the specified reader or buffer.
     * @function decode
     * @memberof UnixTime
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {UnixTime} UnixTime
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UnixTime.decode = function decode(r, l) {
        if (!(r instanceof $Reader))
            r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l, m = new $root.UnixTime();
        while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
            case 1:
                m.Seconds = r.int64();
                break;
            case 2:
                m.FractionalNanoseconds = r.fixed32();
                break;
            default:
                r.skipType(t & 7);
                break;
            }
        }
        if (!m.hasOwnProperty("Seconds"))
            throw $util.ProtocolError("missing required 'Seconds'", { instance: m });
        return m;
    };

    /**
     * Creates an UnixTime message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof UnixTime
     * @static
     * @param {Object.<string,*>} d Plain object
     * @returns {UnixTime} UnixTime
     */
    UnixTime.fromObject = function fromObject(d) {
        if (d instanceof $root.UnixTime)
            return d;
        var m = new $root.UnixTime();
        if (d.Seconds != null) {
            if ($util.Long)
                (m.Seconds = $util.Long.fromValue(d.Seconds)).unsigned = false;
            else if (typeof d.Seconds === "string")
                m.Seconds = parseInt(d.Seconds, 10);
            else if (typeof d.Seconds === "number")
                m.Seconds = d.Seconds;
            else if (typeof d.Seconds === "object")
                m.Seconds = new $util.LongBits(d.Seconds.low >>> 0, d.Seconds.high >>> 0).toNumber();
        }
        if (d.FractionalNanoseconds != null) {
            m.FractionalNanoseconds = d.FractionalNanoseconds >>> 0;
        }
        return m;
    };

    /**
     * Creates a plain object from an UnixTime message. Also converts values to other types if specified.
     * @function toObject
     * @memberof UnixTime
     * @static
     * @param {UnixTime} m UnixTime
     * @param {$protobuf.IConversionOptions} [o] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    UnixTime.toObject = function toObject(m, o) {
        if (!o)
            o = {};
        var d = {};
        if (o.defaults) {
            if ($util.Long) {
                var n = new $util.Long(0, 0, false);
                d.Seconds = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
            } else
                d.Seconds = o.longs === String ? "0" : 0;
            d.FractionalNanoseconds = 0;
        }
        if (m.Seconds != null && m.hasOwnProperty("Seconds")) {
            if (typeof m.Seconds === "number")
                d.Seconds = o.longs === String ? String(m.Seconds) : m.Seconds;
            else
                d.Seconds = o.longs === String ? $util.Long.prototype.toString.call(m.Seconds) : o.longs === Number ? new $util.LongBits(m.Seconds.low >>> 0, m.Seconds.high >>> 0).toNumber() : m.Seconds;
        }
        if (m.FractionalNanoseconds != null && m.hasOwnProperty("FractionalNanoseconds")) {
            d.FractionalNanoseconds = m.FractionalNanoseconds;
        }
        return d;
    };

    /**
     * Converts this UnixTime to JSON.
     * @function toJSON
     * @memberof UnixTime
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    UnixTime.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return UnixTime;
})();

$root.Metadata = (function() {

    /**
     * Properties of a Metadata.
     * @exports IMetadata
     * @interface IMetadata
     * @property {string|null} [MimeType] Metadata MimeType
     */

    /**
     * Constructs a new Metadata.
     * @exports Metadata
     * @classdesc Represents a Metadata.
     * @implements IMetadata
     * @constructor
     * @param {IMetadata=} [p] Properties to set
     */
    function Metadata(p) {
        if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                if (p[ks[i]] != null)
                    this[ks[i]] = p[ks[i]];
    }

    /**
     * Metadata MimeType.
     * @member {string} MimeType
     * @memberof Metadata
     * @instance
     */
    Metadata.prototype.MimeType = "";

    /**
     * Encodes the specified Metadata message. Does not implicitly {@link Metadata.verify|verify} messages.
     * @function encode
     * @memberof Metadata
     * @static
     * @param {IMetadata} m Metadata message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Metadata.encode = function encode(m, w) {
        if (!w)
            w = $Writer.create();
        if (m.MimeType != null && Object.hasOwnProperty.call(m, "MimeType"))
            w.uint32(10).string(m.MimeType);
        return w;
    };

    /**
     * Decodes a Metadata message from the specified reader or buffer.
     * @function decode
     * @memberof Metadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {Metadata} Metadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Metadata.decode = function decode(r, l) {
        if (!(r instanceof $Reader))
            r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l, m = new $root.Metadata();
        while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
            case 1:
                m.MimeType = r.string();
                break;
            default:
                r.skipType(t & 7);
                break;
            }
        }
        return m;
    };

    /**
     * Creates a Metadata message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Metadata
     * @static
     * @param {Object.<string,*>} d Plain object
     * @returns {Metadata} Metadata
     */
    Metadata.fromObject = function fromObject(d) {
        if (d instanceof $root.Metadata)
            return d;
        var m = new $root.Metadata();
        if (d.MimeType != null) {
            m.MimeType = String(d.MimeType);
        }
        return m;
    };

    /**
     * Creates a plain object from a Metadata message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Metadata
     * @static
     * @param {Metadata} m Metadata
     * @param {$protobuf.IConversionOptions} [o] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Metadata.toObject = function toObject(m, o) {
        if (!o)
            o = {};
        var d = {};
        if (o.defaults) {
            d.MimeType = "";
        }
        if (m.MimeType != null && m.hasOwnProperty("MimeType")) {
            d.MimeType = m.MimeType;
        }
        return d;
    };

    /**
     * Converts this Metadata to JSON.
     * @function toJSON
     * @memberof Metadata
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Metadata.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Metadata;
})();

module.exports = $root;


/***/ }),

/***/ 874:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const errCode = __nccwpck_require__(2997)
const { CID } = __nccwpck_require__(6447)
const resolve = __nccwpck_require__(1120)
const last = __nccwpck_require__(7123)

/**
 * @typedef {import('ipfs-unixfs').UnixFS} UnixFS
 * @typedef {import('interface-blockstore').Blockstore} Blockstore
 * @typedef {import('./types').ExporterOptions} ExporterOptions
 * @typedef {import('./types').UnixFSFile} UnixFSFile
 * @typedef {import('./types').UnixFSDirectory} UnixFSDirectory
 * @typedef {import('./types').ObjectNode} ObjectNode
 * @typedef {import('./types').RawNode} RawNode
 * @typedef {import('./types').IdentityNode} IdentityNode
 * @typedef {import('./types').UnixFSEntry} UnixFSEntry
 */

const toPathComponents = (path = '') => {
  // split on / unless escaped with \
  return (path
    .trim()
    .match(/([^\\^/]|\\\/)+/g) || [])
    .filter(Boolean)
}

/**
 * @param {string|Uint8Array|CID} path
 */
const cidAndRest = (path) => {
  if (path instanceof Uint8Array) {
    return {
      cid: CID.decode(path),
      toResolve: []
    }
  }

  const cid = CID.asCID(path)
  if (cid) {
    return {
      cid,
      toResolve: []
    }
  }

  if (typeof path === 'string') {
    if (path.indexOf('/ipfs/') === 0) {
      path = path.substring(6)
    }

    const output = toPathComponents(path)

    return {
      cid: CID.parse(output[0]),
      toResolve: output.slice(1)
    }
  }

  throw errCode(new Error(`Unknown path type ${path}`), 'ERR_BAD_PATH')
}

/**
 * @param {string | CID} path
 * @param {Blockstore} blockstore
 * @param {ExporterOptions} [options]
 */
async function * walkPath (path, blockstore, options = {}) {
  let {
    cid,
    toResolve
  } = cidAndRest(path)
  let name = cid.toString()
  let entryPath = name
  const startingDepth = toResolve.length

  while (true) {
    const result = await resolve(cid, name, entryPath, toResolve, startingDepth, blockstore, options)

    if (!result.entry && !result.next) {
      throw errCode(new Error(`Could not resolve ${path}`), 'ERR_NOT_FOUND')
    }

    if (result.entry) {
      yield result.entry
    }

    if (!result.next) {
      return
    }

    // resolve further parts
    toResolve = result.next.toResolve
    cid = result.next.cid
    name = result.next.name
    entryPath = result.next.path
  }
}

/**
 * @param {string | CID} path
 * @param {Blockstore} blockstore
 * @param {ExporterOptions} [options]
 */
async function exporter (path, blockstore, options = {}) {
  const result = await last(walkPath(path, blockstore, options))

  if (!result) {
    throw errCode(new Error(`Could not resolve ${path}`), 'ERR_NOT_FOUND')
  }

  return result
}

/**
 * @param {string | CID} path
 * @param {Blockstore} blockstore
 * @param {ExporterOptions} [options]
 */
async function * recursive (path, blockstore, options = {}) {
  const node = await exporter(path, blockstore, options)

  if (!node) {
    return
  }

  yield node

  if (node.type === 'directory') {
    for await (const child of recurse(node, options)) {
      yield child
    }
  }

  /**
   * @param {UnixFSDirectory} node
   * @param {ExporterOptions} options
   * @returns {AsyncGenerator<UnixFSEntry, void, any>}
   */
  async function * recurse (node, options) {
    for await (const file of node.content(options)) {
      yield file

      if (file instanceof Uint8Array) {
        continue
      }

      if (file.type === 'directory') {
        yield * recurse(file, options)
      }
    }
  }
}

module.exports = {
  exporter,
  walkPath,
  recursive
}


/***/ }),

/***/ 7049:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const { CID } = __nccwpck_require__(6447)
const errCode = __nccwpck_require__(2997)
const dagCbor = __nccwpck_require__(6477)

/**
 * @typedef {import('../types').Resolver} Resolver
 */

/**
 * @type {Resolver}
 */
const resolve = async (cid, name, path, toResolve, resolve, depth, blockstore, options) => {
  const block = await blockstore.get(cid)
  const object = dagCbor.decode(block)
  let subObject = object
  let subPath = path

  while (toResolve.length) {
    const prop = toResolve[0]

    if (prop in subObject) {
      // remove the bit of the path we have resolved
      toResolve.shift()
      subPath = `${subPath}/${prop}`

      const subObjectCid = CID.asCID(subObject[prop])
      if (subObjectCid) {
        return {
          entry: {
            type: 'object',
            name,
            path,
            cid,
            node: block,
            depth,
            size: block.length,
            content: async function * () {
              yield object
            }
          },
          next: {
            cid: subObjectCid,
            name: prop,
            path: subPath,
            toResolve
          }
        }
      }

      subObject = subObject[prop]
    } else {
      // cannot resolve further
      throw errCode(new Error(`No property named ${prop} found in cbor node ${cid}`), 'ERR_NO_PROP')
    }
  }

  return {
    entry: {
      type: 'object',
      name,
      path,
      cid,
      node: block,
      depth,
      size: block.length,
      content: async function * () {
        yield object
      }
    }
  }
}

module.exports = resolve


/***/ }),

/***/ 8522:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const errCode = __nccwpck_require__(2997)
const extractDataFromBlock = __nccwpck_require__(2553)
const validateOffsetAndLength = __nccwpck_require__(4178)
const mh = __nccwpck_require__(76)

/**
 * @typedef {import('../types').ExporterOptions} ExporterOptions
 * @typedef {import('../types').Resolver} Resolver
 */

/**
 * @param {Uint8Array} node
 */
const rawContent = (node) => {
  /**
   * @param {ExporterOptions} options
   */
  async function * contentGenerator (options = {}) {
    const {
      offset,
      length
    } = validateOffsetAndLength(node.length, options.offset, options.length)

    yield extractDataFromBlock(node, 0, offset, offset + length)
  }

  return contentGenerator
}

/**
 * @type {Resolver}
 */
const resolve = async (cid, name, path, toResolve, resolve, depth, blockstore, options) => {
  if (toResolve.length) {
    throw errCode(new Error(`No link named ${path} found in raw node ${cid}`), 'ERR_NOT_FOUND')
  }
  const buf = await mh.decode(cid.multihash.bytes)

  return {
    entry: {
      type: 'identity',
      name,
      path,
      cid,
      content: rawContent(buf.digest),
      depth,
      size: buf.digest.length,
      node: buf.digest
    }
  }
}

module.exports = resolve


/***/ }),

/***/ 1120:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const errCode = __nccwpck_require__(2997)

const dagPb = __nccwpck_require__(8012)
const dagCbor = __nccwpck_require__(6477)
const raw = __nccwpck_require__(2048)
const { identity } = __nccwpck_require__(2379)

/**
 * @typedef {import('../types').Resolver} Resolver
 * @typedef {import('../types').Resolve} Resolve
 */

/**
 * @type {{ [ key: string ]: Resolver }}
 */
const resolvers = {
  [dagPb.code]: __nccwpck_require__(1799),
  [raw.code]: __nccwpck_require__(8731),
  [dagCbor.code]: __nccwpck_require__(7049),
  [identity.code]: __nccwpck_require__(8522)
}

/**
 * @type {Resolve}
 */
function resolve (cid, name, path, toResolve, depth, blockstore, options) {
  const resolver = resolvers[cid.code]

  if (!resolver) {
    throw errCode(new Error(`No resolver for code ${cid.code}`), 'ERR_NO_RESOLVER')
  }

  return resolver(cid, name, path, toResolve, resolve, depth, blockstore, options)
}

module.exports = resolve


/***/ }),

/***/ 8731:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const errCode = __nccwpck_require__(2997)
const extractDataFromBlock = __nccwpck_require__(2553)
const validateOffsetAndLength = __nccwpck_require__(4178)

/**
 * @typedef {import('../types').ExporterOptions} ExporterOptions
 */

/**
 * @param {Uint8Array} node
 */
const rawContent = (node) => {
  /**
   * @param {ExporterOptions} options
   */
  async function * contentGenerator (options = {}) {
    const {
      offset,
      length
    } = validateOffsetAndLength(node.length, options.offset, options.length)

    yield extractDataFromBlock(node, 0, offset, offset + length)
  }

  return contentGenerator
}

/**
 * @type {import('../types').Resolver}
 */
const resolve = async (cid, name, path, toResolve, resolve, depth, blockstore, options) => {
  if (toResolve.length) {
    throw errCode(new Error(`No link named ${path} found in raw node ${cid}`), 'ERR_NOT_FOUND')
  }

  const block = await blockstore.get(cid, options)

  return {
    entry: {
      type: 'raw',
      name,
      path,
      cid,
      content: rawContent(block),
      depth,
      size: block.length,
      node: block
    }
  }
}

module.exports = resolve


/***/ }),

/***/ 8703:
/***/ ((module) => {

"use strict";


/**
 * @typedef {import('../../../types').ExporterOptions} ExporterOptions
 * @typedef {import('../../../types').UnixfsV1DirectoryContent} UnixfsV1DirectoryContent
 * @typedef {import('../../../types').UnixfsV1Resolver} UnixfsV1Resolver
 */

/**
 * @type {UnixfsV1Resolver}
 */
const directoryContent = (cid, node, unixfs, path, resolve, depth, blockstore) => {
  /**
   * @param {ExporterOptions} [options]
   * @returns {UnixfsV1DirectoryContent}
   */
  async function * yieldDirectoryContent (options = {}) {
    const offset = options.offset || 0
    const length = options.length || node.Links.length
    const links = node.Links.slice(offset, length)

    for (const link of links) {
      const result = await resolve(link.Hash, link.Name || '', `${path}/${link.Name || ''}`, [], depth + 1, blockstore, options)

      if (result.entry) {
        yield result.entry
      }
    }
  }

  return yieldDirectoryContent
}

module.exports = directoryContent


/***/ }),

/***/ 7373:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const extractDataFromBlock = __nccwpck_require__(2553)
const validateOffsetAndLength = __nccwpck_require__(4178)
const { UnixFS } = __nccwpck_require__(7381)
const errCode = __nccwpck_require__(2997)
const dagPb = __nccwpck_require__(8012)
const dagCbor = __nccwpck_require__(6477)
const raw = __nccwpck_require__(2048)

/**
 * @typedef {import('../../../types').ExporterOptions} ExporterOptions
 * @typedef {import('interface-blockstore').Blockstore} Blockstore
 * @typedef {import('@ipld/dag-pb').PBNode} PBNode
 *
 * @param {Blockstore} blockstore
 * @param {PBNode} node
 * @param {number} start
 * @param {number} end
 * @param {number} streamPosition
 * @param {ExporterOptions} options
 * @returns {AsyncIterable<Uint8Array>}
 */
async function * emitBytes (blockstore, node, start, end, streamPosition = 0, options) {
  // a `raw` node
  if (node instanceof Uint8Array) {
    const buf = extractDataFromBlock(node, streamPosition, start, end)

    if (buf.length) {
      yield buf
    }

    streamPosition += buf.length

    return streamPosition
  }

  if (node.Data == null) {
    throw errCode(new Error('no data in PBNode'), 'ERR_NOT_UNIXFS')
  }

  let file

  try {
    file = UnixFS.unmarshal(node.Data)
  } catch (err) {
    throw errCode(err, 'ERR_NOT_UNIXFS')
  }

  // might be a unixfs `raw` node or have data on intermediate nodes
  if (file.data && file.data.length) {
    const buf = extractDataFromBlock(file.data, streamPosition, start, end)

    if (buf.length) {
      yield buf
    }

    streamPosition += file.data.length
  }

  let childStart = streamPosition

  // work out which child nodes contain the requested data
  for (let i = 0; i < node.Links.length; i++) {
    const childLink = node.Links[i]
    const childEnd = streamPosition + file.blockSizes[i]

    if ((start >= childStart && start < childEnd) || // child has offset byte
        (end > childStart && end <= childEnd) || // child has end byte
        (start < childStart && end > childEnd)) { // child is between offset and end bytes
      const block = await blockstore.get(childLink.Hash, {
        signal: options.signal
      })
      let child
      switch (childLink.Hash.code) {
        case dagPb.code:
          child = await dagPb.decode(block)
          break
        case raw.code:
          child = block
          break
        case dagCbor.code:
          child = await dagCbor.decode(block)
          break
        default:
          throw Error(`Unsupported codec: ${childLink.Hash.code}`)
      }

      for await (const buf of emitBytes(blockstore, child, start, end, streamPosition, options)) {
        streamPosition += buf.length

        yield buf
      }
    }

    streamPosition = childEnd
    childStart = childEnd + 1
  }
}

/**
 * @type {import('../').UnixfsV1Resolver}
 */
const fileContent = (cid, node, unixfs, path, resolve, depth, blockstore) => {
  /**
   * @param {ExporterOptions} options
   */
  function yieldFileContent (options = {}) {
    const fileSize = unixfs.fileSize()

    if (fileSize === undefined) {
      throw new Error('File was a directory')
    }

    const {
      offset,
      length
    } = validateOffsetAndLength(fileSize, options.offset, options.length)

    const start = offset
    const end = offset + length

    return emitBytes(blockstore, node, start, end, 0, options)
  }

  return yieldFileContent
}

module.exports = fileContent


/***/ }),

/***/ 3353:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const { decode } = __nccwpck_require__(8012)

/**
 * @typedef {import('interface-blockstore').Blockstore} Blockstore
 * @typedef {import('../../../types').ExporterOptions} ExporterOptions
 * @typedef {import('../../../types').Resolve} Resolve
 * @typedef {import('../../../types').UnixfsV1DirectoryContent} UnixfsV1DirectoryContent
 * @typedef {import('../../../types').UnixfsV1Resolver} UnixfsV1Resolver
 * @typedef {import('@ipld/dag-pb').PBNode} PBNode
 */

/**
 * @type {UnixfsV1Resolver}
 */
const hamtShardedDirectoryContent = (cid, node, unixfs, path, resolve, depth, blockstore) => {
  /**
   * @param {ExporterOptions} options
   *
   */
  function yieldHamtDirectoryContent (options = {}) {
    return listDirectory(node, path, resolve, depth, blockstore, options)
  }

  return yieldHamtDirectoryContent
}

/**
 * @param {PBNode} node
 * @param {string} path
 * @param {Resolve} resolve
 * @param {number} depth
 * @param {Blockstore} blockstore
 * @param {ExporterOptions} options
 *
 * @returns {UnixfsV1DirectoryContent}
 */
async function * listDirectory (node, path, resolve, depth, blockstore, options) {
  const links = node.Links

  for (const link of links) {
    const name = link.Name != null ? link.Name.substring(2) : null

    if (name) {
      const result = await resolve(link.Hash, name, `${path}/${name}`, [], depth + 1, blockstore, options)

      yield result.entry
    } else {
      // descend into subshard
      const block = await blockstore.get(link.Hash)
      node = decode(block)

      for await (const file of listDirectory(node, path, resolve, depth, blockstore, options)) {
        yield file
      }
    }
  }
}

module.exports = hamtShardedDirectoryContent


/***/ }),

/***/ 1799:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const errCode = __nccwpck_require__(2997)
const { UnixFS } = __nccwpck_require__(7381)
const findShardCid = __nccwpck_require__(754)
const { decode } = __nccwpck_require__(8012)

/**
 * @typedef {import('../../types').Resolve} Resolve
 * @typedef {import('../../types').Resolver} Resolver
 * @typedef {import('../../types').UnixfsV1Resolver} UnixfsV1Resolver
 * @typedef {import('@ipld/dag-pb').PBNode} PBNode
 */

/**
 * @param {PBNode} node
 * @param {string} name
 */
const findLinkCid = (node, name) => {
  const link = node.Links.find(link => link.Name === name)

  return link && link.Hash
}

/**
 * @type {{ [key: string]: UnixfsV1Resolver }}
 */
const contentExporters = {
  raw: __nccwpck_require__(7373),
  file: __nccwpck_require__(7373),
  directory: __nccwpck_require__(8703),
  'hamt-sharded-directory': __nccwpck_require__(3353),
  metadata: (cid, node, unixfs, path, resolve, depth, blockstore) => {
    return () => []
  },
  symlink: (cid, node, unixfs, path, resolve, depth, blockstore) => {
    return () => []
  }
}

/**
 * @type {Resolver}
 */
const unixFsResolver = async (cid, name, path, toResolve, resolve, depth, blockstore, options) => {
  const block = await blockstore.get(cid, options)
  const node = decode(block)
  let unixfs
  let next

  if (!name) {
    name = cid.toString()
  }

  if (node.Data == null) {
    throw errCode(new Error('no data in PBNode'), 'ERR_NOT_UNIXFS')
  }

  try {
    unixfs = UnixFS.unmarshal(node.Data)
  } catch (err) {
    // non-UnixFS dag-pb node? It could happen.
    throw errCode(err, 'ERR_NOT_UNIXFS')
  }

  if (!path) {
    path = name
  }

  if (toResolve.length) {
    let linkCid

    if (unixfs && unixfs.type === 'hamt-sharded-directory') {
      // special case - unixfs v1 hamt shards
      linkCid = await findShardCid(node, toResolve[0], blockstore)
    } else {
      linkCid = findLinkCid(node, toResolve[0])
    }

    if (!linkCid) {
      throw errCode(new Error('file does not exist'), 'ERR_NOT_FOUND')
    }

    // remove the path component we have resolved
    const nextName = toResolve.shift()
    const nextPath = `${path}/${nextName}`

    next = {
      cid: linkCid,
      toResolve,
      name: nextName || '',
      path: nextPath
    }
  }

  return {
    entry: {
      type: unixfs.isDirectory() ? 'directory' : 'file',
      name,
      path,
      cid,
      // @ts-ignore
      content: contentExporters[unixfs.type](cid, node, unixfs, path, resolve, depth, blockstore),
      unixfs,
      depth,
      node,
      size: unixfs.fileSize()
    },
    next
  }
}

module.exports = unixFsResolver


/***/ }),

/***/ 2553:
/***/ ((module) => {

"use strict";


/**
 * @param {Uint8Array} block
 * @param {number} blockStart
 * @param {number} requestedStart
 * @param {number} requestedEnd
 */
module.exports = function extractDataFromBlock (block, blockStart, requestedStart, requestedEnd) {
  const blockLength = block.length
  const blockEnd = blockStart + blockLength

  if (requestedStart >= blockEnd || requestedEnd < blockStart) {
    // If we are looking for a byte range that is starts after the start of the block,
    // return an empty block.  This can happen when internal nodes contain data
    return new Uint8Array(0)
  }

  if (requestedEnd >= blockStart && requestedEnd < blockEnd) {
    // If the end byte is in the current block, truncate the block to the end byte
    block = block.slice(0, requestedEnd - blockStart)
  }

  if (requestedStart >= blockStart && requestedStart < blockEnd) {
    // If the start byte is in the current block, skip to the start byte
    block = block.slice(requestedStart - blockStart)
  }

  return block
}


/***/ }),

/***/ 754:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const { Bucket, createHAMT } = __nccwpck_require__(7820)
const { decode } = __nccwpck_require__(8012)
// @ts-ignore - no types available
const mur = __nccwpck_require__(7214)
const uint8ArrayFromString = __nccwpck_require__(828)

/**
 * @typedef {import('interface-blockstore').Blockstore} Blockstore
 * @typedef {import('multiformats/cid').CID} CID
 * @typedef {import('../types').ExporterOptions} ExporterOptions
 * @typedef {import('@ipld/dag-pb').PBNode} PBNode
 * @typedef {import('@ipld/dag-pb').PBLink} PBLink
 */

// FIXME: this is copy/pasted from ipfs-unixfs-importer/src/options.js
/**
 * @param {Uint8Array} buf
 */
const hashFn = async function (buf) {
  return uint8ArrayFromString(mur.x64.hash128(buf), 'base16').slice(0, 8).reverse()
}

/**
 * @param {PBLink[]} links
 * @param {Bucket<boolean>} bucket
 * @param {Bucket<boolean>} rootBucket
 */
const addLinksToHamtBucket = (links, bucket, rootBucket) => {
  return Promise.all(
    links.map(link => {
      if (link.Name == null) {
        // TODO(@rvagg): what do? this is technically possible
        throw new Error('Unexpected Link without a Name')
      }
      if (link.Name.length === 2) {
        const pos = parseInt(link.Name, 16)

        return bucket._putObjectAt(pos, new Bucket({
          hash: rootBucket._options.hash,
          bits: rootBucket._options.bits
        }, bucket, pos))
      }

      return rootBucket.put(link.Name.substring(2), true)
    })
  )
}

/**
 * @param {number} position
 */
const toPrefix = (position) => {
  return position
    .toString(16)
    .toUpperCase()
    .padStart(2, '0')
    .substring(0, 2)
}

/**
 * @param {import('hamt-sharding').Bucket.BucketPosition<boolean>} position
 */
const toBucketPath = (position) => {
  let bucket = position.bucket
  const path = []

  while (bucket._parent) {
    path.push(bucket)

    bucket = bucket._parent
  }

  path.push(bucket)

  return path.reverse()
}

/**
 * @typedef {object} ShardTraversalContext
 * @property {number} hamtDepth
 * @property {Bucket<boolean>} rootBucket
 * @property {Bucket<boolean>} lastBucket
 *
 * @param {PBNode} node
 * @param {string} name
 * @param {Blockstore} blockstore
 * @param {ShardTraversalContext} [context]
 * @param {ExporterOptions} [options]
 * @returns {Promise<CID|null>}
 */
const findShardCid = async (node, name, blockstore, context, options) => {
  if (!context) {
    const rootBucket = createHAMT({
      hashFn
    })

    context = {
      rootBucket,
      hamtDepth: 1,
      lastBucket: rootBucket
    }
  }

  await addLinksToHamtBucket(node.Links, context.lastBucket, context.rootBucket)

  const position = await context.rootBucket._findNewBucketAndPos(name)
  let prefix = toPrefix(position.pos)
  const bucketPath = toBucketPath(position)

  if (bucketPath.length > context.hamtDepth) {
    context.lastBucket = bucketPath[context.hamtDepth]

    prefix = toPrefix(context.lastBucket._posAtParent)
  }

  const link = node.Links.find(link => {
    if (link.Name == null) {
      return false
    }

    const entryPrefix = link.Name.substring(0, 2)
    const entryName = link.Name.substring(2)

    if (entryPrefix !== prefix) {
      // not the entry or subshard we're looking for
      return false
    }

    if (entryName && entryName !== name) {
      // not the entry we're looking for
      return false
    }

    return true
  })

  if (!link) {
    return null
  }

  if (link.Name != null && link.Name.substring(2) === name) {
    return link.Hash
  }

  context.hamtDepth++

  const block = await blockstore.get(link.Hash, options)
  node = decode(block)

  return findShardCid(node, name, blockstore, context, options)
}

module.exports = findShardCid


/***/ }),

/***/ 4178:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const errCode = __nccwpck_require__(2997)

/**
 * @param {number} size
 * @param {number} [offset]
 * @param {number} [length]
 */
const validateOffsetAndLength = (size, offset, length) => {
  if (!offset) {
    offset = 0
  }

  if (offset < 0) {
    throw errCode(new Error('Offset must be greater than or equal to 0'), 'ERR_INVALID_PARAMS')
  }

  if (offset > size) {
    throw errCode(new Error('Offset must be less than the file size'), 'ERR_INVALID_PARAMS')
  }

  if (!length && length !== 0) {
    length = size - offset
  }

  if (length < 0) {
    throw errCode(new Error('Length must be greater than or equal to 0'), 'ERR_INVALID_PARAMS')
  }

  if (offset + length > size) {
    length = size - offset
  }

  return {
    offset,
    length
  }
}

module.exports = validateOffsetAndLength


/***/ }),

/***/ 8386:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const { Buffer } = __nccwpck_require__(4293)
const symbol = Symbol.for('BufferList')

function BufferList (buf) {
  if (!(this instanceof BufferList)) {
    return new BufferList(buf)
  }

  BufferList._init.call(this, buf)
}

BufferList._init = function _init (buf) {
  Object.defineProperty(this, symbol, { value: true })

  this._bufs = []
  this.length = 0

  if (buf) {
    this.append(buf)
  }
}

BufferList.prototype._new = function _new (buf) {
  return new BufferList(buf)
}

BufferList.prototype._offset = function _offset (offset) {
  if (offset === 0) {
    return [0, 0]
  }

  let tot = 0

  for (let i = 0; i < this._bufs.length; i++) {
    const _t = tot + this._bufs[i].length
    if (offset < _t || i === this._bufs.length - 1) {
      return [i, offset - tot]
    }
    tot = _t
  }
}

BufferList.prototype._reverseOffset = function (blOffset) {
  const bufferId = blOffset[0]
  let offset = blOffset[1]

  for (let i = 0; i < bufferId; i++) {
    offset += this._bufs[i].length
  }

  return offset
}

BufferList.prototype.get = function get (index) {
  if (index > this.length || index < 0) {
    return undefined
  }

  const offset = this._offset(index)

  return this._bufs[offset[0]][offset[1]]
}

BufferList.prototype.slice = function slice (start, end) {
  if (typeof start === 'number' && start < 0) {
    start += this.length
  }

  if (typeof end === 'number' && end < 0) {
    end += this.length
  }

  return this.copy(null, 0, start, end)
}

BufferList.prototype.copy = function copy (dst, dstStart, srcStart, srcEnd) {
  if (typeof srcStart !== 'number' || srcStart < 0) {
    srcStart = 0
  }

  if (typeof srcEnd !== 'number' || srcEnd > this.length) {
    srcEnd = this.length
  }

  if (srcStart >= this.length) {
    return dst || Buffer.alloc(0)
  }

  if (srcEnd <= 0) {
    return dst || Buffer.alloc(0)
  }

  const copy = !!dst
  const off = this._offset(srcStart)
  const len = srcEnd - srcStart
  let bytes = len
  let bufoff = (copy && dstStart) || 0
  let start = off[1]

  // copy/slice everything
  if (srcStart === 0 && srcEnd === this.length) {
    if (!copy) {
      // slice, but full concat if multiple buffers
      return this._bufs.length === 1
        ? this._bufs[0]
        : Buffer.concat(this._bufs, this.length)
    }

    // copy, need to copy individual buffers
    for (let i = 0; i < this._bufs.length; i++) {
      this._bufs[i].copy(dst, bufoff)
      bufoff += this._bufs[i].length
    }

    return dst
  }

  // easy, cheap case where it's a subset of one of the buffers
  if (bytes <= this._bufs[off[0]].length - start) {
    return copy
      ? this._bufs[off[0]].copy(dst, dstStart, start, start + bytes)
      : this._bufs[off[0]].slice(start, start + bytes)
  }

  if (!copy) {
    // a slice, we need something to copy in to
    dst = Buffer.allocUnsafe(len)
  }

  for (let i = off[0]; i < this._bufs.length; i++) {
    const l = this._bufs[i].length - start

    if (bytes > l) {
      this._bufs[i].copy(dst, bufoff, start)
      bufoff += l
    } else {
      this._bufs[i].copy(dst, bufoff, start, start + bytes)
      bufoff += l
      break
    }

    bytes -= l

    if (start) {
      start = 0
    }
  }

  // safeguard so that we don't return uninitialized memory
  if (dst.length > bufoff) return dst.slice(0, bufoff)

  return dst
}

BufferList.prototype.shallowSlice = function shallowSlice (start, end) {
  start = start || 0
  end = typeof end !== 'number' ? this.length : end

  if (start < 0) {
    start += this.length
  }

  if (end < 0) {
    end += this.length
  }

  if (start === end) {
    return this._new()
  }

  const startOffset = this._offset(start)
  const endOffset = this._offset(end)
  const buffers = this._bufs.slice(startOffset[0], endOffset[0] + 1)

  if (endOffset[1] === 0) {
    buffers.pop()
  } else {
    buffers[buffers.length - 1] = buffers[buffers.length - 1].slice(0, endOffset[1])
  }

  if (startOffset[1] !== 0) {
    buffers[0] = buffers[0].slice(startOffset[1])
  }

  return this._new(buffers)
}

BufferList.prototype.toString = function toString (encoding, start, end) {
  return this.slice(start, end).toString(encoding)
}

BufferList.prototype.consume = function consume (bytes) {
  // first, normalize the argument, in accordance with how Buffer does it
  bytes = Math.trunc(bytes)
  // do nothing if not a positive number
  if (Number.isNaN(bytes) || bytes <= 0) return this

  while (this._bufs.length) {
    if (bytes >= this._bufs[0].length) {
      bytes -= this._bufs[0].length
      this.length -= this._bufs[0].length
      this._bufs.shift()
    } else {
      this._bufs[0] = this._bufs[0].slice(bytes)
      this.length -= bytes
      break
    }
  }

  return this
}

BufferList.prototype.duplicate = function duplicate () {
  const copy = this._new()

  for (let i = 0; i < this._bufs.length; i++) {
    copy.append(this._bufs[i])
  }

  return copy
}

BufferList.prototype.append = function append (buf) {
  if (buf == null) {
    return this
  }

  if (buf.buffer) {
    // append a view of the underlying ArrayBuffer
    this._appendBuffer(Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength))
  } else if (Array.isArray(buf)) {
    for (let i = 0; i < buf.length; i++) {
      this.append(buf[i])
    }
  } else if (this._isBufferList(buf)) {
    // unwrap argument into individual BufferLists
    for (let i = 0; i < buf._bufs.length; i++) {
      this.append(buf._bufs[i])
    }
  } else {
    // coerce number arguments to strings, since Buffer(number) does
    // uninitialized memory allocation
    if (typeof buf === 'number') {
      buf = buf.toString()
    }

    this._appendBuffer(Buffer.from(buf))
  }

  return this
}

BufferList.prototype._appendBuffer = function appendBuffer (buf) {
  this._bufs.push(buf)
  this.length += buf.length
}

BufferList.prototype.indexOf = function (search, offset, encoding) {
  if (encoding === undefined && typeof offset === 'string') {
    encoding = offset
    offset = undefined
  }

  if (typeof search === 'function' || Array.isArray(search)) {
    throw new TypeError('The "value" argument must be one of type string, Buffer, BufferList, or Uint8Array.')
  } else if (typeof search === 'number') {
    search = Buffer.from([search])
  } else if (typeof search === 'string') {
    search = Buffer.from(search, encoding)
  } else if (this._isBufferList(search)) {
    search = search.slice()
  } else if (Array.isArray(search.buffer)) {
    search = Buffer.from(search.buffer, search.byteOffset, search.byteLength)
  } else if (!Buffer.isBuffer(search)) {
    search = Buffer.from(search)
  }

  offset = Number(offset || 0)

  if (isNaN(offset)) {
    offset = 0
  }

  if (offset < 0) {
    offset = this.length + offset
  }

  if (offset < 0) {
    offset = 0
  }

  if (search.length === 0) {
    return offset > this.length ? this.length : offset
  }

  const blOffset = this._offset(offset)
  let blIndex = blOffset[0] // index of which internal buffer we're working on
  let buffOffset = blOffset[1] // offset of the internal buffer we're working on

  // scan over each buffer
  for (; blIndex < this._bufs.length; blIndex++) {
    const buff = this._bufs[blIndex]

    while (buffOffset < buff.length) {
      const availableWindow = buff.length - buffOffset

      if (availableWindow >= search.length) {
        const nativeSearchResult = buff.indexOf(search, buffOffset)

        if (nativeSearchResult !== -1) {
          return this._reverseOffset([blIndex, nativeSearchResult])
        }

        buffOffset = buff.length - search.length + 1 // end of native search window
      } else {
        const revOffset = this._reverseOffset([blIndex, buffOffset])

        if (this._match(revOffset, search)) {
          return revOffset
        }

        buffOffset++
      }
    }

    buffOffset = 0
  }

  return -1
}

BufferList.prototype._match = function (offset, search) {
  if (this.length - offset < search.length) {
    return false
  }

  for (let searchOffset = 0; searchOffset < search.length; searchOffset++) {
    if (this.get(offset + searchOffset) !== search[searchOffset]) {
      return false
    }
  }
  return true
}

;(function () {
  const methods = {
    readDoubleBE: 8,
    readDoubleLE: 8,
    readFloatBE: 4,
    readFloatLE: 4,
    readInt32BE: 4,
    readInt32LE: 4,
    readUInt32BE: 4,
    readUInt32LE: 4,
    readInt16BE: 2,
    readInt16LE: 2,
    readUInt16BE: 2,
    readUInt16LE: 2,
    readInt8: 1,
    readUInt8: 1,
    readIntBE: null,
    readIntLE: null,
    readUIntBE: null,
    readUIntLE: null
  }

  for (const m in methods) {
    (function (m) {
      if (methods[m] === null) {
        BufferList.prototype[m] = function (offset, byteLength) {
          return this.slice(offset, offset + byteLength)[m](0, byteLength)
        }
      } else {
        BufferList.prototype[m] = function (offset = 0) {
          return this.slice(offset, offset + methods[m])[m](0)
        }
      }
    }(m))
  }
}())

// Used internally by the class and also as an indicator of this object being
// a `BufferList`. It's not possible to use `instanceof BufferList` in a browser
// environment because there could be multiple different copies of the
// BufferList class and some `BufferList`s might be `BufferList`s.
BufferList.prototype._isBufferList = function _isBufferList (b) {
  return b instanceof BufferList || BufferList.isBufferList(b)
}

BufferList.isBufferList = function isBufferList (b) {
  return b != null && b[symbol]
}

module.exports = BufferList


/***/ }),

/***/ 4171:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const {
  Data: PBData
} = __nccwpck_require__(8262)
const errcode = __nccwpck_require__(2997)

/**
 * @typedef {import('./types').Mtime} Mtime
 * @typedef {import('./types').MtimeLike} MtimeLike
 */

const types = [
  'raw',
  'directory',
  'file',
  'metadata',
  'symlink',
  'hamt-sharded-directory'
]

const dirTypes = [
  'directory',
  'hamt-sharded-directory'
]

const DEFAULT_FILE_MODE = parseInt('0644', 8)
const DEFAULT_DIRECTORY_MODE = parseInt('0755', 8)

/**
 * @param {string | number | undefined} [mode]
 */
function parseMode (mode) {
  if (mode == null) {
    return undefined
  }

  if (typeof mode === 'number') {
    return mode & 0xFFF
  }

  mode = mode.toString()

  if (mode.substring(0, 1) === '0') {
    // octal string
    return parseInt(mode, 8) & 0xFFF
  }

  // decimal string
  return parseInt(mode, 10) & 0xFFF
}

/**
 * @param {any} input
 */
function parseMtime (input) {
  if (input == null) {
    return undefined
  }

  /** @type {Mtime | undefined} */
  let mtime

  // { secs, nsecs }
  if (input.secs != null) {
    mtime = {
      secs: input.secs,
      nsecs: input.nsecs
    }
  }

  // UnixFS TimeSpec
  if (input.Seconds != null) {
    mtime = {
      secs: input.Seconds,
      nsecs: input.FractionalNanoseconds
    }
  }

  // process.hrtime()
  if (Array.isArray(input)) {
    mtime = {
      secs: input[0],
      nsecs: input[1]
    }
  }

  // Javascript Date
  if (input instanceof Date) {
    const ms = input.getTime()
    const secs = Math.floor(ms / 1000)

    mtime = {
      secs: secs,
      nsecs: (ms - (secs * 1000)) * 1000
    }
  }

  /*
  TODO: https://github.com/ipfs/aegir/issues/487

  // process.hrtime.bigint()
  if (input instanceof BigInt) {
    const secs = input / BigInt(1e9)
    const nsecs = input - (secs * BigInt(1e9))

    mtime = {
      secs: parseInt(secs.toString()),
      nsecs: parseInt(nsecs.toString())
    }
  }
  */

  if (!Object.prototype.hasOwnProperty.call(mtime, 'secs')) {
    return undefined
  }

  if (mtime != null && mtime.nsecs != null && (mtime.nsecs < 0 || mtime.nsecs > 999999999)) {
    throw errcode(new Error('mtime-nsecs must be within the range [0,999999999]'), 'ERR_INVALID_MTIME_NSECS')
  }

  return mtime
}

class Data {
  /**
   * Decode from protobuf https://github.com/ipfs/specs/blob/master/UNIXFS.md
   *
   * @param {Uint8Array} marshaled
   */
  static unmarshal (marshaled) {
    const message = PBData.decode(marshaled)
    const decoded = PBData.toObject(message, {
      defaults: false,
      arrays: true,
      longs: Number,
      objects: false
    })

    const data = new Data({
      type: types[decoded.Type],
      data: decoded.Data,
      blockSizes: decoded.blocksizes,
      mode: decoded.mode,
      mtime: decoded.mtime
        ? {
            secs: decoded.mtime.Seconds,
            nsecs: decoded.mtime.FractionalNanoseconds
          }
        : undefined
    })

    // make sure we honour the original mode
    data._originalMode = decoded.mode || 0

    return data
  }

  /**
   * @param {object} [options]
   * @param {string} [options.type='file']
   * @param {Uint8Array} [options.data]
   * @param {number[]} [options.blockSizes]
   * @param {number} [options.hashType]
   * @param {number} [options.fanout]
   * @param {MtimeLike | null} [options.mtime]
   * @param {number | string} [options.mode]
   */
  constructor (options = {
    type: 'file'
  }) {
    const {
      type,
      data,
      blockSizes,
      hashType,
      fanout,
      mtime,
      mode
    } = options

    if (type && !types.includes(type)) {
      throw errcode(new Error('Type: ' + type + ' is not valid'), 'ERR_INVALID_TYPE')
    }

    this.type = type || 'file'
    this.data = data
    this.hashType = hashType
    this.fanout = fanout

    /** @type {number[]} */
    this.blockSizes = blockSizes || []
    this._originalMode = 0
    this.mode = parseMode(mode)

    if (mtime) {
      this.mtime = parseMtime(mtime)

      if (this.mtime && !this.mtime.nsecs) {
        this.mtime.nsecs = 0
      }
    }
  }

  /**
   * @param {number | undefined} mode
   */
  set mode (mode) {
    this._mode = this.isDirectory() ? DEFAULT_DIRECTORY_MODE : DEFAULT_FILE_MODE

    const parsedMode = parseMode(mode)

    if (parsedMode !== undefined) {
      this._mode = parsedMode
    }
  }

  /**
   * @returns {number | undefined}
   */
  get mode () {
    return this._mode
  }

  isDirectory () {
    return Boolean(this.type && dirTypes.includes(this.type))
  }

  /**
   * @param {number} size
   */
  addBlockSize (size) {
    this.blockSizes.push(size)
  }

  /**
   * @param {number} index
   */
  removeBlockSize (index) {
    this.blockSizes.splice(index, 1)
  }

  /**
   * Returns `0` for directories or `data.length + sum(blockSizes)` for everything else
   */
  fileSize () {
    if (this.isDirectory()) {
      // dirs don't have file size
      return 0
    }

    let sum = 0
    this.blockSizes.forEach((size) => {
      sum += size
    })

    if (this.data) {
      sum += this.data.length
    }

    return sum
  }

  /**
   * encode to protobuf Uint8Array
   */
  marshal () {
    let type

    switch (this.type) {
      case 'raw': type = PBData.DataType.Raw; break
      case 'directory': type = PBData.DataType.Directory; break
      case 'file': type = PBData.DataType.File; break
      case 'metadata': type = PBData.DataType.Metadata; break
      case 'symlink': type = PBData.DataType.Symlink; break
      case 'hamt-sharded-directory': type = PBData.DataType.HAMTShard; break
      default:
        throw errcode(new Error('Type: ' + type + ' is not valid'), 'ERR_INVALID_TYPE')
    }

    let data = this.data

    if (!this.data || !this.data.length) {
      data = undefined
    }

    let mode

    if (this.mode != null) {
      mode = (this._originalMode & 0xFFFFF000) | (parseMode(this.mode) || 0)

      if (mode === DEFAULT_FILE_MODE && !this.isDirectory()) {
        mode = undefined
      }

      if (mode === DEFAULT_DIRECTORY_MODE && this.isDirectory()) {
        mode = undefined
      }
    }

    let mtime

    if (this.mtime != null) {
      const parsed = parseMtime(this.mtime)

      if (parsed) {
        mtime = {
          Seconds: parsed.secs,
          FractionalNanoseconds: parsed.nsecs
        }

        if (mtime.FractionalNanoseconds === 0) {
          delete mtime.FractionalNanoseconds
        }
      }
    }

    const pbData = {
      Type: type,
      Data: data,
      filesize: this.isDirectory() ? undefined : this.fileSize(),
      blocksizes: this.blockSizes,
      hashType: this.hashType,
      fanout: this.fanout,
      mode,
      mtime
    }

    return PBData.encode(pbData).finish()
  }
}

module.exports = {
  UnixFS: Data,
  parseMode,
  parseMtime
}


/***/ }),

/***/ 8262:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/*eslint-disable*/


var $protobuf = __nccwpck_require__(6916);

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["ipfs-unixfs"] || ($protobuf.roots["ipfs-unixfs"] = {});

$root.Data = (function() {

    /**
     * Properties of a Data.
     * @exports IData
     * @interface IData
     * @property {Data.DataType} Type Data Type
     * @property {Uint8Array|null} [Data] Data Data
     * @property {number|null} [filesize] Data filesize
     * @property {Array.<number>|null} [blocksizes] Data blocksizes
     * @property {number|null} [hashType] Data hashType
     * @property {number|null} [fanout] Data fanout
     * @property {number|null} [mode] Data mode
     * @property {IUnixTime|null} [mtime] Data mtime
     */

    /**
     * Constructs a new Data.
     * @exports Data
     * @classdesc Represents a Data.
     * @implements IData
     * @constructor
     * @param {IData=} [p] Properties to set
     */
    function Data(p) {
        this.blocksizes = [];
        if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                if (p[ks[i]] != null)
                    this[ks[i]] = p[ks[i]];
    }

    /**
     * Data Type.
     * @member {Data.DataType} Type
     * @memberof Data
     * @instance
     */
    Data.prototype.Type = 0;

    /**
     * Data Data.
     * @member {Uint8Array} Data
     * @memberof Data
     * @instance
     */
    Data.prototype.Data = $util.newBuffer([]);

    /**
     * Data filesize.
     * @member {number} filesize
     * @memberof Data
     * @instance
     */
    Data.prototype.filesize = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Data blocksizes.
     * @member {Array.<number>} blocksizes
     * @memberof Data
     * @instance
     */
    Data.prototype.blocksizes = $util.emptyArray;

    /**
     * Data hashType.
     * @member {number} hashType
     * @memberof Data
     * @instance
     */
    Data.prototype.hashType = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Data fanout.
     * @member {number} fanout
     * @memberof Data
     * @instance
     */
    Data.prototype.fanout = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Data mode.
     * @member {number} mode
     * @memberof Data
     * @instance
     */
    Data.prototype.mode = 0;

    /**
     * Data mtime.
     * @member {IUnixTime|null|undefined} mtime
     * @memberof Data
     * @instance
     */
    Data.prototype.mtime = null;

    /**
     * Encodes the specified Data message. Does not implicitly {@link Data.verify|verify} messages.
     * @function encode
     * @memberof Data
     * @static
     * @param {IData} m Data message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Data.encode = function encode(m, w) {
        if (!w)
            w = $Writer.create();
        w.uint32(8).int32(m.Type);
        if (m.Data != null && Object.hasOwnProperty.call(m, "Data"))
            w.uint32(18).bytes(m.Data);
        if (m.filesize != null && Object.hasOwnProperty.call(m, "filesize"))
            w.uint32(24).uint64(m.filesize);
        if (m.blocksizes != null && m.blocksizes.length) {
            for (var i = 0; i < m.blocksizes.length; ++i)
                w.uint32(32).uint64(m.blocksizes[i]);
        }
        if (m.hashType != null && Object.hasOwnProperty.call(m, "hashType"))
            w.uint32(40).uint64(m.hashType);
        if (m.fanout != null && Object.hasOwnProperty.call(m, "fanout"))
            w.uint32(48).uint64(m.fanout);
        if (m.mode != null && Object.hasOwnProperty.call(m, "mode"))
            w.uint32(56).uint32(m.mode);
        if (m.mtime != null && Object.hasOwnProperty.call(m, "mtime"))
            $root.UnixTime.encode(m.mtime, w.uint32(66).fork()).ldelim();
        return w;
    };

    /**
     * Decodes a Data message from the specified reader or buffer.
     * @function decode
     * @memberof Data
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {Data} Data
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Data.decode = function decode(r, l) {
        if (!(r instanceof $Reader))
            r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l, m = new $root.Data();
        while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
            case 1:
                m.Type = r.int32();
                break;
            case 2:
                m.Data = r.bytes();
                break;
            case 3:
                m.filesize = r.uint64();
                break;
            case 4:
                if (!(m.blocksizes && m.blocksizes.length))
                    m.blocksizes = [];
                if ((t & 7) === 2) {
                    var c2 = r.uint32() + r.pos;
                    while (r.pos < c2)
                        m.blocksizes.push(r.uint64());
                } else
                    m.blocksizes.push(r.uint64());
                break;
            case 5:
                m.hashType = r.uint64();
                break;
            case 6:
                m.fanout = r.uint64();
                break;
            case 7:
                m.mode = r.uint32();
                break;
            case 8:
                m.mtime = $root.UnixTime.decode(r, r.uint32());
                break;
            default:
                r.skipType(t & 7);
                break;
            }
        }
        if (!m.hasOwnProperty("Type"))
            throw $util.ProtocolError("missing required 'Type'", { instance: m });
        return m;
    };

    /**
     * Creates a Data message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Data
     * @static
     * @param {Object.<string,*>} d Plain object
     * @returns {Data} Data
     */
    Data.fromObject = function fromObject(d) {
        if (d instanceof $root.Data)
            return d;
        var m = new $root.Data();
        switch (d.Type) {
        case "Raw":
        case 0:
            m.Type = 0;
            break;
        case "Directory":
        case 1:
            m.Type = 1;
            break;
        case "File":
        case 2:
            m.Type = 2;
            break;
        case "Metadata":
        case 3:
            m.Type = 3;
            break;
        case "Symlink":
        case 4:
            m.Type = 4;
            break;
        case "HAMTShard":
        case 5:
            m.Type = 5;
            break;
        }
        if (d.Data != null) {
            if (typeof d.Data === "string")
                $util.base64.decode(d.Data, m.Data = $util.newBuffer($util.base64.length(d.Data)), 0);
            else if (d.Data.length)
                m.Data = d.Data;
        }
        if (d.filesize != null) {
            if ($util.Long)
                (m.filesize = $util.Long.fromValue(d.filesize)).unsigned = true;
            else if (typeof d.filesize === "string")
                m.filesize = parseInt(d.filesize, 10);
            else if (typeof d.filesize === "number")
                m.filesize = d.filesize;
            else if (typeof d.filesize === "object")
                m.filesize = new $util.LongBits(d.filesize.low >>> 0, d.filesize.high >>> 0).toNumber(true);
        }
        if (d.blocksizes) {
            if (!Array.isArray(d.blocksizes))
                throw TypeError(".Data.blocksizes: array expected");
            m.blocksizes = [];
            for (var i = 0; i < d.blocksizes.length; ++i) {
                if ($util.Long)
                    (m.blocksizes[i] = $util.Long.fromValue(d.blocksizes[i])).unsigned = true;
                else if (typeof d.blocksizes[i] === "string")
                    m.blocksizes[i] = parseInt(d.blocksizes[i], 10);
                else if (typeof d.blocksizes[i] === "number")
                    m.blocksizes[i] = d.blocksizes[i];
                else if (typeof d.blocksizes[i] === "object")
                    m.blocksizes[i] = new $util.LongBits(d.blocksizes[i].low >>> 0, d.blocksizes[i].high >>> 0).toNumber(true);
            }
        }
        if (d.hashType != null) {
            if ($util.Long)
                (m.hashType = $util.Long.fromValue(d.hashType)).unsigned = true;
            else if (typeof d.hashType === "string")
                m.hashType = parseInt(d.hashType, 10);
            else if (typeof d.hashType === "number")
                m.hashType = d.hashType;
            else if (typeof d.hashType === "object")
                m.hashType = new $util.LongBits(d.hashType.low >>> 0, d.hashType.high >>> 0).toNumber(true);
        }
        if (d.fanout != null) {
            if ($util.Long)
                (m.fanout = $util.Long.fromValue(d.fanout)).unsigned = true;
            else if (typeof d.fanout === "string")
                m.fanout = parseInt(d.fanout, 10);
            else if (typeof d.fanout === "number")
                m.fanout = d.fanout;
            else if (typeof d.fanout === "object")
                m.fanout = new $util.LongBits(d.fanout.low >>> 0, d.fanout.high >>> 0).toNumber(true);
        }
        if (d.mode != null) {
            m.mode = d.mode >>> 0;
        }
        if (d.mtime != null) {
            if (typeof d.mtime !== "object")
                throw TypeError(".Data.mtime: object expected");
            m.mtime = $root.UnixTime.fromObject(d.mtime);
        }
        return m;
    };

    /**
     * Creates a plain object from a Data message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Data
     * @static
     * @param {Data} m Data
     * @param {$protobuf.IConversionOptions} [o] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Data.toObject = function toObject(m, o) {
        if (!o)
            o = {};
        var d = {};
        if (o.arrays || o.defaults) {
            d.blocksizes = [];
        }
        if (o.defaults) {
            d.Type = o.enums === String ? "Raw" : 0;
            if (o.bytes === String)
                d.Data = "";
            else {
                d.Data = [];
                if (o.bytes !== Array)
                    d.Data = $util.newBuffer(d.Data);
            }
            if ($util.Long) {
                var n = new $util.Long(0, 0, true);
                d.filesize = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
            } else
                d.filesize = o.longs === String ? "0" : 0;
            if ($util.Long) {
                var n = new $util.Long(0, 0, true);
                d.hashType = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
            } else
                d.hashType = o.longs === String ? "0" : 0;
            if ($util.Long) {
                var n = new $util.Long(0, 0, true);
                d.fanout = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
            } else
                d.fanout = o.longs === String ? "0" : 0;
            d.mode = 0;
            d.mtime = null;
        }
        if (m.Type != null && m.hasOwnProperty("Type")) {
            d.Type = o.enums === String ? $root.Data.DataType[m.Type] : m.Type;
        }
        if (m.Data != null && m.hasOwnProperty("Data")) {
            d.Data = o.bytes === String ? $util.base64.encode(m.Data, 0, m.Data.length) : o.bytes === Array ? Array.prototype.slice.call(m.Data) : m.Data;
        }
        if (m.filesize != null && m.hasOwnProperty("filesize")) {
            if (typeof m.filesize === "number")
                d.filesize = o.longs === String ? String(m.filesize) : m.filesize;
            else
                d.filesize = o.longs === String ? $util.Long.prototype.toString.call(m.filesize) : o.longs === Number ? new $util.LongBits(m.filesize.low >>> 0, m.filesize.high >>> 0).toNumber(true) : m.filesize;
        }
        if (m.blocksizes && m.blocksizes.length) {
            d.blocksizes = [];
            for (var j = 0; j < m.blocksizes.length; ++j) {
                if (typeof m.blocksizes[j] === "number")
                    d.blocksizes[j] = o.longs === String ? String(m.blocksizes[j]) : m.blocksizes[j];
                else
                    d.blocksizes[j] = o.longs === String ? $util.Long.prototype.toString.call(m.blocksizes[j]) : o.longs === Number ? new $util.LongBits(m.blocksizes[j].low >>> 0, m.blocksizes[j].high >>> 0).toNumber(true) : m.blocksizes[j];
            }
        }
        if (m.hashType != null && m.hasOwnProperty("hashType")) {
            if (typeof m.hashType === "number")
                d.hashType = o.longs === String ? String(m.hashType) : m.hashType;
            else
                d.hashType = o.longs === String ? $util.Long.prototype.toString.call(m.hashType) : o.longs === Number ? new $util.LongBits(m.hashType.low >>> 0, m.hashType.high >>> 0).toNumber(true) : m.hashType;
        }
        if (m.fanout != null && m.hasOwnProperty("fanout")) {
            if (typeof m.fanout === "number")
                d.fanout = o.longs === String ? String(m.fanout) : m.fanout;
            else
                d.fanout = o.longs === String ? $util.Long.prototype.toString.call(m.fanout) : o.longs === Number ? new $util.LongBits(m.fanout.low >>> 0, m.fanout.high >>> 0).toNumber(true) : m.fanout;
        }
        if (m.mode != null && m.hasOwnProperty("mode")) {
            d.mode = m.mode;
        }
        if (m.mtime != null && m.hasOwnProperty("mtime")) {
            d.mtime = $root.UnixTime.toObject(m.mtime, o);
        }
        return d;
    };

    /**
     * Converts this Data to JSON.
     * @function toJSON
     * @memberof Data
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Data.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * DataType enum.
     * @name Data.DataType
     * @enum {number}
     * @property {number} Raw=0 Raw value
     * @property {number} Directory=1 Directory value
     * @property {number} File=2 File value
     * @property {number} Metadata=3 Metadata value
     * @property {number} Symlink=4 Symlink value
     * @property {number} HAMTShard=5 HAMTShard value
     */
    Data.DataType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "Raw"] = 0;
        values[valuesById[1] = "Directory"] = 1;
        values[valuesById[2] = "File"] = 2;
        values[valuesById[3] = "Metadata"] = 3;
        values[valuesById[4] = "Symlink"] = 4;
        values[valuesById[5] = "HAMTShard"] = 5;
        return values;
    })();

    return Data;
})();

$root.UnixTime = (function() {

    /**
     * Properties of an UnixTime.
     * @exports IUnixTime
     * @interface IUnixTime
     * @property {number} Seconds UnixTime Seconds
     * @property {number|null} [FractionalNanoseconds] UnixTime FractionalNanoseconds
     */

    /**
     * Constructs a new UnixTime.
     * @exports UnixTime
     * @classdesc Represents an UnixTime.
     * @implements IUnixTime
     * @constructor
     * @param {IUnixTime=} [p] Properties to set
     */
    function UnixTime(p) {
        if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                if (p[ks[i]] != null)
                    this[ks[i]] = p[ks[i]];
    }

    /**
     * UnixTime Seconds.
     * @member {number} Seconds
     * @memberof UnixTime
     * @instance
     */
    UnixTime.prototype.Seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * UnixTime FractionalNanoseconds.
     * @member {number} FractionalNanoseconds
     * @memberof UnixTime
     * @instance
     */
    UnixTime.prototype.FractionalNanoseconds = 0;

    /**
     * Encodes the specified UnixTime message. Does not implicitly {@link UnixTime.verify|verify} messages.
     * @function encode
     * @memberof UnixTime
     * @static
     * @param {IUnixTime} m UnixTime message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UnixTime.encode = function encode(m, w) {
        if (!w)
            w = $Writer.create();
        w.uint32(8).int64(m.Seconds);
        if (m.FractionalNanoseconds != null && Object.hasOwnProperty.call(m, "FractionalNanoseconds"))
            w.uint32(21).fixed32(m.FractionalNanoseconds);
        return w;
    };

    /**
     * Decodes an UnixTime message from the specified reader or buffer.
     * @function decode
     * @memberof UnixTime
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {UnixTime} UnixTime
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UnixTime.decode = function decode(r, l) {
        if (!(r instanceof $Reader))
            r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l, m = new $root.UnixTime();
        while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
            case 1:
                m.Seconds = r.int64();
                break;
            case 2:
                m.FractionalNanoseconds = r.fixed32();
                break;
            default:
                r.skipType(t & 7);
                break;
            }
        }
        if (!m.hasOwnProperty("Seconds"))
            throw $util.ProtocolError("missing required 'Seconds'", { instance: m });
        return m;
    };

    /**
     * Creates an UnixTime message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof UnixTime
     * @static
     * @param {Object.<string,*>} d Plain object
     * @returns {UnixTime} UnixTime
     */
    UnixTime.fromObject = function fromObject(d) {
        if (d instanceof $root.UnixTime)
            return d;
        var m = new $root.UnixTime();
        if (d.Seconds != null) {
            if ($util.Long)
                (m.Seconds = $util.Long.fromValue(d.Seconds)).unsigned = false;
            else if (typeof d.Seconds === "string")
                m.Seconds = parseInt(d.Seconds, 10);
            else if (typeof d.Seconds === "number")
                m.Seconds = d.Seconds;
            else if (typeof d.Seconds === "object")
                m.Seconds = new $util.LongBits(d.Seconds.low >>> 0, d.Seconds.high >>> 0).toNumber();
        }
        if (d.FractionalNanoseconds != null) {
            m.FractionalNanoseconds = d.FractionalNanoseconds >>> 0;
        }
        return m;
    };

    /**
     * Creates a plain object from an UnixTime message. Also converts values to other types if specified.
     * @function toObject
     * @memberof UnixTime
     * @static
     * @param {UnixTime} m UnixTime
     * @param {$protobuf.IConversionOptions} [o] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    UnixTime.toObject = function toObject(m, o) {
        if (!o)
            o = {};
        var d = {};
        if (o.defaults) {
            if ($util.Long) {
                var n = new $util.Long(0, 0, false);
                d.Seconds = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
            } else
                d.Seconds = o.longs === String ? "0" : 0;
            d.FractionalNanoseconds = 0;
        }
        if (m.Seconds != null && m.hasOwnProperty("Seconds")) {
            if (typeof m.Seconds === "number")
                d.Seconds = o.longs === String ? String(m.Seconds) : m.Seconds;
            else
                d.Seconds = o.longs === String ? $util.Long.prototype.toString.call(m.Seconds) : o.longs === Number ? new $util.LongBits(m.Seconds.low >>> 0, m.Seconds.high >>> 0).toNumber() : m.Seconds;
        }
        if (m.FractionalNanoseconds != null && m.hasOwnProperty("FractionalNanoseconds")) {
            d.FractionalNanoseconds = m.FractionalNanoseconds;
        }
        return d;
    };

    /**
     * Converts this UnixTime to JSON.
     * @function toJSON
     * @memberof UnixTime
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    UnixTime.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return UnixTime;
})();

$root.Metadata = (function() {

    /**
     * Properties of a Metadata.
     * @exports IMetadata
     * @interface IMetadata
     * @property {string|null} [MimeType] Metadata MimeType
     */

    /**
     * Constructs a new Metadata.
     * @exports Metadata
     * @classdesc Represents a Metadata.
     * @implements IMetadata
     * @constructor
     * @param {IMetadata=} [p] Properties to set
     */
    function Metadata(p) {
        if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                if (p[ks[i]] != null)
                    this[ks[i]] = p[ks[i]];
    }

    /**
     * Metadata MimeType.
     * @member {string} MimeType
     * @memberof Metadata
     * @instance
     */
    Metadata.prototype.MimeType = "";

    /**
     * Encodes the specified Metadata message. Does not implicitly {@link Metadata.verify|verify} messages.
     * @function encode
     * @memberof Metadata
     * @static
     * @param {IMetadata} m Metadata message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Metadata.encode = function encode(m, w) {
        if (!w)
            w = $Writer.create();
        if (m.MimeType != null && Object.hasOwnProperty.call(m, "MimeType"))
            w.uint32(10).string(m.MimeType);
        return w;
    };

    /**
     * Decodes a Metadata message from the specified reader or buffer.
     * @function decode
     * @memberof Metadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {Metadata} Metadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Metadata.decode = function decode(r, l) {
        if (!(r instanceof $Reader))
            r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l, m = new $root.Metadata();
        while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
            case 1:
                m.MimeType = r.string();
                break;
            default:
                r.skipType(t & 7);
                break;
            }
        }
        return m;
    };

    /**
     * Creates a Metadata message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Metadata
     * @static
     * @param {Object.<string,*>} d Plain object
     * @returns {Metadata} Metadata
     */
    Metadata.fromObject = function fromObject(d) {
        if (d instanceof $root.Metadata)
            return d;
        var m = new $root.Metadata();
        if (d.MimeType != null) {
            m.MimeType = String(d.MimeType);
        }
        return m;
    };

    /**
     * Creates a plain object from a Metadata message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Metadata
     * @static
     * @param {Metadata} m Metadata
     * @param {$protobuf.IConversionOptions} [o] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Metadata.toObject = function toObject(m, o) {
        if (!o)
            o = {};
        var d = {};
        if (o.defaults) {
            d.MimeType = "";
        }
        if (m.MimeType != null && m.hasOwnProperty("MimeType")) {
            d.MimeType = m.MimeType;
        }
        return d;
    };

    /**
     * Converts this Metadata to JSON.
     * @function toJSON
     * @memberof Metadata
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Metadata.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Metadata;
})();

module.exports = $root;


/***/ }),

/***/ 9437:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


// @ts-ignore
const BufferList = __nccwpck_require__(8386)

/**
 * @type {import('../types').Chunker}
 */
module.exports = async function * fixedSizeChunker (source, options) {
  let bl = new BufferList()
  let currentLength = 0
  let emitted = false
  const maxChunkSize = options.maxChunkSize

  for await (const buffer of source) {
    bl.append(buffer)

    currentLength += buffer.length

    while (currentLength >= maxChunkSize) {
      yield bl.slice(0, maxChunkSize)
      emitted = true

      // throw away consumed bytes
      if (maxChunkSize === bl.length) {
        bl = new BufferList()
        currentLength = 0
      } else {
        const newBl = new BufferList()
        newBl.append(bl.shallowSlice(maxChunkSize))
        bl = newBl

        // update our offset
        currentLength -= maxChunkSize
      }
    }
  }

  if (!emitted || currentLength) {
    // return any remaining bytes or an empty buffer
    yield bl.slice(0, currentLength)
  }
}


/***/ }),

/***/ 7434:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


// @ts-ignore
const BufferList = __nccwpck_require__(8386)
// @ts-ignore
const { create } = __nccwpck_require__(1715)
const errcode = __nccwpck_require__(2997)

/**
 * @typedef {object} RabinOptions
 * @property {number} min
 * @property {number} max
 * @property {number} bits
 * @property {number} window
 * @property {number} polynomial
 */

/**
 * @type {import('../types').Chunker}
 */
module.exports = async function * rabinChunker (source, options) {
  let min, max, avg

  if (options.minChunkSize && options.maxChunkSize && options.avgChunkSize) {
    avg = options.avgChunkSize
    min = options.minChunkSize
    max = options.maxChunkSize
  } else if (!options.avgChunkSize) {
    throw errcode(new Error('please specify an average chunk size'), 'ERR_INVALID_AVG_CHUNK_SIZE')
  } else {
    avg = options.avgChunkSize
    min = avg / 3
    max = avg + (avg / 2)
  }

  // validate min/max/avg in the same way as go
  if (min < 16) {
    throw errcode(new Error('rabin min must be greater than 16'), 'ERR_INVALID_MIN_CHUNK_SIZE')
  }

  if (max < min) {
    max = min
  }

  if (avg < min) {
    avg = min
  }

  const sizepow = Math.floor(Math.log2(avg))

  for await (const chunk of rabin(source, {
    min: min,
    max: max,
    bits: sizepow,
    window: options.window,
    polynomial: options.polynomial
  })) {
    yield chunk
  }
}

/**
 * @param {AsyncIterable<Uint8Array>} source
 * @param {RabinOptions} options
 */
async function * rabin (source, options) {
  const r = await create(options.bits, options.min, options.max, options.window)
  const buffers = new BufferList()

  for await (const chunk of source) {
    buffers.append(chunk)

    const sizes = r.fingerprint(chunk)

    for (let i = 0; i < sizes.length; i++) {
      const size = sizes[i]
      const buf = buffers.slice(0, size)
      buffers.consume(size)

      yield buf
    }
  }

  if (buffers.length) {
    yield buffers.slice(0)
  }
}


/***/ }),

/***/ 5849:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const { UnixFS } = __nccwpck_require__(4171)
const persist = __nccwpck_require__(8567)
const { encode, prepare } = __nccwpck_require__(8012)

/**
 * @typedef {import('../types').Directory} Directory
 */

/**
 * @type {import('../types').UnixFSV1DagBuilder<Directory>}
 */
const dirBuilder = async (item, blockstore, options) => {
  const unixfs = new UnixFS({
    type: 'directory',
    mtime: item.mtime,
    mode: item.mode
  })

  const buffer = encode(prepare({ Data: unixfs.marshal() }))
  const cid = await persist(buffer, blockstore, options)
  const path = item.path

  return {
    cid,
    path,
    unixfs,
    size: buffer.length
  }
}

module.exports = dirBuilder


/***/ }),

/***/ 6024:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const batch = __nccwpck_require__(3454)

/**
 * @typedef {import('../../types').FileDAGBuilder} FileDAGBuilder
 */

/**
 * @type {FileDAGBuilder}
 */
function balanced (source, reduce, options) {
  return reduceToParents(source, reduce, options)
}

/**
 * @type {FileDAGBuilder}
 */
async function reduceToParents (source, reduce, options) {
  const roots = []

  for await (const chunked of batch(source, options.maxChildrenPerNode)) {
    roots.push(await reduce(chunked))
  }

  if (roots.length > 1) {
    return reduceToParents(roots, reduce, options)
  }

  return roots[0]
}

module.exports = balanced


/***/ }),

/***/ 3794:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const { UnixFS } = __nccwpck_require__(4171)
const persist = __nccwpck_require__(8567)
const dagPb = __nccwpck_require__(8012)
const raw = __nccwpck_require__(2048)

/**
 * @typedef {import('../../types').BufferImporter} BufferImporter
 */

/**
 * @type {BufferImporter}
 */
async function * bufferImporter (file, block, options) {
  for await (let buffer of file.content) {
    yield async () => {
      options.progress(buffer.length, file.path)
      let unixfs

      /** @type {import('../../types').PersistOptions} */
      const opts = {
        codec: dagPb,
        cidVersion: options.cidVersion,
        hasher: options.hasher,
        onlyHash: options.onlyHash
      }

      if (options.rawLeaves) {
        opts.codec = raw
        opts.cidVersion = 1
      } else {
        unixfs = new UnixFS({
          type: options.leafType,
          data: buffer,
          mtime: file.mtime,
          mode: file.mode
        })

        buffer = dagPb.encode({
          Data: unixfs.marshal(),
          Links: []
        })
      }

      return {
        cid: await persist(buffer, block, opts),
        unixfs,
        size: buffer.length
      }
    }
  }
}

module.exports = bufferImporter


/***/ }),

/***/ 5915:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const all = __nccwpck_require__(5810)

/**
 * @type {import('../../types').FileDAGBuilder}
 */
module.exports = async function (source, reduce) {
  return reduce(await all(source))
}


/***/ }),

/***/ 1347:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const errCode = __nccwpck_require__(2997)
const { UnixFS } = __nccwpck_require__(4171)
const persist = __nccwpck_require__(8567)
const { encode, prepare } = __nccwpck_require__(8012)
const parallelBatch = __nccwpck_require__(6615)
const rawCodec = __nccwpck_require__(2048)
const dagPb = __nccwpck_require__(8012)

/**
 * @typedef {import('interface-blockstore').Blockstore} Blockstore
 * @typedef {import('../../types').File} File
 * @typedef {import('../../types').ImporterOptions} ImporterOptions
 * @typedef {import('../../types').Reducer} Reducer
 * @typedef {import('../../types').DAGBuilder} DAGBuilder
 * @typedef {import('../../types').FileDAGBuilder} FileDAGBuilder
 */

/**
 * @type {{ [key: string]: FileDAGBuilder}}
 */
const dagBuilders = {
  flat: __nccwpck_require__(5915),
  balanced: __nccwpck_require__(6024),
  trickle: __nccwpck_require__(8468)
}

/**
 * @param {File} file
 * @param {Blockstore} blockstore
 * @param {ImporterOptions} options
 */
async function * buildFileBatch (file, blockstore, options) {
  let count = -1
  let previous
  let bufferImporter

  if (typeof options.bufferImporter === 'function') {
    bufferImporter = options.bufferImporter
  } else {
    bufferImporter = __nccwpck_require__(3794)
  }

  for await (const entry of parallelBatch(bufferImporter(file, blockstore, options), options.blockWriteConcurrency)) {
    count++

    if (count === 0) {
      previous = entry
      continue
    } else if (count === 1 && previous) {
      yield previous
      previous = null
    }

    yield entry
  }

  if (previous) {
    previous.single = true
    yield previous
  }
}

/**
 * @param {File} file
 * @param {Blockstore} blockstore
 * @param {ImporterOptions} options
 */
const reduce = (file, blockstore, options) => {
  /**
   * @type {Reducer}
   */
  async function reducer (leaves) {
    if (leaves.length === 1 && leaves[0].single && options.reduceSingleLeafToSelf) {
      const leaf = leaves[0]

      if (leaf.cid.code === rawCodec.code && (file.mtime !== undefined || file.mode !== undefined)) {
        // only one leaf node which is a buffer - we have metadata so convert it into a
        // UnixFS entry otherwise we'll have nowhere to store the metadata
        let buffer = await blockstore.get(leaf.cid)

        leaf.unixfs = new UnixFS({
          type: 'file',
          mtime: file.mtime,
          mode: file.mode,
          data: buffer
        })

        buffer = encode(prepare({ Data: leaf.unixfs.marshal() }))

        // // TODO vmx 2021-03-26: This is what the original code does, it checks
        // // the multihash of the original leaf node and uses then the same
        // // hasher. i wonder if that's really needed or if we could just use
        // // the hasher from `options.hasher` instead.
        // const multihash = mh.decode(leaf.cid.multihash.bytes)
        // let hasher
        // switch multihash {
        //   case sha256.code {
        //     hasher = sha256
        //     break;
        //   }
        //   //case identity.code {
        //   //  hasher = identity
        //   //  break;
        //   //}
        //   default: {
        //     throw new Error(`Unsupported hasher "${multihash}"`)
        //   }
        // }
        leaf.cid = await persist(buffer, blockstore, {
          ...options,
          codec: dagPb,
          hasher: options.hasher,
          cidVersion: options.cidVersion
        })
        leaf.size = buffer.length
      }

      return {
        cid: leaf.cid,
        path: file.path,
        unixfs: leaf.unixfs,
        size: leaf.size
      }
    }

    // create a parent node and add all the leaves
    const f = new UnixFS({
      type: 'file',
      mtime: file.mtime,
      mode: file.mode
    })

    const links = leaves
      .filter(leaf => {
        if (leaf.cid.code === rawCodec.code && leaf.size) {
          return true
        }

        if (leaf.unixfs && !leaf.unixfs.data && leaf.unixfs.fileSize()) {
          return true
        }

        return Boolean(leaf.unixfs && leaf.unixfs.data && leaf.unixfs.data.length)
      })
      .map((leaf) => {
        if (leaf.cid.code === rawCodec.code) {
          // node is a leaf buffer
          f.addBlockSize(leaf.size)

          return {
            Name: '',
            Tsize: leaf.size,
            Hash: leaf.cid
          }
        }

        if (!leaf.unixfs || !leaf.unixfs.data) {
          // node is an intermediate node
          f.addBlockSize((leaf.unixfs && leaf.unixfs.fileSize()) || 0)
        } else {
          // node is a unixfs 'file' leaf node
          f.addBlockSize(leaf.unixfs.data.length)
        }

        return {
          Name: '',
          Tsize: leaf.size,
          Hash: leaf.cid
        }
      })

    const node = {
      Data: f.marshal(),
      Links: links
    }
    const buffer = encode(prepare(node))
    const cid = await persist(buffer, blockstore, options)

    return {
      cid,
      path: file.path,
      unixfs: f,
      size: buffer.length + node.Links.reduce((acc, curr) => acc + curr.Tsize, 0)
    }
  }

  return reducer
}

/**
 * @type {import('../../types').UnixFSV1DagBuilder<File>}
 */
function fileBuilder (file, block, options) {
  const dagBuilder = dagBuilders[options.strategy]

  if (!dagBuilder) {
    throw errCode(new Error(`Unknown importer build strategy name: ${options.strategy}`), 'ERR_BAD_STRATEGY')
  }

  return dagBuilder(buildFileBatch(file, block, options), reduce(file, block, options), options)
}

module.exports = fileBuilder


/***/ }),

/***/ 8468:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const batch = __nccwpck_require__(3454)

/**
 * @typedef {import('ipfs-unixfs').UnixFS} UnixFS
 * @typedef {import('../../types').ImporterOptions} ImporterOptions
 * @typedef {import('../../types').InProgressImportResult} InProgressImportResult
 * @typedef {import('../../types').TrickleDagNode} TrickleDagNode
 * @typedef {import('../../types').Reducer} Reducer
 * @typedef {import('../../types').FileDAGBuilder} FileDAGBuilder
 */

/**
 * @type {FileDAGBuilder}
 */
module.exports = async function trickleStream (source, reduce, options) {
  const root = new Root(options.layerRepeat)
  let iteration = 0
  let maxDepth = 1

  /** @type {SubTree} */
  let subTree = root

  for await (const layer of batch(source, options.maxChildrenPerNode)) {
    if (subTree.isFull()) {
      if (subTree !== root) {
        root.addChild(await subTree.reduce(reduce))
      }

      if (iteration && iteration % options.layerRepeat === 0) {
        maxDepth++
      }

      subTree = new SubTree(maxDepth, options.layerRepeat, iteration)

      iteration++
    }

    subTree.append(layer)
  }

  if (subTree && subTree !== root) {
    root.addChild(await subTree.reduce(reduce))
  }

  return root.reduce(reduce)
}

class SubTree {
  /**
   * @param {number} maxDepth
   * @param {number} layerRepeat
   * @param {number} [iteration=0]
   */
  constructor (maxDepth, layerRepeat, iteration = 0) {
    this.maxDepth = maxDepth
    this.layerRepeat = layerRepeat
    this.currentDepth = 1
    this.iteration = iteration

    /** @type {TrickleDagNode} */
    this.root = this.node = this.parent = {
      children: [],
      depth: this.currentDepth,
      maxDepth,
      maxChildren: (this.maxDepth - this.currentDepth) * this.layerRepeat
    }
  }

  isFull () {
    if (!this.root.data) {
      return false
    }

    if (this.currentDepth < this.maxDepth && this.node.maxChildren) {
      // can descend
      this._addNextNodeToParent(this.node)

      return false
    }

    // try to find new node from node.parent
    const distantRelative = this._findParent(this.node, this.currentDepth)

    if (distantRelative) {
      this._addNextNodeToParent(distantRelative)

      return false
    }

    return true
  }

  /**
   * @param {TrickleDagNode} parent
   */
  _addNextNodeToParent (parent) {
    this.parent = parent

    // find site for new node
    const nextNode = {
      children: [],
      depth: parent.depth + 1,
      parent,
      maxDepth: this.maxDepth,
      maxChildren: Math.floor(parent.children.length / this.layerRepeat) * this.layerRepeat
    }

    // @ts-ignore
    parent.children.push(nextNode)

    this.currentDepth = nextNode.depth
    this.node = nextNode
  }

  /**
   *
   * @param {InProgressImportResult[]} layer
   */
  append (layer) {
    this.node.data = layer
  }

  /**
   * @param {Reducer} reduce
   */
  reduce (reduce) {
    return this._reduce(this.root, reduce)
  }

  /**
   * @param {TrickleDagNode} node
   * @param {Reducer} reduce
   * @returns {Promise<InProgressImportResult>}
   */
  async _reduce (node, reduce) {
    /** @type {InProgressImportResult[]} */
    let children = []

    if (node.children.length) {
      children = await Promise.all(
        node.children
          // @ts-ignore
          .filter(child => child.data)
          // @ts-ignore
          .map(child => this._reduce(child, reduce))
      )
    }

    return reduce((node.data || []).concat(children))
  }

  /**
   * @param {TrickleDagNode} node
   * @param {number} depth
   * @returns {TrickleDagNode | undefined}
   */
  _findParent (node, depth) {
    const parent = node.parent

    if (!parent || parent.depth === 0) {
      return
    }

    if (parent.children.length === parent.maxChildren || !parent.maxChildren) {
      // this layer is full, may be able to traverse to a different branch
      return this._findParent(parent, depth)
    }

    return parent
  }
}

class Root extends SubTree {
  /**
   * @param {number} layerRepeat
   */
  constructor (layerRepeat) {
    super(0, layerRepeat)

    this.root.depth = 0
    this.currentDepth = 1
  }

  /**
   * @param {InProgressImportResult} child
   */
  addChild (child) {
    this.root.children.push(child)
  }

  /**
   * @param {Reducer} reduce
   */
  reduce (reduce) {
    return reduce((this.root.data || []).concat(this.root.children))
  }
}


/***/ }),

/***/ 5475:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const dirBuilder = __nccwpck_require__(5849)
const fileBuilder = __nccwpck_require__(1347)
const errCode = __nccwpck_require__(2997)

/**
 * @typedef {import('../types').File} File
 * @typedef {import('../types').Directory} Directory
 * @typedef {import('../types').DAGBuilder} DAGBuilder
 * @typedef {import('../types').Chunker} Chunker
 * @typedef {import('../types').ChunkValidator} ChunkValidator
 */

/**
 * @param {any} thing
 * @returns {thing is Iterable<any>}
 */
function isIterable (thing) {
  return Symbol.iterator in thing
}

/**
 * @param {any} thing
 * @returns {thing is AsyncIterable<any>}
 */
function isAsyncIterable (thing) {
  return Symbol.asyncIterator in thing
}

/**
 * @param {Uint8Array | AsyncIterable<Uint8Array> | Iterable<Uint8Array>} content
 * @returns {AsyncIterable<Uint8Array>}
 */
function contentAsAsyncIterable (content) {
  try {
    if (content instanceof Uint8Array) {
      return (async function * () {
        yield content
      }())
    } else if (isIterable(content)) {
      return (async function * () {
        yield * content
      }())
    } else if (isAsyncIterable(content)) {
      return content
    }
  } catch {
    throw errCode(new Error('Content was invalid'), 'ERR_INVALID_CONTENT')
  }

  throw errCode(new Error('Content was invalid'), 'ERR_INVALID_CONTENT')
}

/**
 * @type {DAGBuilder}
 */
async function * dagBuilder (source, blockstore, options) {
  for await (const entry of source) {
    if (entry.path) {
      if (entry.path.substring(0, 2) === './') {
        options.wrapWithDirectory = true
      }

      entry.path = entry.path
        .split('/')
        .filter(path => path && path !== '.')
        .join('/')
    }

    if (entry.content) {
      /**
       * @type {Chunker}
       */
      let chunker

      if (typeof options.chunker === 'function') {
        chunker = options.chunker
      } else if (options.chunker === 'rabin') {
        chunker = __nccwpck_require__(7434)
      } else {
        chunker = __nccwpck_require__(9437)
      }

      /**
       * @type {ChunkValidator}
       */
      let chunkValidator

      if (typeof options.chunkValidator === 'function') {
        chunkValidator = options.chunkValidator
      } else {
        chunkValidator = __nccwpck_require__(9185)
      }

      /** @type {File} */
      const file = {
        path: entry.path,
        mtime: entry.mtime,
        mode: entry.mode,
        content: chunker(chunkValidator(contentAsAsyncIterable(entry.content), options), options)
      }

      yield () => fileBuilder(file, blockstore, options)
    } else if (entry.path) {
      /** @type {Directory} */
      const dir = {
        path: entry.path,
        mtime: entry.mtime,
        mode: entry.mode
      }

      yield () => dirBuilder(dir, blockstore, options)
    } else {
      throw new Error('Import candidate must have content or path or both')
    }
  }
}

module.exports = dagBuilder


/***/ }),

/***/ 9185:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const errCode = __nccwpck_require__(2997)
const uint8ArrayFromString = __nccwpck_require__(828)

/**
 * @typedef {import('../types').ChunkValidator} ChunkValidator
 */

/**
 * @type {ChunkValidator}
 */
async function * validateChunks (source) {
  for await (const content of source) {
    if (content.length === undefined) {
      throw errCode(new Error('Content was invalid'), 'ERR_INVALID_CONTENT')
    }

    if (typeof content === 'string' || content instanceof String) {
      yield uint8ArrayFromString(content.toString())
    } else if (Array.isArray(content)) {
      yield Uint8Array.from(content)
    } else if (content instanceof Uint8Array) {
      yield content
    } else {
      throw errCode(new Error('Content was invalid'), 'ERR_INVALID_CONTENT')
    }
  }
}

module.exports = validateChunks


/***/ }),

/***/ 1607:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const { encode, prepare } = __nccwpck_require__(8012)
const { UnixFS } = __nccwpck_require__(4171)
const Dir = __nccwpck_require__(8245)
const persist = __nccwpck_require__(8567)

/**
 * @typedef {import('./types').ImporterOptions} ImporterOptions
 * @typedef {import('./types').ImportResult} ImportResult
 * @typedef {import('./types').InProgressImportResult} InProgressImportResult
 * @typedef {import('interface-blockstore').Blockstore} Blockstore
 * @typedef {import('./dir').DirProps} DirProps
 * @typedef {import('@ipld/dag-pb').PBNode} PBNode
 * @typedef {import('@ipld/dag-pb').PBLink} PBLink
 */

class DirFlat extends Dir {
  /**
   * @param {DirProps} props
   * @param {ImporterOptions} options
   */
  constructor (props, options) {
    super(props, options)

    /** @type {{ [key: string]: InProgressImportResult | Dir }} */
    this._children = {}
  }

  /**
   * @param {string} name
   * @param {InProgressImportResult | Dir} value
   */
  async put (name, value) {
    this.cid = undefined
    this.size = undefined

    this._children[name] = value
  }

  /**
   * @param {string} name
   */
  get (name) {
    return Promise.resolve(this._children[name])
  }

  childCount () {
    return Object.keys(this._children).length
  }

  directChildrenCount () {
    return this.childCount()
  }

  onlyChild () {
    return this._children[Object.keys(this._children)[0]]
  }

  async * eachChildSeries () {
    const keys = Object.keys(this._children)

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]

      yield {
        key: key,
        child: this._children[key]
      }
    }
  }

  /**
   * @param {Blockstore} block
   * @returns {AsyncIterable<ImportResult>}
   */
  async * flush (block) {
    const children = Object.keys(this._children)
    const links = []

    for (let i = 0; i < children.length; i++) {
      let child = this._children[children[i]]

      if (child instanceof Dir) {
        for await (const entry of child.flush(block)) {
          child = entry

          yield child
        }
      }

      if (child.size != null && child.cid) {
        links.push({
          Name: children[i],
          Tsize: child.size,
          Hash: child.cid
        })
      }
    }

    const unixfs = new UnixFS({
      type: 'directory',
      mtime: this.mtime,
      mode: this.mode
    })

    /** @type {PBNode} */
    const node = { Data: unixfs.marshal(), Links: links }
    const buffer = encode(prepare(node))
    const cid = await persist(buffer, block, this.options)
    const size = buffer.length + node.Links.reduce(
      /**
       * @param {number} acc
       * @param {PBLink} curr
       */
      (acc, curr) => acc + (curr.Tsize == null ? 0 : curr.Tsize),
      0)

    this.cid = cid
    this.size = size

    yield {
      cid,
      unixfs,
      path: this.path,
      size
    }
  }
}

module.exports = DirFlat


/***/ }),

/***/ 1742:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const { encode, prepare } = __nccwpck_require__(8012)
const { UnixFS } = __nccwpck_require__(4171)
const Dir = __nccwpck_require__(8245)
const persist = __nccwpck_require__(8567)
const { createHAMT, Bucket } = __nccwpck_require__(7820)

/**
 * @typedef {import('./types').ImporterOptions} ImporterOptions
 * @typedef {import('./types').ImportResult} ImportResult
 * @typedef {import('./types').InProgressImportResult} InProgressImportResult
 * @typedef {import('interface-blockstore').Blockstore} Blockstore
 */

/**
 * @typedef {import('./dir').DirProps} DirProps
 */

class DirSharded extends Dir {
  /**
   * @param {DirProps} props
   * @param {ImporterOptions} options
   */
  constructor (props, options) {
    super(props, options)

    /** @type {Bucket<InProgressImportResult | Dir>} */
    this._bucket = createHAMT({
      hashFn: options.hamtHashFn,
      bits: options.hamtBucketBits
    })
  }

  /**
   * @param {string} name
   * @param {InProgressImportResult | Dir} value
   */
  async put (name, value) {
    await this._bucket.put(name, value)
  }

  /**
   * @param {string} name
   */
  get (name) {
    return this._bucket.get(name)
  }

  childCount () {
    return this._bucket.leafCount()
  }

  directChildrenCount () {
    return this._bucket.childrenCount()
  }

  onlyChild () {
    return this._bucket.onlyChild()
  }

  async * eachChildSeries () {
    for await (const { key, value } of this._bucket.eachLeafSeries()) {
      yield {
        key,
        child: value
      }
    }
  }

  /**
   * @param {Blockstore} blockstore
   * @returns {AsyncIterable<ImportResult>}
   */
  async * flush (blockstore) {
    for await (const entry of flush(this._bucket, blockstore, this, this.options)) {
      yield {
        ...entry,
        path: this.path
      }
    }
  }
}

module.exports = DirSharded

/**
 * @param {Bucket<?>} bucket
 * @param {Blockstore} blockstore
 * @param {*} shardRoot
 * @param {ImporterOptions} options
 * @returns {AsyncIterable<ImportResult>}
 */
async function * flush (bucket, blockstore, shardRoot, options) {
  const children = bucket._children
  const links = []
  let childrenSize = 0

  for (let i = 0; i < children.length; i++) {
    const child = children.get(i)

    if (!child) {
      continue
    }

    const labelPrefix = i.toString(16).toUpperCase().padStart(2, '0')

    if (child instanceof Bucket) {
      let shard

      for await (const subShard of await flush(child, blockstore, null, options)) {
        shard = subShard
      }

      if (!shard) {
        throw new Error('Could not flush sharded directory, no subshard found')
      }

      links.push({
        Name: labelPrefix,
        Tsize: shard.size,
        Hash: shard.cid
      })
      childrenSize += shard.size
    } else if (typeof child.value.flush === 'function') {
      const dir = child.value
      let flushedDir

      for await (const entry of dir.flush(blockstore)) {
        flushedDir = entry

        yield flushedDir
      }

      const label = labelPrefix + child.key
      links.push({
        Name: label,
        Tsize: flushedDir.size,
        Hash: flushedDir.cid
      })

      childrenSize += flushedDir.size
    } else {
      const value = child.value

      if (!value.cid) {
        continue
      }

      const label = labelPrefix + child.key
      const size = value.size

      links.push({
        Name: label,
        Tsize: size,
        Hash: value.cid
      })
      childrenSize += size
    }
  }

  // go-ipfs uses little endian, that's why we have to
  // reverse the bit field before storing it
  const data = Uint8Array.from(children.bitField().reverse())
  const dir = new UnixFS({
    type: 'hamt-sharded-directory',
    data,
    fanout: bucket.tableSize(),
    hashType: options.hamtHashCode,
    mtime: shardRoot && shardRoot.mtime,
    mode: shardRoot && shardRoot.mode
  })

  const node = {
    Data: dir.marshal(),
    Links: links
  }
  const buffer = encode(prepare(node))
  const cid = await persist(buffer, blockstore, options)
  const size = buffer.length + childrenSize

  yield {
    cid,
    unixfs: dir,
    size
  }
}


/***/ }),

/***/ 8245:
/***/ ((module) => {

"use strict";


/**
 * @typedef {import('./types').ImporterOptions} ImporterOptions
 * @typedef {import('./types').ImportResult} ImportResult
 * @typedef {import('./types').InProgressImportResult} InProgressImportResult
 * @typedef {import('interface-blockstore').Blockstore} Blockstore
 * @typedef {import('multiformats/cid').CID} CID
 * @typedef {object} DirProps
 * @property {boolean} root
 * @property {boolean} dir
 * @property {string} path
 * @property {boolean} dirty
 * @property {boolean} flat
 * @property {Dir} [parent]
 * @property {string} [parentKey]
 * @property {import('ipfs-unixfs').UnixFS} [unixfs]
 * @property {number} [mode]
 * @property {import('ipfs-unixfs').Mtime} [mtime]
 */
class Dir {
  /**
   *
   * @param {DirProps} props
   * @param {ImporterOptions} options
   */
  constructor (props, options) {
    this.options = options || {}

    this.root = props.root
    this.dir = props.dir
    this.path = props.path
    this.dirty = props.dirty
    this.flat = props.flat
    this.parent = props.parent
    this.parentKey = props.parentKey
    this.unixfs = props.unixfs
    this.mode = props.mode
    this.mtime = props.mtime

    /** @type {CID | undefined} */
    this.cid = undefined
    /** @type {number | undefined} */
    this.size = undefined
  }

  /**
   * @param {string} name
   * @param {InProgressImportResult | Dir} value
   */
  async put (name, value) { }

  /**
   * @param {string} name
   * @returns {Promise<InProgressImportResult | Dir | undefined>}
   */
  get (name) {
    return Promise.resolve(this)
  }

  /**
   * @returns {AsyncIterable<{ key: string, child: InProgressImportResult | Dir}>}
   */
  async * eachChildSeries () { }

  /**
   * @param {Blockstore} blockstore
   * @returns {AsyncIterable<ImportResult>}
   */
  async * flush (blockstore) { }
}

module.exports = Dir


/***/ }),

/***/ 58:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const DirSharded = __nccwpck_require__(1742)
const DirFlat = __nccwpck_require__(1607)

/**
 * @typedef {import('./dir')} Dir
 * @typedef {import('./types').ImporterOptions} ImporterOptions
 */

/**
 * @param {Dir | null} child
 * @param {Dir} dir
 * @param {number} threshold
 * @param {ImporterOptions} options
 * @returns {Promise<DirSharded>}
 */
module.exports = async function flatToShard (child, dir, threshold, options) {
  let newDir = dir

  if (dir instanceof DirFlat && dir.directChildrenCount() >= threshold) {
    newDir = await convertToShard(dir, options)
  }

  const parent = newDir.parent

  if (parent) {
    if (newDir !== dir) {
      if (child) {
        child.parent = newDir
      }

      if (!newDir.parentKey) {
        throw new Error('No parent key found')
      }

      await parent.put(newDir.parentKey, newDir)
    }

    return flatToShard(newDir, parent, threshold, options)
  }

  // @ts-ignore
  return newDir
}

/**
 * @param {DirFlat} oldDir
 * @param {ImporterOptions} options
 */
async function convertToShard (oldDir, options) {
  const newDir = new DirSharded({
    root: oldDir.root,
    dir: true,
    parent: oldDir.parent,
    parentKey: oldDir.parentKey,
    path: oldDir.path,
    dirty: oldDir.dirty,
    flat: false,
    mtime: oldDir.mtime,
    mode: oldDir.mode
  }, options)

  for await (const { key, child } of oldDir.eachChildSeries()) {
    await newDir.put(key, child)
  }

  return newDir
}


/***/ }),

/***/ 1333:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const parallelBatch = __nccwpck_require__(6615)
const defaultOptions = __nccwpck_require__(1379)

/**
 * @typedef {import('interface-blockstore').Blockstore} Blockstore
 * @typedef {import('./types').ImportCandidate} ImportCandidate
 * @typedef {import('./types').UserImporterOptions} UserImporterOptions
 * @typedef {import('./types').ImporterOptions} ImporterOptions
 * @typedef {import('./types').Directory} Directory
 * @typedef {import('./types').File} File
 * @typedef {import('./types').ImportResult} ImportResult
 *
 * @typedef {import('./types').Chunker} Chunker
 * @typedef {import('./types').DAGBuilder} DAGBuilder
 * @typedef {import('./types').TreeBuilder} TreeBuilder
 * @typedef {import('./types').BufferImporter} BufferImporter
 * @typedef {import('./types').ChunkValidator} ChunkValidator
 * @typedef {import('./types').Reducer} Reducer
 * @typedef {import('./types').ProgressHandler} ProgressHandler
 */

/**
 * @param {AsyncIterable<ImportCandidate> | Iterable<ImportCandidate> | ImportCandidate} source
 * @param {Blockstore} blockstore
 * @param {UserImporterOptions} options
 */
async function * importer (source, blockstore, options = {}) {
  const opts = defaultOptions(options)

  let dagBuilder

  if (typeof options.dagBuilder === 'function') {
    dagBuilder = options.dagBuilder
  } else {
    dagBuilder = __nccwpck_require__(5475)
  }

  let treeBuilder

  if (typeof options.treeBuilder === 'function') {
    treeBuilder = options.treeBuilder
  } else {
    treeBuilder = __nccwpck_require__(722)
  }

  /** @type {AsyncIterable<ImportCandidate> | Iterable<ImportCandidate>} */
  let candidates

  if (Symbol.asyncIterator in source || Symbol.iterator in source) {
    // @ts-ignore
    candidates = source
  } else {
    // @ts-ignore
    candidates = [source]
  }

  for await (const entry of treeBuilder(parallelBatch(dagBuilder(candidates, blockstore, opts), opts.fileImportConcurrency), blockstore, opts)) {
    yield {
      cid: entry.cid,
      path: entry.path,
      unixfs: entry.unixfs,
      size: entry.size
    }
  }
}

module.exports = {
  importer
}


/***/ }),

/***/ 1379:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const mergeOptions = __nccwpck_require__(2555).bind({ ignoreUndefined: true })
const { sha256 } = __nccwpck_require__(6987)
// @ts-ignore - no types available
const mur = __nccwpck_require__(7214)
const uint8ArrayFromString = __nccwpck_require__(828)

/**
 * @param {Uint8Array} buf
 */
async function hamtHashFn (buf) {
  return uint8ArrayFromString(mur.x64.hash128(buf), 'base16')
    // Murmur3 outputs 128 bit but, accidentally, IPFS Go's
    // implementation only uses the first 64, so we must do the same
    // for parity..
    .slice(0, 8)
    // Invert buffer because that's how Go impl does it
    .reverse()
}

/**
 * @typedef {import('./types').UserImporterOptions} UserImporterOptions
 * @typedef {import('./types').ImporterOptions} ImporterOptions
 */

/**
 * @type {ImporterOptions}
 */
const defaultOptions = {
  chunker: 'fixed',
  strategy: 'balanced', // 'flat', 'trickle'
  rawLeaves: false,
  onlyHash: false,
  reduceSingleLeafToSelf: true,
  hasher: sha256,
  leafType: 'file', // 'raw'
  cidVersion: 0,
  progress: () => () => {},
  shardSplitThreshold: 1000,
  fileImportConcurrency: 50,
  blockWriteConcurrency: 10,
  minChunkSize: 262144,
  maxChunkSize: 262144,
  avgChunkSize: 262144,
  window: 16,
  // FIXME: This number is too big for JavaScript
  // https://github.com/ipfs/go-ipfs-chunker/blob/d0125832512163708c0804a3cda060e21acddae4/rabin.go#L11
  polynomial: 17437180132763653, // eslint-disable-line no-loss-of-precision
  maxChildrenPerNode: 174,
  layerRepeat: 4,
  wrapWithDirectory: false,
  recursive: false,
  hidden: false,
  timeout: undefined,
  hamtHashFn,
  hamtHashCode: 0x22,
  hamtBucketBits: 8
}

/**
 * @param {UserImporterOptions} options
 * @returns {ImporterOptions}
 */
module.exports = function (options = {}) {
  return mergeOptions(defaultOptions, options)
}


/***/ }),

/***/ 722:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const DirFlat = __nccwpck_require__(1607)
const flatToShard = __nccwpck_require__(58)
const Dir = __nccwpck_require__(8245)
const toPathComponents = __nccwpck_require__(6301)

/**
 * @typedef {import('./types').ImportResult} ImportResult
 * @typedef {import('./types').InProgressImportResult} InProgressImportResult
 * @typedef {import('./types').ImporterOptions} ImporterOptions
 * @typedef {import('interface-blockstore').Blockstore} Blockstore
 * @typedef {(source: AsyncIterable<InProgressImportResult>, blockstore: Blockstore, options: ImporterOptions) => AsyncIterable<ImportResult>} TreeBuilder
 */

/**
 * @param {InProgressImportResult} elem
 * @param {Dir} tree
 * @param {ImporterOptions} options
 */
async function addToTree (elem, tree, options) {
  const pathElems = toPathComponents(elem.path || '')
  const lastIndex = pathElems.length - 1
  let parent = tree
  let currentPath = ''

  for (let i = 0; i < pathElems.length; i++) {
    const pathElem = pathElems[i]

    currentPath += `${currentPath ? '/' : ''}${pathElem}`

    const last = (i === lastIndex)
    parent.dirty = true
    parent.cid = undefined
    parent.size = undefined

    if (last) {
      await parent.put(pathElem, elem)
      tree = await flatToShard(null, parent, options.shardSplitThreshold, options)
    } else {
      let dir = await parent.get(pathElem)

      if (!dir || !(dir instanceof Dir)) {
        dir = new DirFlat({
          root: false,
          dir: true,
          parent: parent,
          parentKey: pathElem,
          path: currentPath,
          dirty: true,
          flat: true,
          mtime: dir && dir.unixfs && dir.unixfs.mtime,
          mode: dir && dir.unixfs && dir.unixfs.mode
        }, options)
      }

      await parent.put(pathElem, dir)

      parent = dir
    }
  }

  return tree
}

/**
 * @param {Dir | InProgressImportResult} tree
 * @param {Blockstore} blockstore
 */
async function * flushAndYield (tree, blockstore) {
  if (!(tree instanceof Dir)) {
    if (tree && tree.unixfs && tree.unixfs.isDirectory()) {
      yield tree
    }

    return
  }

  yield * tree.flush(blockstore)
}

/**
 * @type {TreeBuilder}
 */
async function * treeBuilder (source, block, options) {
  /** @type {Dir} */
  let tree = new DirFlat({
    root: true,
    dir: true,
    path: '',
    dirty: true,
    flat: true
  }, options)

  for await (const entry of source) {
    if (!entry) {
      continue
    }

    tree = await addToTree(entry, tree, options)

    if (!entry.unixfs || !entry.unixfs.isDirectory()) {
      yield entry
    }
  }

  if (options.wrapWithDirectory) {
    yield * flushAndYield(tree, block)
  } else {
    for await (const unwrapped of tree.eachChildSeries()) {
      if (!unwrapped) {
        continue
      }

      yield * flushAndYield(unwrapped.child, block)
    }
  }
}

module.exports = treeBuilder


/***/ }),

/***/ 8567:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const { CID } = __nccwpck_require__(6447)
const dagPb = __nccwpck_require__(8012)
const { sha256 } = __nccwpck_require__(6987)

/**
 * @param {Uint8Array} buffer
 * @param {import('interface-blockstore').Blockstore} blockstore
 * @param {import('../types').PersistOptions} options
 */
const persist = async (buffer, blockstore, options) => {
  if (!options.codec) {
    options.codec = dagPb
  }

  if (!options.hasher) {
    options.hasher = sha256
  }

  if (options.cidVersion === undefined) {
    options.cidVersion = 1
  }

  if (options.codec === dagPb && options.hasher !== sha256) {
    options.cidVersion = 1
  }

  const multihash = await options.hasher.digest(buffer)
  const cid = CID.create(options.cidVersion, options.codec.code, multihash)

  if (!options.onlyHash) {
    await blockstore.put(cid, buffer, {
      signal: options.signal
    })
  }

  return cid
}

module.exports = persist


/***/ }),

/***/ 6301:
/***/ ((module) => {

"use strict";


const toPathComponents = (path = '') => {
  // split on / unless escaped with \
  return (path
    .trim()
    .match(/([^\\^/]|\\\/)+/g) || [])
    .filter(Boolean)
}

module.exports = toPathComponents


/***/ }),

/***/ 9811:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const {
  Data: PBData
} = __nccwpck_require__(8699)
const errcode = __nccwpck_require__(2997)

/**
 * @typedef {import('./types').Mtime} Mtime
 * @typedef {import('./types').MtimeLike} MtimeLike
 */

const types = [
  'raw',
  'directory',
  'file',
  'metadata',
  'symlink',
  'hamt-sharded-directory'
]

const dirTypes = [
  'directory',
  'hamt-sharded-directory'
]

const DEFAULT_FILE_MODE = parseInt('0644', 8)
const DEFAULT_DIRECTORY_MODE = parseInt('0755', 8)

/**
 * @param {string | number | undefined} [mode]
 */
function parseMode (mode) {
  if (mode == null) {
    return undefined
  }

  if (typeof mode === 'number') {
    return mode & 0xFFF
  }

  mode = mode.toString()

  if (mode.substring(0, 1) === '0') {
    // octal string
    return parseInt(mode, 8) & 0xFFF
  }

  // decimal string
  return parseInt(mode, 10) & 0xFFF
}

/**
 * @param {any} input
 */
function parseMtime (input) {
  if (input == null) {
    return undefined
  }

  /** @type {Mtime | undefined} */
  let mtime

  // { secs, nsecs }
  if (input.secs != null) {
    mtime = {
      secs: input.secs,
      nsecs: input.nsecs
    }
  }

  // UnixFS TimeSpec
  if (input.Seconds != null) {
    mtime = {
      secs: input.Seconds,
      nsecs: input.FractionalNanoseconds
    }
  }

  // process.hrtime()
  if (Array.isArray(input)) {
    mtime = {
      secs: input[0],
      nsecs: input[1]
    }
  }

  // Javascript Date
  if (input instanceof Date) {
    const ms = input.getTime()
    const secs = Math.floor(ms / 1000)

    mtime = {
      secs: secs,
      nsecs: (ms - (secs * 1000)) * 1000
    }
  }

  /*
  TODO: https://github.com/ipfs/aegir/issues/487

  // process.hrtime.bigint()
  if (input instanceof BigInt) {
    const secs = input / BigInt(1e9)
    const nsecs = input - (secs * BigInt(1e9))

    mtime = {
      secs: parseInt(secs.toString()),
      nsecs: parseInt(nsecs.toString())
    }
  }
  */

  if (!Object.prototype.hasOwnProperty.call(mtime, 'secs')) {
    return undefined
  }

  if (mtime != null && mtime.nsecs != null && (mtime.nsecs < 0 || mtime.nsecs > 999999999)) {
    throw errcode(new Error('mtime-nsecs must be within the range [0,999999999]'), 'ERR_INVALID_MTIME_NSECS')
  }

  return mtime
}

class Data {
  /**
   * Decode from protobuf https://github.com/ipfs/specs/blob/master/UNIXFS.md
   *
   * @param {Uint8Array} marshaled
   */
  static unmarshal (marshaled) {
    const message = PBData.decode(marshaled)
    const decoded = PBData.toObject(message, {
      defaults: false,
      arrays: true,
      longs: Number,
      objects: false
    })

    const data = new Data({
      type: types[decoded.Type],
      data: decoded.Data,
      blockSizes: decoded.blocksizes,
      mode: decoded.mode,
      mtime: decoded.mtime
        ? {
            secs: decoded.mtime.Seconds,
            nsecs: decoded.mtime.FractionalNanoseconds
          }
        : undefined
    })

    // make sure we honour the original mode
    data._originalMode = decoded.mode || 0

    return data
  }

  /**
   * @param {object} [options]
   * @param {string} [options.type='file']
   * @param {Uint8Array} [options.data]
   * @param {number[]} [options.blockSizes]
   * @param {number} [options.hashType]
   * @param {number} [options.fanout]
   * @param {MtimeLike | null} [options.mtime]
   * @param {number | string} [options.mode]
   */
  constructor (options = {
    type: 'file'
  }) {
    const {
      type,
      data,
      blockSizes,
      hashType,
      fanout,
      mtime,
      mode
    } = options

    if (type && !types.includes(type)) {
      throw errcode(new Error('Type: ' + type + ' is not valid'), 'ERR_INVALID_TYPE')
    }

    this.type = type || 'file'
    this.data = data
    this.hashType = hashType
    this.fanout = fanout

    /** @type {number[]} */
    this.blockSizes = blockSizes || []
    this._originalMode = 0
    this.mode = parseMode(mode)

    if (mtime) {
      this.mtime = parseMtime(mtime)

      if (this.mtime && !this.mtime.nsecs) {
        this.mtime.nsecs = 0
      }
    }
  }

  /**
   * @param {number | undefined} mode
   */
  set mode (mode) {
    this._mode = this.isDirectory() ? DEFAULT_DIRECTORY_MODE : DEFAULT_FILE_MODE

    const parsedMode = parseMode(mode)

    if (parsedMode !== undefined) {
      this._mode = parsedMode
    }
  }

  /**
   * @returns {number | undefined}
   */
  get mode () {
    return this._mode
  }

  isDirectory () {
    return Boolean(this.type && dirTypes.includes(this.type))
  }

  /**
   * @param {number} size
   */
  addBlockSize (size) {
    this.blockSizes.push(size)
  }

  /**
   * @param {number} index
   */
  removeBlockSize (index) {
    this.blockSizes.splice(index, 1)
  }

  /**
   * Returns `0` for directories or `data.length + sum(blockSizes)` for everything else
   */
  fileSize () {
    if (this.isDirectory()) {
      // dirs don't have file size
      return 0
    }

    let sum = 0
    this.blockSizes.forEach((size) => {
      sum += size
    })

    if (this.data) {
      sum += this.data.length
    }

    return sum
  }

  /**
   * encode to protobuf Uint8Array
   */
  marshal () {
    let type

    switch (this.type) {
      case 'raw': type = PBData.DataType.Raw; break
      case 'directory': type = PBData.DataType.Directory; break
      case 'file': type = PBData.DataType.File; break
      case 'metadata': type = PBData.DataType.Metadata; break
      case 'symlink': type = PBData.DataType.Symlink; break
      case 'hamt-sharded-directory': type = PBData.DataType.HAMTShard; break
      default:
        throw errcode(new Error('Type: ' + type + ' is not valid'), 'ERR_INVALID_TYPE')
    }

    let data = this.data

    if (!this.data || !this.data.length) {
      data = undefined
    }

    let mode

    if (this.mode != null) {
      mode = (this._originalMode & 0xFFFFF000) | (parseMode(this.mode) || 0)

      if (mode === DEFAULT_FILE_MODE && !this.isDirectory()) {
        mode = undefined
      }

      if (mode === DEFAULT_DIRECTORY_MODE && this.isDirectory()) {
        mode = undefined
      }
    }

    let mtime

    if (this.mtime != null) {
      const parsed = parseMtime(this.mtime)

      if (parsed) {
        mtime = {
          Seconds: parsed.secs,
          FractionalNanoseconds: parsed.nsecs
        }

        if (mtime.FractionalNanoseconds === 0) {
          delete mtime.FractionalNanoseconds
        }
      }
    }

    const pbData = {
      Type: type,
      Data: data,
      filesize: this.isDirectory() ? undefined : this.fileSize(),
      blocksizes: this.blockSizes,
      hashType: this.hashType,
      fanout: this.fanout,
      mode,
      mtime
    }

    return PBData.encode(pbData).finish()
  }
}

module.exports = {
  UnixFS: Data,
  parseMode,
  parseMtime
}


/***/ }),

/***/ 8699:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/*eslint-disable*/


var $protobuf = __nccwpck_require__(6916);

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["ipfs-unixfs"] || ($protobuf.roots["ipfs-unixfs"] = {});

$root.Data = (function() {

    /**
     * Properties of a Data.
     * @exports IData
     * @interface IData
     * @property {Data.DataType} Type Data Type
     * @property {Uint8Array|null} [Data] Data Data
     * @property {number|null} [filesize] Data filesize
     * @property {Array.<number>|null} [blocksizes] Data blocksizes
     * @property {number|null} [hashType] Data hashType
     * @property {number|null} [fanout] Data fanout
     * @property {number|null} [mode] Data mode
     * @property {IUnixTime|null} [mtime] Data mtime
     */

    /**
     * Constructs a new Data.
     * @exports Data
     * @classdesc Represents a Data.
     * @implements IData
     * @constructor
     * @param {IData=} [p] Properties to set
     */
    function Data(p) {
        this.blocksizes = [];
        if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                if (p[ks[i]] != null)
                    this[ks[i]] = p[ks[i]];
    }

    /**
     * Data Type.
     * @member {Data.DataType} Type
     * @memberof Data
     * @instance
     */
    Data.prototype.Type = 0;

    /**
     * Data Data.
     * @member {Uint8Array} Data
     * @memberof Data
     * @instance
     */
    Data.prototype.Data = $util.newBuffer([]);

    /**
     * Data filesize.
     * @member {number} filesize
     * @memberof Data
     * @instance
     */
    Data.prototype.filesize = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Data blocksizes.
     * @member {Array.<number>} blocksizes
     * @memberof Data
     * @instance
     */
    Data.prototype.blocksizes = $util.emptyArray;

    /**
     * Data hashType.
     * @member {number} hashType
     * @memberof Data
     * @instance
     */
    Data.prototype.hashType = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Data fanout.
     * @member {number} fanout
     * @memberof Data
     * @instance
     */
    Data.prototype.fanout = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Data mode.
     * @member {number} mode
     * @memberof Data
     * @instance
     */
    Data.prototype.mode = 0;

    /**
     * Data mtime.
     * @member {IUnixTime|null|undefined} mtime
     * @memberof Data
     * @instance
     */
    Data.prototype.mtime = null;

    /**
     * Encodes the specified Data message. Does not implicitly {@link Data.verify|verify} messages.
     * @function encode
     * @memberof Data
     * @static
     * @param {IData} m Data message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Data.encode = function encode(m, w) {
        if (!w)
            w = $Writer.create();
        w.uint32(8).int32(m.Type);
        if (m.Data != null && Object.hasOwnProperty.call(m, "Data"))
            w.uint32(18).bytes(m.Data);
        if (m.filesize != null && Object.hasOwnProperty.call(m, "filesize"))
            w.uint32(24).uint64(m.filesize);
        if (m.blocksizes != null && m.blocksizes.length) {
            for (var i = 0; i < m.blocksizes.length; ++i)
                w.uint32(32).uint64(m.blocksizes[i]);
        }
        if (m.hashType != null && Object.hasOwnProperty.call(m, "hashType"))
            w.uint32(40).uint64(m.hashType);
        if (m.fanout != null && Object.hasOwnProperty.call(m, "fanout"))
            w.uint32(48).uint64(m.fanout);
        if (m.mode != null && Object.hasOwnProperty.call(m, "mode"))
            w.uint32(56).uint32(m.mode);
        if (m.mtime != null && Object.hasOwnProperty.call(m, "mtime"))
            $root.UnixTime.encode(m.mtime, w.uint32(66).fork()).ldelim();
        return w;
    };

    /**
     * Decodes a Data message from the specified reader or buffer.
     * @function decode
     * @memberof Data
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {Data} Data
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Data.decode = function decode(r, l) {
        if (!(r instanceof $Reader))
            r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l, m = new $root.Data();
        while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
            case 1:
                m.Type = r.int32();
                break;
            case 2:
                m.Data = r.bytes();
                break;
            case 3:
                m.filesize = r.uint64();
                break;
            case 4:
                if (!(m.blocksizes && m.blocksizes.length))
                    m.blocksizes = [];
                if ((t & 7) === 2) {
                    var c2 = r.uint32() + r.pos;
                    while (r.pos < c2)
                        m.blocksizes.push(r.uint64());
                } else
                    m.blocksizes.push(r.uint64());
                break;
            case 5:
                m.hashType = r.uint64();
                break;
            case 6:
                m.fanout = r.uint64();
                break;
            case 7:
                m.mode = r.uint32();
                break;
            case 8:
                m.mtime = $root.UnixTime.decode(r, r.uint32());
                break;
            default:
                r.skipType(t & 7);
                break;
            }
        }
        if (!m.hasOwnProperty("Type"))
            throw $util.ProtocolError("missing required 'Type'", { instance: m });
        return m;
    };

    /**
     * Creates a Data message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Data
     * @static
     * @param {Object.<string,*>} d Plain object
     * @returns {Data} Data
     */
    Data.fromObject = function fromObject(d) {
        if (d instanceof $root.Data)
            return d;
        var m = new $root.Data();
        switch (d.Type) {
        case "Raw":
        case 0:
            m.Type = 0;
            break;
        case "Directory":
        case 1:
            m.Type = 1;
            break;
        case "File":
        case 2:
            m.Type = 2;
            break;
        case "Metadata":
        case 3:
            m.Type = 3;
            break;
        case "Symlink":
        case 4:
            m.Type = 4;
            break;
        case "HAMTShard":
        case 5:
            m.Type = 5;
            break;
        }
        if (d.Data != null) {
            if (typeof d.Data === "string")
                $util.base64.decode(d.Data, m.Data = $util.newBuffer($util.base64.length(d.Data)), 0);
            else if (d.Data.length)
                m.Data = d.Data;
        }
        if (d.filesize != null) {
            if ($util.Long)
                (m.filesize = $util.Long.fromValue(d.filesize)).unsigned = true;
            else if (typeof d.filesize === "string")
                m.filesize = parseInt(d.filesize, 10);
            else if (typeof d.filesize === "number")
                m.filesize = d.filesize;
            else if (typeof d.filesize === "object")
                m.filesize = new $util.LongBits(d.filesize.low >>> 0, d.filesize.high >>> 0).toNumber(true);
        }
        if (d.blocksizes) {
            if (!Array.isArray(d.blocksizes))
                throw TypeError(".Data.blocksizes: array expected");
            m.blocksizes = [];
            for (var i = 0; i < d.blocksizes.length; ++i) {
                if ($util.Long)
                    (m.blocksizes[i] = $util.Long.fromValue(d.blocksizes[i])).unsigned = true;
                else if (typeof d.blocksizes[i] === "string")
                    m.blocksizes[i] = parseInt(d.blocksizes[i], 10);
                else if (typeof d.blocksizes[i] === "number")
                    m.blocksizes[i] = d.blocksizes[i];
                else if (typeof d.blocksizes[i] === "object")
                    m.blocksizes[i] = new $util.LongBits(d.blocksizes[i].low >>> 0, d.blocksizes[i].high >>> 0).toNumber(true);
            }
        }
        if (d.hashType != null) {
            if ($util.Long)
                (m.hashType = $util.Long.fromValue(d.hashType)).unsigned = true;
            else if (typeof d.hashType === "string")
                m.hashType = parseInt(d.hashType, 10);
            else if (typeof d.hashType === "number")
                m.hashType = d.hashType;
            else if (typeof d.hashType === "object")
                m.hashType = new $util.LongBits(d.hashType.low >>> 0, d.hashType.high >>> 0).toNumber(true);
        }
        if (d.fanout != null) {
            if ($util.Long)
                (m.fanout = $util.Long.fromValue(d.fanout)).unsigned = true;
            else if (typeof d.fanout === "string")
                m.fanout = parseInt(d.fanout, 10);
            else if (typeof d.fanout === "number")
                m.fanout = d.fanout;
            else if (typeof d.fanout === "object")
                m.fanout = new $util.LongBits(d.fanout.low >>> 0, d.fanout.high >>> 0).toNumber(true);
        }
        if (d.mode != null) {
            m.mode = d.mode >>> 0;
        }
        if (d.mtime != null) {
            if (typeof d.mtime !== "object")
                throw TypeError(".Data.mtime: object expected");
            m.mtime = $root.UnixTime.fromObject(d.mtime);
        }
        return m;
    };

    /**
     * Creates a plain object from a Data message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Data
     * @static
     * @param {Data} m Data
     * @param {$protobuf.IConversionOptions} [o] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Data.toObject = function toObject(m, o) {
        if (!o)
            o = {};
        var d = {};
        if (o.arrays || o.defaults) {
            d.blocksizes = [];
        }
        if (o.defaults) {
            d.Type = o.enums === String ? "Raw" : 0;
            if (o.bytes === String)
                d.Data = "";
            else {
                d.Data = [];
                if (o.bytes !== Array)
                    d.Data = $util.newBuffer(d.Data);
            }
            if ($util.Long) {
                var n = new $util.Long(0, 0, true);
                d.filesize = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
            } else
                d.filesize = o.longs === String ? "0" : 0;
            if ($util.Long) {
                var n = new $util.Long(0, 0, true);
                d.hashType = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
            } else
                d.hashType = o.longs === String ? "0" : 0;
            if ($util.Long) {
                var n = new $util.Long(0, 0, true);
                d.fanout = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
            } else
                d.fanout = o.longs === String ? "0" : 0;
            d.mode = 0;
            d.mtime = null;
        }
        if (m.Type != null && m.hasOwnProperty("Type")) {
            d.Type = o.enums === String ? $root.Data.DataType[m.Type] : m.Type;
        }
        if (m.Data != null && m.hasOwnProperty("Data")) {
            d.Data = o.bytes === String ? $util.base64.encode(m.Data, 0, m.Data.length) : o.bytes === Array ? Array.prototype.slice.call(m.Data) : m.Data;
        }
        if (m.filesize != null && m.hasOwnProperty("filesize")) {
            if (typeof m.filesize === "number")
                d.filesize = o.longs === String ? String(m.filesize) : m.filesize;
            else
                d.filesize = o.longs === String ? $util.Long.prototype.toString.call(m.filesize) : o.longs === Number ? new $util.LongBits(m.filesize.low >>> 0, m.filesize.high >>> 0).toNumber(true) : m.filesize;
        }
        if (m.blocksizes && m.blocksizes.length) {
            d.blocksizes = [];
            for (var j = 0; j < m.blocksizes.length; ++j) {
                if (typeof m.blocksizes[j] === "number")
                    d.blocksizes[j] = o.longs === String ? String(m.blocksizes[j]) : m.blocksizes[j];
                else
                    d.blocksizes[j] = o.longs === String ? $util.Long.prototype.toString.call(m.blocksizes[j]) : o.longs === Number ? new $util.LongBits(m.blocksizes[j].low >>> 0, m.blocksizes[j].high >>> 0).toNumber(true) : m.blocksizes[j];
            }
        }
        if (m.hashType != null && m.hasOwnProperty("hashType")) {
            if (typeof m.hashType === "number")
                d.hashType = o.longs === String ? String(m.hashType) : m.hashType;
            else
                d.hashType = o.longs === String ? $util.Long.prototype.toString.call(m.hashType) : o.longs === Number ? new $util.LongBits(m.hashType.low >>> 0, m.hashType.high >>> 0).toNumber(true) : m.hashType;
        }
        if (m.fanout != null && m.hasOwnProperty("fanout")) {
            if (typeof m.fanout === "number")
                d.fanout = o.longs === String ? String(m.fanout) : m.fanout;
            else
                d.fanout = o.longs === String ? $util.Long.prototype.toString.call(m.fanout) : o.longs === Number ? new $util.LongBits(m.fanout.low >>> 0, m.fanout.high >>> 0).toNumber(true) : m.fanout;
        }
        if (m.mode != null && m.hasOwnProperty("mode")) {
            d.mode = m.mode;
        }
        if (m.mtime != null && m.hasOwnProperty("mtime")) {
            d.mtime = $root.UnixTime.toObject(m.mtime, o);
        }
        return d;
    };

    /**
     * Converts this Data to JSON.
     * @function toJSON
     * @memberof Data
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Data.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * DataType enum.
     * @name Data.DataType
     * @enum {number}
     * @property {number} Raw=0 Raw value
     * @property {number} Directory=1 Directory value
     * @property {number} File=2 File value
     * @property {number} Metadata=3 Metadata value
     * @property {number} Symlink=4 Symlink value
     * @property {number} HAMTShard=5 HAMTShard value
     */
    Data.DataType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "Raw"] = 0;
        values[valuesById[1] = "Directory"] = 1;
        values[valuesById[2] = "File"] = 2;
        values[valuesById[3] = "Metadata"] = 3;
        values[valuesById[4] = "Symlink"] = 4;
        values[valuesById[5] = "HAMTShard"] = 5;
        return values;
    })();

    return Data;
})();

$root.UnixTime = (function() {

    /**
     * Properties of an UnixTime.
     * @exports IUnixTime
     * @interface IUnixTime
     * @property {number} Seconds UnixTime Seconds
     * @property {number|null} [FractionalNanoseconds] UnixTime FractionalNanoseconds
     */

    /**
     * Constructs a new UnixTime.
     * @exports UnixTime
     * @classdesc Represents an UnixTime.
     * @implements IUnixTime
     * @constructor
     * @param {IUnixTime=} [p] Properties to set
     */
    function UnixTime(p) {
        if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                if (p[ks[i]] != null)
                    this[ks[i]] = p[ks[i]];
    }

    /**
     * UnixTime Seconds.
     * @member {number} Seconds
     * @memberof UnixTime
     * @instance
     */
    UnixTime.prototype.Seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * UnixTime FractionalNanoseconds.
     * @member {number} FractionalNanoseconds
     * @memberof UnixTime
     * @instance
     */
    UnixTime.prototype.FractionalNanoseconds = 0;

    /**
     * Encodes the specified UnixTime message. Does not implicitly {@link UnixTime.verify|verify} messages.
     * @function encode
     * @memberof UnixTime
     * @static
     * @param {IUnixTime} m UnixTime message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UnixTime.encode = function encode(m, w) {
        if (!w)
            w = $Writer.create();
        w.uint32(8).int64(m.Seconds);
        if (m.FractionalNanoseconds != null && Object.hasOwnProperty.call(m, "FractionalNanoseconds"))
            w.uint32(21).fixed32(m.FractionalNanoseconds);
        return w;
    };

    /**
     * Decodes an UnixTime message from the specified reader or buffer.
     * @function decode
     * @memberof UnixTime
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {UnixTime} UnixTime
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UnixTime.decode = function decode(r, l) {
        if (!(r instanceof $Reader))
            r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l, m = new $root.UnixTime();
        while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
            case 1:
                m.Seconds = r.int64();
                break;
            case 2:
                m.FractionalNanoseconds = r.fixed32();
                break;
            default:
                r.skipType(t & 7);
                break;
            }
        }
        if (!m.hasOwnProperty("Seconds"))
            throw $util.ProtocolError("missing required 'Seconds'", { instance: m });
        return m;
    };

    /**
     * Creates an UnixTime message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof UnixTime
     * @static
     * @param {Object.<string,*>} d Plain object
     * @returns {UnixTime} UnixTime
     */
    UnixTime.fromObject = function fromObject(d) {
        if (d instanceof $root.UnixTime)
            return d;
        var m = new $root.UnixTime();
        if (d.Seconds != null) {
            if ($util.Long)
                (m.Seconds = $util.Long.fromValue(d.Seconds)).unsigned = false;
            else if (typeof d.Seconds === "string")
                m.Seconds = parseInt(d.Seconds, 10);
            else if (typeof d.Seconds === "number")
                m.Seconds = d.Seconds;
            else if (typeof d.Seconds === "object")
                m.Seconds = new $util.LongBits(d.Seconds.low >>> 0, d.Seconds.high >>> 0).toNumber();
        }
        if (d.FractionalNanoseconds != null) {
            m.FractionalNanoseconds = d.FractionalNanoseconds >>> 0;
        }
        return m;
    };

    /**
     * Creates a plain object from an UnixTime message. Also converts values to other types if specified.
     * @function toObject
     * @memberof UnixTime
     * @static
     * @param {UnixTime} m UnixTime
     * @param {$protobuf.IConversionOptions} [o] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    UnixTime.toObject = function toObject(m, o) {
        if (!o)
            o = {};
        var d = {};
        if (o.defaults) {
            if ($util.Long) {
                var n = new $util.Long(0, 0, false);
                d.Seconds = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
            } else
                d.Seconds = o.longs === String ? "0" : 0;
            d.FractionalNanoseconds = 0;
        }
        if (m.Seconds != null && m.hasOwnProperty("Seconds")) {
            if (typeof m.Seconds === "number")
                d.Seconds = o.longs === String ? String(m.Seconds) : m.Seconds;
            else
                d.Seconds = o.longs === String ? $util.Long.prototype.toString.call(m.Seconds) : o.longs === Number ? new $util.LongBits(m.Seconds.low >>> 0, m.Seconds.high >>> 0).toNumber() : m.Seconds;
        }
        if (m.FractionalNanoseconds != null && m.hasOwnProperty("FractionalNanoseconds")) {
            d.FractionalNanoseconds = m.FractionalNanoseconds;
        }
        return d;
    };

    /**
     * Converts this UnixTime to JSON.
     * @function toJSON
     * @memberof UnixTime
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    UnixTime.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return UnixTime;
})();

$root.Metadata = (function() {

    /**
     * Properties of a Metadata.
     * @exports IMetadata
     * @interface IMetadata
     * @property {string|null} [MimeType] Metadata MimeType
     */

    /**
     * Constructs a new Metadata.
     * @exports Metadata
     * @classdesc Represents a Metadata.
     * @implements IMetadata
     * @constructor
     * @param {IMetadata=} [p] Properties to set
     */
    function Metadata(p) {
        if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                if (p[ks[i]] != null)
                    this[ks[i]] = p[ks[i]];
    }

    /**
     * Metadata MimeType.
     * @member {string} MimeType
     * @memberof Metadata
     * @instance
     */
    Metadata.prototype.MimeType = "";

    /**
     * Encodes the specified Metadata message. Does not implicitly {@link Metadata.verify|verify} messages.
     * @function encode
     * @memberof Metadata
     * @static
     * @param {IMetadata} m Metadata message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Metadata.encode = function encode(m, w) {
        if (!w)
            w = $Writer.create();
        if (m.MimeType != null && Object.hasOwnProperty.call(m, "MimeType"))
            w.uint32(10).string(m.MimeType);
        return w;
    };

    /**
     * Decodes a Metadata message from the specified reader or buffer.
     * @function decode
     * @memberof Metadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {Metadata} Metadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Metadata.decode = function decode(r, l) {
        if (!(r instanceof $Reader))
            r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l, m = new $root.Metadata();
        while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
            case 1:
                m.MimeType = r.string();
                break;
            default:
                r.skipType(t & 7);
                break;
            }
        }
        return m;
    };

    /**
     * Creates a Metadata message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Metadata
     * @static
     * @param {Object.<string,*>} d Plain object
     * @returns {Metadata} Metadata
     */
    Metadata.fromObject = function fromObject(d) {
        if (d instanceof $root.Metadata)
            return d;
        var m = new $root.Metadata();
        if (d.MimeType != null) {
            m.MimeType = String(d.MimeType);
        }
        return m;
    };

    /**
     * Creates a plain object from a Metadata message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Metadata
     * @static
     * @param {Metadata} m Metadata
     * @param {$protobuf.IConversionOptions} [o] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Metadata.toObject = function toObject(m, o) {
        if (!o)
            o = {};
        var d = {};
        if (o.defaults) {
            d.MimeType = "";
        }
        if (m.MimeType != null && m.hasOwnProperty("MimeType")) {
            d.MimeType = m.MimeType;
        }
        return d;
    };

    /**
     * Converts this Metadata to JSON.
     * @function toJSON
     * @memberof Metadata
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Metadata.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Metadata;
})();

module.exports = $root;


/***/ }),

/***/ 864:
/***/ ((module) => {

"use strict";


module.exports = value => {
	if (Object.prototype.toString.call(value) !== '[object Object]') {
		return false;
	}

	const prototype = Object.getPrototypeOf(value);
	return prototype === null || prototype === Object.prototype;
};


/***/ }),

/***/ 5810:
/***/ ((module) => {

"use strict";


/**
 * Collects all values from an (async) iterable into an array and returns it.
 *
 * @template T
 * @param {AsyncIterable<T>|Iterable<T>} source
 */
const all = async (source) => {
  const arr = []

  for await (const entry of source) {
    arr.push(entry)
  }

  return arr
}

module.exports = all


/***/ }),

/***/ 3454:
/***/ ((module) => {

"use strict";


/**
 * Takes an (async) iterable that emits things and returns an async iterable that
 * emits those things in fixed-sized batches.
 *
 * @template T
 * @param {AsyncIterable<T>|Iterable<T>} source
 * @param {number} [size=1]
 * @returns {AsyncIterable<T[]>}
 */
async function * batch (source, size = 1) {
  /** @type {T[]} */
  let things = []

  if (size < 1) {
    size = 1
  }

  for await (const thing of source) {
    things.push(thing)

    while (things.length >= size) {
      yield things.slice(0, size)

      things = things.slice(size)
    }
  }

  while (things.length) {
    yield things.slice(0, size)

    things = things.slice(size)
  }
}

module.exports = batch


/***/ }),

/***/ 1798:
/***/ ((module) => {

"use strict";


/**
 * Drains an (async) iterable discarding its' content and does not return
 * anything.
 *
 * @template T
 * @param {AsyncIterable<T>|Iterable<T>} source
 * @returns {Promise<void>}
 */
const drain = async (source) => {
  for await (const _ of source) { } // eslint-disable-line no-unused-vars,no-empty
}

module.exports = drain


/***/ }),

/***/ 2220:
/***/ ((module) => {

"use strict";


/**
 * Filters the passed (async) iterable by using the filter function
 *
 * @template T
 * @param {AsyncIterable<T>|Iterable<T>} source
 * @param {function(T):boolean|Promise<boolean>} fn
 */
const filter = async function * (source, fn) {
  for await (const entry of source) {
    if (await fn(entry)) {
      yield entry
    }
  }
}

module.exports = filter


/***/ }),

/***/ 402:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const fs = __nccwpck_require__(5747).promises
const path = __nccwpck_require__(5622)
const minimatch = __nccwpck_require__(3973)

/**
 * @typedef {string} Glob
 * @typedef {Object} OptionsExt
 * @property {Glob[]} [ignore] - Glob patterns to ignore
 * @property {string} [cwd=process.cwd()]
 * @property {boolean} [absolute=false] - If true produces absolute paths
 * @property {boolean} [nodir] - If true yields file paths and skip directories
 *
 * @typedef {OptionsExt & minimatch.IOptions} Options
 */

/**
 * Async iterable filename pattern matcher
 *
 * @param {string} dir
 * @param {string} pattern
 * @param {Options} [options]
 * @returns {AsyncIterable<string>}
 */
async function * glob (dir, pattern, options = {}) {
  const absoluteDir = path.resolve(dir)
  const relativeDir = path.relative(options.cwd || process.cwd(), dir)

  const stats = await fs.stat(absoluteDir)

  if (stats.isDirectory()) {
    for await (const entry of _glob(absoluteDir, '', pattern, options)) {
      yield entry
    }

    return
  }

  if (minimatch(relativeDir, pattern, options)) {
    yield options.absolute ? absoluteDir : relativeDir
  }
}

/**
 * @param {string} base
 * @param {string} dir
 * @param {Glob} pattern
 * @param {Options} options
 * @returns {AsyncIterable<string>}
 */
async function * _glob (base, dir, pattern, options) {
  for await (const entry of await fs.readdir(path.join(base, dir))) {
    const relativeEntryPath = path.join(dir, entry)
    const absoluteEntryPath = path.join(base, dir, entry)
    const stats = await fs.stat(absoluteEntryPath)
    let match = minimatch(relativeEntryPath, pattern, options)

    if (options.ignore && match && options.ignore.reduce((acc, curr) => {
      return acc || minimatch(relativeEntryPath, curr, options)
    }, false)) {
      match = false
    }

    if (match && !(stats.isDirectory() && options.nodir)) {
      yield options.absolute ? absoluteEntryPath : relativeEntryPath
    }

    if (stats.isDirectory()) {
      yield * _glob(base, relativeEntryPath, pattern, options)
    }
  }
}

module.exports = glob


/***/ }),

/***/ 7123:
/***/ ((module) => {

"use strict";


/**
 * Returns the last item of an (async) iterable, unless empty, in which case
 * return `undefined`.
 *
 * @template T
 * @param {AsyncIterable<T>|Iterable<T>} source
 */
const last = async (source) => {
  let res

  for await (const entry of source) {
    res = entry
  }

  return res
}

module.exports = last


/***/ }),

/***/ 8753:
/***/ ((module) => {

"use strict";


/**
 * Takes an (async) iterable and returns one with each item mapped by the passed
 * function.
 *
 * @template I,O
 * @param {AsyncIterable<I>|Iterable<I>} source
 * @param {function(I):O|Promise<O>} func
 * @returns {AsyncIterable<O>}
 */
const map = async function * (source, func) {
  for await (const val of source) {
    yield func(val)
  }
}

module.exports = map


/***/ }),

/***/ 6615:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const batch = __nccwpck_require__(3454)

/**
 * @template T
 * @typedef {{ok:true, value:T}} Success
 */

/**
 * @typedef {{ok:false, err:Error}} Failure
 */

/**
 * Takes an (async) iterator that emits promise-returning functions,
 * invokes them in parallel and emits the results as they become available but
 * in the same order as the input
 *
 * @template T
 * @param {AsyncIterable<() => Promise<T>>} source
 * @param {number} [size=1]
 * @returns {AsyncIterable<T>}
 */
async function * parallelBatch (source, size = 1) {
  for await (const tasks of batch(source, size)) {
    /** @type {Promise<Success<T>|Failure>[]} */
    const things = tasks.map(
      /**
       * @param {() => Promise<T>} p
       */
      p => {
        return p().then(value => ({ ok: true, value }), err => ({ ok: false, err }))
      })

    for (let i = 0; i < things.length; i++) {
      const result = await things[i]

      if (result.ok) {
        yield result.value
      } else {
        throw result.err
      }
    }
  }
}

module.exports = parallelBatch


/***/ }),

/***/ 2276:
/***/ ((module) => {

"use strict";


/**
 * @template T
 * @typedef {Object} Peek
 * @property {() => IteratorResult<T, void>} peek
 */

/**
 * @template T
 * @typedef {Object} AsyncPeek
 * @property {() => Promise<IteratorResult<T, void>>} peek
 */

/**
 * @template T
 * @typedef {Object} Push
 * @property {(value:T) => void} push
 */

/**
 * @template T
 * @typedef {Iterable<T> & Peek<T> & Push<T> & Iterator<T>} Peekable<T>
 */

/**
 * @template T
 * @typedef {AsyncIterable<T> & AsyncPeek<T> & Push<T> & AsyncIterator<T>} AsyncPeekable<T>
 */

/**
 * @template {Iterable<any> | AsyncIterable<any>} I
 * @param {I} iterable
 * @returns {I extends Iterable<infer T>
 *  ? Peekable<T>
 *  : I extends AsyncIterable<infer T>
 *  ? AsyncPeekable<T>
 *  : never
 * }
 */
function peekableIterator (iterable) {
  // @ts-ignore
  const [iterator, symbol] = iterable[Symbol.asyncIterator]
    // @ts-ignore
    ? [iterable[Symbol.asyncIterator](), Symbol.asyncIterator]
    // @ts-ignore
    : [iterable[Symbol.iterator](), Symbol.iterator]

  /** @type {any[]} */
  const queue = []

  // @ts-ignore
  return {
    peek: () => {
      return iterator.next()
    },
    push: (value) => {
      queue.push(value)
    },
    next: () => {
      if (queue.length) {
        return {
          done: false,
          value: queue.shift()
        }
      }

      return iterator.next()
    },
    [symbol] () {
      return this
    }
  }
}

module.exports = peekableIterator


/***/ }),

/***/ 7185:
/***/ ((module) => {

const rawPipe = (...fns) => {
  let res
  while (fns.length) {
    res = fns.shift()(res)
  }
  return res
}

const isIterable = obj => obj && (
  typeof obj[Symbol.asyncIterator] === 'function' ||
  typeof obj[Symbol.iterator] === 'function' ||
  typeof obj.next === 'function' // Probably, right?
)

const isDuplex = obj => obj && typeof obj.sink === 'function' && isIterable(obj.source)

const duplexPipelineFn = duplex => source => {
  duplex.sink(source) // TODO: error on sink side is unhandled rejection - this is the same as pull streams
  return duplex.source
}

const pipe = (...fns) => {
  // Duplex at start: wrap in function and return duplex source
  if (isDuplex(fns[0])) {
    const duplex = fns[0]
    fns[0] = () => duplex.source
  // Iterable at start: wrap in function
  } else if (isIterable(fns[0])) {
    const source = fns[0]
    fns[0] = () => source
  }

  if (fns.length > 1) {
    // Duplex at end: use duplex sink
    if (isDuplex(fns[fns.length - 1])) {
      fns[fns.length - 1] = fns[fns.length - 1].sink
    }
  }

  if (fns.length > 2) {
    // Duplex in the middle, consume source with duplex sink and return duplex source
    for (let i = 1; i < fns.length - 1; i++) {
      if (isDuplex(fns[i])) {
        fns[i] = duplexPipelineFn(fns[i])
      }
    }
  }

  return rawPipe(...fns)
}

module.exports = pipe
module.exports.pipe = pipe
module.exports.rawPipe = rawPipe
module.exports.isIterable = isIterable
module.exports.isDuplex = isDuplex


/***/ }),

/***/ 2360:
/***/ ((module) => {

"use strict";


/**
 * Stop iteration after n items have been received.
 *
 * @template T
 * @param {AsyncIterable<T>|Iterable<T>} source
 * @param {number} limit
 * @returns {AsyncIterable<T>}
 */
const take = async function * (source, limit) {
  let items = 0

  if (limit < 1) {
    return
  }

  for await (const entry of source) {
    yield entry

    items++

    if (items === limit) {
      return
    }
  }
}

module.exports = take


/***/ }),

/***/ 2555:
/***/ (function(module, __unused_webpack_exports, __nccwpck_require__) {

"use strict";

const isOptionObject = __nccwpck_require__(864);

const {hasOwnProperty} = Object.prototype;
const {propertyIsEnumerable} = Object;
const defineProperty = (object, name, value) => Object.defineProperty(object, name, {
	value,
	writable: true,
	enumerable: true,
	configurable: true
});

const globalThis = this;
const defaultMergeOptions = {
	concatArrays: false,
	ignoreUndefined: false
};

const getEnumerableOwnPropertyKeys = value => {
	const keys = [];

	for (const key in value) {
		if (hasOwnProperty.call(value, key)) {
			keys.push(key);
		}
	}

	/* istanbul ignore else  */
	if (Object.getOwnPropertySymbols) {
		const symbols = Object.getOwnPropertySymbols(value);

		for (const symbol of symbols) {
			if (propertyIsEnumerable.call(value, symbol)) {
				keys.push(symbol);
			}
		}
	}

	return keys;
};

function clone(value) {
	if (Array.isArray(value)) {
		return cloneArray(value);
	}

	if (isOptionObject(value)) {
		return cloneOptionObject(value);
	}

	return value;
}

function cloneArray(array) {
	const result = array.slice(0, 0);

	getEnumerableOwnPropertyKeys(array).forEach(key => {
		defineProperty(result, key, clone(array[key]));
	});

	return result;
}

function cloneOptionObject(object) {
	const result = Object.getPrototypeOf(object) === null ? Object.create(null) : {};

	getEnumerableOwnPropertyKeys(object).forEach(key => {
		defineProperty(result, key, clone(object[key]));
	});

	return result;
}

/**
 * @param {*} merged already cloned
 * @param {*} source something to merge
 * @param {string[]} keys keys to merge
 * @param {Object} config Config Object
 * @returns {*} cloned Object
 */
const mergeKeys = (merged, source, keys, config) => {
	keys.forEach(key => {
		if (typeof source[key] === 'undefined' && config.ignoreUndefined) {
			return;
		}

		// Do not recurse into prototype chain of merged
		if (key in merged && merged[key] !== Object.getPrototypeOf(merged)) {
			defineProperty(merged, key, merge(merged[key], source[key], config));
		} else {
			defineProperty(merged, key, clone(source[key]));
		}
	});

	return merged;
};

/**
 * @param {*} merged already cloned
 * @param {*} source something to merge
 * @param {Object} config Config Object
 * @returns {*} cloned Object
 *
 * see [Array.prototype.concat ( ...arguments )](http://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.concat)
 */
const concatArrays = (merged, source, config) => {
	let result = merged.slice(0, 0);
	let resultIndex = 0;

	[merged, source].forEach(array => {
		const indices = [];

		// `result.concat(array)` with cloning
		for (let k = 0; k < array.length; k++) {
			if (!hasOwnProperty.call(array, k)) {
				continue;
			}

			indices.push(String(k));

			if (array === merged) {
				// Already cloned
				defineProperty(result, resultIndex++, array[k]);
			} else {
				defineProperty(result, resultIndex++, clone(array[k]));
			}
		}

		// Merge non-index keys
		result = mergeKeys(result, array, getEnumerableOwnPropertyKeys(array).filter(key => !indices.includes(key)), config);
	});

	return result;
};

/**
 * @param {*} merged already cloned
 * @param {*} source something to merge
 * @param {Object} config Config Object
 * @returns {*} cloned Object
 */
function merge(merged, source, config) {
	if (config.concatArrays && Array.isArray(merged) && Array.isArray(source)) {
		return concatArrays(merged, source, config);
	}

	if (!isOptionObject(source) || !isOptionObject(merged)) {
		return clone(source);
	}

	return mergeKeys(merged, source, getEnumerableOwnPropertyKeys(source), config);
}

module.exports = function (...options) {
	const config = merge(clone(defaultMergeOptions), (this !== globalThis && this) || {}, defaultMergeOptions);
	let merged = {_: {}};

	for (const option of options) {
		if (option === undefined) {
			continue;
		}

		if (!isOptionObject(option)) {
			throw new TypeError('`' + option + '` is not an Option Object');
		}

		merged = merge(merged, {_: option}, config);
	}

	return merged._;
};


/***/ }),

/***/ 3973:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = minimatch
minimatch.Minimatch = Minimatch

var path = { sep: '/' }
try {
  path = __nccwpck_require__(5622)
} catch (er) {}

var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {}
var expand = __nccwpck_require__(3717)

var plTypes = {
  '!': { open: '(?:(?!(?:', close: '))[^/]*?)'},
  '?': { open: '(?:', close: ')?' },
  '+': { open: '(?:', close: ')+' },
  '*': { open: '(?:', close: ')*' },
  '@': { open: '(?:', close: ')' }
}

// any single thing other than /
// don't need to escape / when using new RegExp()
var qmark = '[^/]'

// * => any number of characters
var star = qmark + '*?'

// ** when dots are allowed.  Anything goes, except .. and .
// not (^ or / followed by one or two dots followed by $ or /),
// followed by anything, any number of times.
var twoStarDot = '(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?'

// not a ^ or / followed by a dot,
// followed by anything, any number of times.
var twoStarNoDot = '(?:(?!(?:\\\/|^)\\.).)*?'

// characters that need to be escaped in RegExp.
var reSpecials = charSet('().*{}+?[]^$\\!')

// "abc" -> { a:true, b:true, c:true }
function charSet (s) {
  return s.split('').reduce(function (set, c) {
    set[c] = true
    return set
  }, {})
}

// normalizes slashes.
var slashSplit = /\/+/

minimatch.filter = filter
function filter (pattern, options) {
  options = options || {}
  return function (p, i, list) {
    return minimatch(p, pattern, options)
  }
}

function ext (a, b) {
  a = a || {}
  b = b || {}
  var t = {}
  Object.keys(b).forEach(function (k) {
    t[k] = b[k]
  })
  Object.keys(a).forEach(function (k) {
    t[k] = a[k]
  })
  return t
}

minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return minimatch

  var orig = minimatch

  var m = function minimatch (p, pattern, options) {
    return orig.minimatch(p, pattern, ext(def, options))
  }

  m.Minimatch = function Minimatch (pattern, options) {
    return new orig.Minimatch(pattern, ext(def, options))
  }

  return m
}

Minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return Minimatch
  return minimatch.defaults(def).Minimatch
}

function minimatch (p, pattern, options) {
  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required')
  }

  if (!options) options = {}

  // shortcut: comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    return false
  }

  // "" only matches ""
  if (pattern.trim() === '') return p === ''

  return new Minimatch(pattern, options).match(p)
}

function Minimatch (pattern, options) {
  if (!(this instanceof Minimatch)) {
    return new Minimatch(pattern, options)
  }

  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required')
  }

  if (!options) options = {}
  pattern = pattern.trim()

  // windows support: need to use /, not \
  if (path.sep !== '/') {
    pattern = pattern.split(path.sep).join('/')
  }

  this.options = options
  this.set = []
  this.pattern = pattern
  this.regexp = null
  this.negate = false
  this.comment = false
  this.empty = false

  // make the set of regexps etc.
  this.make()
}

Minimatch.prototype.debug = function () {}

Minimatch.prototype.make = make
function make () {
  // don't do it more than once.
  if (this._made) return

  var pattern = this.pattern
  var options = this.options

  // empty patterns and comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    this.comment = true
    return
  }
  if (!pattern) {
    this.empty = true
    return
  }

  // step 1: figure out negation, etc.
  this.parseNegate()

  // step 2: expand braces
  var set = this.globSet = this.braceExpand()

  if (options.debug) this.debug = console.error

  this.debug(this.pattern, set)

  // step 3: now we have a set, so turn each one into a series of path-portion
  // matching patterns.
  // These will be regexps, except in the case of "**", which is
  // set to the GLOBSTAR object for globstar behavior,
  // and will not contain any / characters
  set = this.globParts = set.map(function (s) {
    return s.split(slashSplit)
  })

  this.debug(this.pattern, set)

  // glob --> regexps
  set = set.map(function (s, si, set) {
    return s.map(this.parse, this)
  }, this)

  this.debug(this.pattern, set)

  // filter out everything that didn't compile properly.
  set = set.filter(function (s) {
    return s.indexOf(false) === -1
  })

  this.debug(this.pattern, set)

  this.set = set
}

Minimatch.prototype.parseNegate = parseNegate
function parseNegate () {
  var pattern = this.pattern
  var negate = false
  var options = this.options
  var negateOffset = 0

  if (options.nonegate) return

  for (var i = 0, l = pattern.length
    ; i < l && pattern.charAt(i) === '!'
    ; i++) {
    negate = !negate
    negateOffset++
  }

  if (negateOffset) this.pattern = pattern.substr(negateOffset)
  this.negate = negate
}

// Brace expansion:
// a{b,c}d -> abd acd
// a{b,}c -> abc ac
// a{0..3}d -> a0d a1d a2d a3d
// a{b,c{d,e}f}g -> abg acdfg acefg
// a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
//
// Invalid sets are not expanded.
// a{2..}b -> a{2..}b
// a{b}c -> a{b}c
minimatch.braceExpand = function (pattern, options) {
  return braceExpand(pattern, options)
}

Minimatch.prototype.braceExpand = braceExpand

function braceExpand (pattern, options) {
  if (!options) {
    if (this instanceof Minimatch) {
      options = this.options
    } else {
      options = {}
    }
  }

  pattern = typeof pattern === 'undefined'
    ? this.pattern : pattern

  if (typeof pattern === 'undefined') {
    throw new TypeError('undefined pattern')
  }

  if (options.nobrace ||
    !pattern.match(/\{.*\}/)) {
    // shortcut. no need to expand.
    return [pattern]
  }

  return expand(pattern)
}

// parse a component of the expanded set.
// At this point, no pattern may contain "/" in it
// so we're going to return a 2d array, where each entry is the full
// pattern, split on '/', and then turned into a regular expression.
// A regexp is made at the end which joins each array with an
// escaped /, and another full one which joins each regexp with |.
//
// Following the lead of Bash 4.1, note that "**" only has special meaning
// when it is the *only* thing in a path portion.  Otherwise, any series
// of * is equivalent to a single *.  Globstar behavior is enabled by
// default, and can be disabled by setting options.noglobstar.
Minimatch.prototype.parse = parse
var SUBPARSE = {}
function parse (pattern, isSub) {
  if (pattern.length > 1024 * 64) {
    throw new TypeError('pattern is too long')
  }

  var options = this.options

  // shortcuts
  if (!options.noglobstar && pattern === '**') return GLOBSTAR
  if (pattern === '') return ''

  var re = ''
  var hasMagic = !!options.nocase
  var escaping = false
  // ? => one single character
  var patternListStack = []
  var negativeLists = []
  var stateChar
  var inClass = false
  var reClassStart = -1
  var classStart = -1
  // . and .. never match anything that doesn't start with .,
  // even when options.dot is set.
  var patternStart = pattern.charAt(0) === '.' ? '' // anything
  // not (start or / followed by . or .. followed by / or end)
  : options.dot ? '(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))'
  : '(?!\\.)'
  var self = this

  function clearStateChar () {
    if (stateChar) {
      // we had some state-tracking character
      // that wasn't consumed by this pass.
      switch (stateChar) {
        case '*':
          re += star
          hasMagic = true
        break
        case '?':
          re += qmark
          hasMagic = true
        break
        default:
          re += '\\' + stateChar
        break
      }
      self.debug('clearStateChar %j %j', stateChar, re)
      stateChar = false
    }
  }

  for (var i = 0, len = pattern.length, c
    ; (i < len) && (c = pattern.charAt(i))
    ; i++) {
    this.debug('%s\t%s %s %j', pattern, i, re, c)

    // skip over any that are escaped.
    if (escaping && reSpecials[c]) {
      re += '\\' + c
      escaping = false
      continue
    }

    switch (c) {
      case '/':
        // completely not allowed, even escaped.
        // Should already be path-split by now.
        return false

      case '\\':
        clearStateChar()
        escaping = true
      continue

      // the various stateChar values
      // for the "extglob" stuff.
      case '?':
      case '*':
      case '+':
      case '@':
      case '!':
        this.debug('%s\t%s %s %j <-- stateChar', pattern, i, re, c)

        // all of those are literals inside a class, except that
        // the glob [!a] means [^a] in regexp
        if (inClass) {
          this.debug('  in class')
          if (c === '!' && i === classStart + 1) c = '^'
          re += c
          continue
        }

        // if we already have a stateChar, then it means
        // that there was something like ** or +? in there.
        // Handle the stateChar, then proceed with this one.
        self.debug('call clearStateChar %j', stateChar)
        clearStateChar()
        stateChar = c
        // if extglob is disabled, then +(asdf|foo) isn't a thing.
        // just clear the statechar *now*, rather than even diving into
        // the patternList stuff.
        if (options.noext) clearStateChar()
      continue

      case '(':
        if (inClass) {
          re += '('
          continue
        }

        if (!stateChar) {
          re += '\\('
          continue
        }

        patternListStack.push({
          type: stateChar,
          start: i - 1,
          reStart: re.length,
          open: plTypes[stateChar].open,
          close: plTypes[stateChar].close
        })
        // negation is (?:(?!js)[^/]*)
        re += stateChar === '!' ? '(?:(?!(?:' : '(?:'
        this.debug('plType %j %j', stateChar, re)
        stateChar = false
      continue

      case ')':
        if (inClass || !patternListStack.length) {
          re += '\\)'
          continue
        }

        clearStateChar()
        hasMagic = true
        var pl = patternListStack.pop()
        // negation is (?:(?!js)[^/]*)
        // The others are (?:<pattern>)<type>
        re += pl.close
        if (pl.type === '!') {
          negativeLists.push(pl)
        }
        pl.reEnd = re.length
      continue

      case '|':
        if (inClass || !patternListStack.length || escaping) {
          re += '\\|'
          escaping = false
          continue
        }

        clearStateChar()
        re += '|'
      continue

      // these are mostly the same in regexp and glob
      case '[':
        // swallow any state-tracking char before the [
        clearStateChar()

        if (inClass) {
          re += '\\' + c
          continue
        }

        inClass = true
        classStart = i
        reClassStart = re.length
        re += c
      continue

      case ']':
        //  a right bracket shall lose its special
        //  meaning and represent itself in
        //  a bracket expression if it occurs
        //  first in the list.  -- POSIX.2 2.8.3.2
        if (i === classStart + 1 || !inClass) {
          re += '\\' + c
          escaping = false
          continue
        }

        // handle the case where we left a class open.
        // "[z-a]" is valid, equivalent to "\[z-a\]"
        if (inClass) {
          // split where the last [ was, make sure we don't have
          // an invalid re. if so, re-walk the contents of the
          // would-be class to re-translate any characters that
          // were passed through as-is
          // TODO: It would probably be faster to determine this
          // without a try/catch and a new RegExp, but it's tricky
          // to do safely.  For now, this is safe and works.
          var cs = pattern.substring(classStart + 1, i)
          try {
            RegExp('[' + cs + ']')
          } catch (er) {
            // not a valid class!
            var sp = this.parse(cs, SUBPARSE)
            re = re.substr(0, reClassStart) + '\\[' + sp[0] + '\\]'
            hasMagic = hasMagic || sp[1]
            inClass = false
            continue
          }
        }

        // finish up the class.
        hasMagic = true
        inClass = false
        re += c
      continue

      default:
        // swallow any state char that wasn't consumed
        clearStateChar()

        if (escaping) {
          // no need
          escaping = false
        } else if (reSpecials[c]
          && !(c === '^' && inClass)) {
          re += '\\'
        }

        re += c

    } // switch
  } // for

  // handle the case where we left a class open.
  // "[abc" is valid, equivalent to "\[abc"
  if (inClass) {
    // split where the last [ was, and escape it
    // this is a huge pita.  We now have to re-walk
    // the contents of the would-be class to re-translate
    // any characters that were passed through as-is
    cs = pattern.substr(classStart + 1)
    sp = this.parse(cs, SUBPARSE)
    re = re.substr(0, reClassStart) + '\\[' + sp[0]
    hasMagic = hasMagic || sp[1]
  }

  // handle the case where we had a +( thing at the *end*
  // of the pattern.
  // each pattern list stack adds 3 chars, and we need to go through
  // and escape any | chars that were passed through as-is for the regexp.
  // Go through and escape them, taking care not to double-escape any
  // | chars that were already escaped.
  for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
    var tail = re.slice(pl.reStart + pl.open.length)
    this.debug('setting tail', re, pl)
    // maybe some even number of \, then maybe 1 \, followed by a |
    tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function (_, $1, $2) {
      if (!$2) {
        // the | isn't already escaped, so escape it.
        $2 = '\\'
      }

      // need to escape all those slashes *again*, without escaping the
      // one that we need for escaping the | character.  As it works out,
      // escaping an even number of slashes can be done by simply repeating
      // it exactly after itself.  That's why this trick works.
      //
      // I am sorry that you have to see this.
      return $1 + $1 + $2 + '|'
    })

    this.debug('tail=%j\n   %s', tail, tail, pl, re)
    var t = pl.type === '*' ? star
      : pl.type === '?' ? qmark
      : '\\' + pl.type

    hasMagic = true
    re = re.slice(0, pl.reStart) + t + '\\(' + tail
  }

  // handle trailing things that only matter at the very end.
  clearStateChar()
  if (escaping) {
    // trailing \\
    re += '\\\\'
  }

  // only need to apply the nodot start if the re starts with
  // something that could conceivably capture a dot
  var addPatternStart = false
  switch (re.charAt(0)) {
    case '.':
    case '[':
    case '(': addPatternStart = true
  }

  // Hack to work around lack of negative lookbehind in JS
  // A pattern like: *.!(x).!(y|z) needs to ensure that a name
  // like 'a.xyz.yz' doesn't match.  So, the first negative
  // lookahead, has to look ALL the way ahead, to the end of
  // the pattern.
  for (var n = negativeLists.length - 1; n > -1; n--) {
    var nl = negativeLists[n]

    var nlBefore = re.slice(0, nl.reStart)
    var nlFirst = re.slice(nl.reStart, nl.reEnd - 8)
    var nlLast = re.slice(nl.reEnd - 8, nl.reEnd)
    var nlAfter = re.slice(nl.reEnd)

    nlLast += nlAfter

    // Handle nested stuff like *(*.js|!(*.json)), where open parens
    // mean that we should *not* include the ) in the bit that is considered
    // "after" the negated section.
    var openParensBefore = nlBefore.split('(').length - 1
    var cleanAfter = nlAfter
    for (i = 0; i < openParensBefore; i++) {
      cleanAfter = cleanAfter.replace(/\)[+*?]?/, '')
    }
    nlAfter = cleanAfter

    var dollar = ''
    if (nlAfter === '' && isSub !== SUBPARSE) {
      dollar = '$'
    }
    var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast
    re = newRe
  }

  // if the re is not "" at this point, then we need to make sure
  // it doesn't match against an empty path part.
  // Otherwise a/* will match a/, which it should not.
  if (re !== '' && hasMagic) {
    re = '(?=.)' + re
  }

  if (addPatternStart) {
    re = patternStart + re
  }

  // parsing just a piece of a larger pattern.
  if (isSub === SUBPARSE) {
    return [re, hasMagic]
  }

  // skip the regexp for non-magical patterns
  // unescape anything in it, though, so that it'll be
  // an exact match against a file etc.
  if (!hasMagic) {
    return globUnescape(pattern)
  }

  var flags = options.nocase ? 'i' : ''
  try {
    var regExp = new RegExp('^' + re + '$', flags)
  } catch (er) {
    // If it was an invalid regular expression, then it can't match
    // anything.  This trick looks for a character after the end of
    // the string, which is of course impossible, except in multi-line
    // mode, but it's not a /m regex.
    return new RegExp('$.')
  }

  regExp._glob = pattern
  regExp._src = re

  return regExp
}

minimatch.makeRe = function (pattern, options) {
  return new Minimatch(pattern, options || {}).makeRe()
}

Minimatch.prototype.makeRe = makeRe
function makeRe () {
  if (this.regexp || this.regexp === false) return this.regexp

  // at this point, this.set is a 2d array of partial
  // pattern strings, or "**".
  //
  // It's better to use .match().  This function shouldn't
  // be used, really, but it's pretty convenient sometimes,
  // when you just want to work with a regex.
  var set = this.set

  if (!set.length) {
    this.regexp = false
    return this.regexp
  }
  var options = this.options

  var twoStar = options.noglobstar ? star
    : options.dot ? twoStarDot
    : twoStarNoDot
  var flags = options.nocase ? 'i' : ''

  var re = set.map(function (pattern) {
    return pattern.map(function (p) {
      return (p === GLOBSTAR) ? twoStar
      : (typeof p === 'string') ? regExpEscape(p)
      : p._src
    }).join('\\\/')
  }).join('|')

  // must match entire pattern
  // ending in a * or ** will make it less strict.
  re = '^(?:' + re + ')$'

  // can match anything, as long as it's not this.
  if (this.negate) re = '^(?!' + re + ').*$'

  try {
    this.regexp = new RegExp(re, flags)
  } catch (ex) {
    this.regexp = false
  }
  return this.regexp
}

minimatch.match = function (list, pattern, options) {
  options = options || {}
  var mm = new Minimatch(pattern, options)
  list = list.filter(function (f) {
    return mm.match(f)
  })
  if (mm.options.nonull && !list.length) {
    list.push(pattern)
  }
  return list
}

Minimatch.prototype.match = match
function match (f, partial) {
  this.debug('match', f, this.pattern)
  // short-circuit in the case of busted things.
  // comments, etc.
  if (this.comment) return false
  if (this.empty) return f === ''

  if (f === '/' && partial) return true

  var options = this.options

  // windows: need to use /, not \
  if (path.sep !== '/') {
    f = f.split(path.sep).join('/')
  }

  // treat the test path as a set of pathparts.
  f = f.split(slashSplit)
  this.debug(this.pattern, 'split', f)

  // just ONE of the pattern sets in this.set needs to match
  // in order for it to be valid.  If negating, then just one
  // match means that we have failed.
  // Either way, return on the first hit.

  var set = this.set
  this.debug(this.pattern, 'set', set)

  // Find the basename of the path by looking for the last non-empty segment
  var filename
  var i
  for (i = f.length - 1; i >= 0; i--) {
    filename = f[i]
    if (filename) break
  }

  for (i = 0; i < set.length; i++) {
    var pattern = set[i]
    var file = f
    if (options.matchBase && pattern.length === 1) {
      file = [filename]
    }
    var hit = this.matchOne(file, pattern, partial)
    if (hit) {
      if (options.flipNegate) return true
      return !this.negate
    }
  }

  // didn't get any hits.  this is success if it's a negative
  // pattern, failure otherwise.
  if (options.flipNegate) return false
  return this.negate
}

// set partial to true to test if, for example,
// "/a/b" matches the start of "/*/b/*/d"
// Partial means, if you run out of file before you run
// out of pattern, then that's fine, as long as all
// the parts match.
Minimatch.prototype.matchOne = function (file, pattern, partial) {
  var options = this.options

  this.debug('matchOne',
    { 'this': this, file: file, pattern: pattern })

  this.debug('matchOne', file.length, pattern.length)

  for (var fi = 0,
      pi = 0,
      fl = file.length,
      pl = pattern.length
      ; (fi < fl) && (pi < pl)
      ; fi++, pi++) {
    this.debug('matchOne loop')
    var p = pattern[pi]
    var f = file[fi]

    this.debug(pattern, p, f)

    // should be impossible.
    // some invalid regexp stuff in the set.
    if (p === false) return false

    if (p === GLOBSTAR) {
      this.debug('GLOBSTAR', [pattern, p, f])

      // "**"
      // a/**/b/**/c would match the following:
      // a/b/x/y/z/c
      // a/x/y/z/b/c
      // a/b/x/b/x/c
      // a/b/c
      // To do this, take the rest of the pattern after
      // the **, and see if it would match the file remainder.
      // If so, return success.
      // If not, the ** "swallows" a segment, and try again.
      // This is recursively awful.
      //
      // a/**/b/**/c matching a/b/x/y/z/c
      // - a matches a
      // - doublestar
      //   - matchOne(b/x/y/z/c, b/**/c)
      //     - b matches b
      //     - doublestar
      //       - matchOne(x/y/z/c, c) -> no
      //       - matchOne(y/z/c, c) -> no
      //       - matchOne(z/c, c) -> no
      //       - matchOne(c, c) yes, hit
      var fr = fi
      var pr = pi + 1
      if (pr === pl) {
        this.debug('** at the end')
        // a ** at the end will just swallow the rest.
        // We have found a match.
        // however, it will not swallow /.x, unless
        // options.dot is set.
        // . and .. are *never* matched by **, for explosively
        // exponential reasons.
        for (; fi < fl; fi++) {
          if (file[fi] === '.' || file[fi] === '..' ||
            (!options.dot && file[fi].charAt(0) === '.')) return false
        }
        return true
      }

      // ok, let's see if we can swallow whatever we can.
      while (fr < fl) {
        var swallowee = file[fr]

        this.debug('\nglobstar while', file, fr, pattern, pr, swallowee)

        // XXX remove this slice.  Just pass the start index.
        if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
          this.debug('globstar found match!', fr, fl, swallowee)
          // found a match.
          return true
        } else {
          // can't swallow "." or ".." ever.
          // can only swallow ".foo" when explicitly asked.
          if (swallowee === '.' || swallowee === '..' ||
            (!options.dot && swallowee.charAt(0) === '.')) {
            this.debug('dot detected!', file, fr, pattern, pr)
            break
          }

          // ** swallows a segment, and continue.
          this.debug('globstar swallow a segment, and continue')
          fr++
        }
      }

      // no match was found.
      // However, in partial mode, we can't say this is necessarily over.
      // If there's more *pattern* left, then
      if (partial) {
        // ran out of file
        this.debug('\n>>> no match, partial?', file, fr, pattern, pr)
        if (fr === fl) return true
      }
      return false
    }

    // something other than **
    // non-magic patterns just have to match exactly
    // patterns with magic have been turned into regexps.
    var hit
    if (typeof p === 'string') {
      if (options.nocase) {
        hit = f.toLowerCase() === p.toLowerCase()
      } else {
        hit = f === p
      }
      this.debug('string match', p, f, hit)
    } else {
      hit = f.match(p)
      this.debug('pattern match', p, f, hit)
    }

    if (!hit) return false
  }

  // Note: ending in / means that we'll get a final ""
  // at the end of the pattern.  This can only match a
  // corresponding "" at the end of the file.
  // If the file ends in /, then it can only match a
  // a pattern that ends in /, unless the pattern just
  // doesn't have any more for it. But, a/b/ should *not*
  // match "a/b/*", even though "" matches against the
  // [^/]*? pattern, except in partial mode, where it might
  // simply not be reached yet.
  // However, a/b/ should still satisfy a/*

  // now either we fell off the end of the pattern, or we're done.
  if (fi === fl && pi === pl) {
    // ran out of pattern and filename at the same time.
    // an exact hit!
    return true
  } else if (fi === fl) {
    // ran out of file, but still had pattern left.
    // this is ok if we're doing the match as part of
    // a glob fs traversal.
    return partial
  } else if (pi === pl) {
    // ran out of pattern, still have file left.
    // this is only acceptable if we're on the very last
    // empty segment of a file with a trailing slash.
    // a/* should match a/b/
    var emptyFileEnd = (fi === fl - 1) && (file[fi] === '')
    return emptyFileEnd
  }

  // should be unreachable.
  throw new Error('wtf?')
}

// replace stuff like \* with *
function globUnescape (s) {
  return s.replace(/\\(.)/g, '$1')
}

function regExpEscape (s) {
  return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}


/***/ }),

/***/ 5653:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var baseX$1 = __nccwpck_require__(228);
var bytes = __nccwpck_require__(6507);

class Encoder {
  constructor(name, prefix, baseEncode) {
    this.name = name;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  encode(bytes) {
    if (bytes instanceof Uint8Array) {
      return `${ this.prefix }${ this.baseEncode(bytes) }`;
    } else {
      throw Error('Unknown type, must be binary type');
    }
  }
}
class Decoder {
  constructor(name, prefix, baseDecode) {
    this.name = name;
    this.prefix = prefix;
    this.baseDecode = baseDecode;
  }
  decode(text) {
    if (typeof text === 'string') {
      switch (text[0]) {
      case this.prefix: {
          return this.baseDecode(text.slice(1));
        }
      default: {
          throw Error(`Unable to decode multibase string ${ JSON.stringify(text) }, ${ this.name } decoder only supports inputs prefixed with ${ this.prefix }`);
        }
      }
    } else {
      throw Error('Can only multibase decode strings');
    }
  }
  or(decoder) {
    const decoders = {
      [this.prefix]: this,
      ...decoder.decoders || { [decoder.prefix]: decoder }
    };
    return new ComposedDecoder(decoders);
  }
}
class ComposedDecoder {
  constructor(decoders) {
    this.decoders = decoders;
  }
  or(decoder) {
    const other = decoder.decoders || { [decoder.prefix]: decoder };
    return new ComposedDecoder({
      ...this.decoders,
      ...other
    });
  }
  decode(input) {
    const prefix = input[0];
    const decoder = this.decoders[prefix];
    if (decoder) {
      return decoder.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${ JSON.stringify(input) }, only inputs prefixed with ${ Object.keys(this.decoders) } are supported`);
    }
  }
}
class Codec {
  constructor(name, prefix, baseEncode, baseDecode) {
    this.name = name;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder(name, prefix, baseEncode);
    this.decoder = new Decoder(name, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
}
const from = ({name, prefix, encode, decode}) => new Codec(name, prefix, encode, decode);
const baseX = ({prefix, name, alphabet}) => {
  const {encode, decode} = baseX$1(alphabet, name);
  return from({
    prefix,
    name,
    encode,
    decode: text => bytes.coerce(decode(text))
  });
};
const decode = (string, alphabet, bitsPerChar, name) => {
  const codes = {};
  for (let i = 0; i < alphabet.length; ++i) {
    codes[alphabet[i]] = i;
  }
  let end = string.length;
  while (string[end - 1] === '=') {
    --end;
  }
  const out = new Uint8Array(end * bitsPerChar / 8 | 0);
  let bits = 0;
  let buffer = 0;
  let written = 0;
  for (let i = 0; i < end; ++i) {
    const value = codes[string[i]];
    if (value === undefined) {
      throw new SyntaxError(`Non-${ name } character`);
    }
    buffer = buffer << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer >> bits;
    }
  }
  if (bits >= bitsPerChar || 255 & buffer << 8 - bits) {
    throw new SyntaxError('Unexpected end of data');
  }
  return out;
};
const encode = (data, alphabet, bitsPerChar) => {
  const pad = alphabet[alphabet.length - 1] === '=';
  const mask = (1 << bitsPerChar) - 1;
  let out = '';
  let bits = 0;
  let buffer = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer = buffer << 8 | data[i];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet[mask & buffer >> bits];
    }
  }
  if (bits) {
    out += alphabet[mask & buffer << bitsPerChar - bits];
  }
  if (pad) {
    while (out.length * bitsPerChar & 7) {
      out += '=';
    }
  }
  return out;
};
const rfc4648 = ({name, prefix, bitsPerChar, alphabet}) => {
  return from({
    prefix,
    name,
    encode(input) {
      return encode(input, alphabet, bitsPerChar);
    },
    decode(input) {
      return decode(input, alphabet, bitsPerChar, name);
    }
  });
};

exports.Codec = Codec;
exports.baseX = baseX;
exports.from = from;
exports.rfc4648 = rfc4648;


/***/ }),

/***/ 6196:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var base = __nccwpck_require__(5653);

const base10 = base.baseX({
  prefix: '9',
  name: 'base10',
  alphabet: '0123456789'
});

exports.base10 = base10;


/***/ }),

/***/ 2168:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var base = __nccwpck_require__(5653);

const base16 = base.rfc4648({
  prefix: 'f',
  name: 'base16',
  alphabet: '0123456789abcdef',
  bitsPerChar: 4
});
const base16upper = base.rfc4648({
  prefix: 'F',
  name: 'base16upper',
  alphabet: '0123456789ABCDEF',
  bitsPerChar: 4
});

exports.base16 = base16;
exports.base16upper = base16upper;


/***/ }),

/***/ 9383:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var base = __nccwpck_require__(5653);

const base2 = base.rfc4648({
  prefix: '0',
  name: 'base2',
  alphabet: '01',
  bitsPerChar: 1
});

exports.base2 = base2;


/***/ }),

/***/ 2884:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var base = __nccwpck_require__(5653);

const base32 = base.rfc4648({
  prefix: 'b',
  name: 'base32',
  alphabet: 'abcdefghijklmnopqrstuvwxyz234567',
  bitsPerChar: 5
});
const base32upper = base.rfc4648({
  prefix: 'B',
  name: 'base32upper',
  alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
  bitsPerChar: 5
});
const base32pad = base.rfc4648({
  prefix: 'c',
  name: 'base32pad',
  alphabet: 'abcdefghijklmnopqrstuvwxyz234567=',
  bitsPerChar: 5
});
const base32padupper = base.rfc4648({
  prefix: 'C',
  name: 'base32padupper',
  alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=',
  bitsPerChar: 5
});
const base32hex = base.rfc4648({
  prefix: 'v',
  name: 'base32hex',
  alphabet: '0123456789abcdefghijklmnopqrstuv',
  bitsPerChar: 5
});
const base32hexupper = base.rfc4648({
  prefix: 'V',
  name: 'base32hexupper',
  alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUV',
  bitsPerChar: 5
});
const base32hexpad = base.rfc4648({
  prefix: 't',
  name: 'base32hexpad',
  alphabet: '0123456789abcdefghijklmnopqrstuv=',
  bitsPerChar: 5
});
const base32hexpadupper = base.rfc4648({
  prefix: 'T',
  name: 'base32hexpadupper',
  alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUV=',
  bitsPerChar: 5
});
const base32z = base.rfc4648({
  prefix: 'h',
  name: 'base32z',
  alphabet: 'ybndrfg8ejkmcpqxot1uwisza345h769',
  bitsPerChar: 5
});

exports.base32 = base32;
exports.base32hex = base32hex;
exports.base32hexpad = base32hexpad;
exports.base32hexpadupper = base32hexpadupper;
exports.base32hexupper = base32hexupper;
exports.base32pad = base32pad;
exports.base32padupper = base32padupper;
exports.base32upper = base32upper;
exports.base32z = base32z;


/***/ }),

/***/ 9587:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var base = __nccwpck_require__(5653);

const base36 = base.baseX({
  prefix: 'k',
  name: 'base36',
  alphabet: '0123456789abcdefghijklmnopqrstuvwxyz'
});
const base36upper = base.baseX({
  prefix: 'K',
  name: 'base36upper',
  alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
});

exports.base36 = base36;
exports.base36upper = base36upper;


/***/ }),

/***/ 5648:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var base = __nccwpck_require__(5653);

const base58btc = base.baseX({
  name: 'base58btc',
  prefix: 'z',
  alphabet: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
});
const base58flickr = base.baseX({
  name: 'base58flickr',
  prefix: 'Z',
  alphabet: '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'
});

exports.base58btc = base58btc;
exports.base58flickr = base58flickr;


/***/ }),

/***/ 3095:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var base = __nccwpck_require__(5653);

const base64 = base.rfc4648({
  prefix: 'm',
  name: 'base64',
  alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
  bitsPerChar: 6
});
const base64pad = base.rfc4648({
  prefix: 'M',
  name: 'base64pad',
  alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
  bitsPerChar: 6
});
const base64url = base.rfc4648({
  prefix: 'u',
  name: 'base64url',
  alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',
  bitsPerChar: 6
});
const base64urlpad = base.rfc4648({
  prefix: 'U',
  name: 'base64urlpad',
  alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=',
  bitsPerChar: 6
});

exports.base64 = base64;
exports.base64pad = base64pad;
exports.base64url = base64url;
exports.base64urlpad = base64urlpad;


/***/ }),

/***/ 7233:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var base = __nccwpck_require__(5653);

const base8 = base.rfc4648({
  prefix: '7',
  name: 'base8',
  alphabet: '01234567',
  bitsPerChar: 3
});

exports.base8 = base8;


/***/ }),

/***/ 7197:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var base = __nccwpck_require__(5653);
var bytes = __nccwpck_require__(6507);

const identity = base.from({
  prefix: '\0',
  name: 'identity',
  encode: buf => bytes.toString(buf),
  decode: str => bytes.fromString(str)
});

exports.identity = identity;


/***/ }),

/***/ 1046:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var identity = __nccwpck_require__(7197);
var base2 = __nccwpck_require__(9383);
var base8 = __nccwpck_require__(7233);
var base10 = __nccwpck_require__(6196);
var base16 = __nccwpck_require__(2168);
var base32 = __nccwpck_require__(2884);
var base36 = __nccwpck_require__(9587);
var base58 = __nccwpck_require__(5648);
var base64 = __nccwpck_require__(3095);
var sha2 = __nccwpck_require__(6987);
var identity$1 = __nccwpck_require__(2379);
var raw = __nccwpck_require__(2048);
var json = __nccwpck_require__(5336);
__nccwpck_require__(5978);
var cid = __nccwpck_require__(6447);
var hasher = __nccwpck_require__(92);
var digest = __nccwpck_require__(76);
var varint = __nccwpck_require__(4972);
var bytes = __nccwpck_require__(6507);

const bases = {
  ...identity,
  ...base2,
  ...base8,
  ...base10,
  ...base16,
  ...base32,
  ...base36,
  ...base58,
  ...base64
};
const hashes = {
  ...sha2,
  ...identity$1
};
const codecs = {
  raw,
  json
};

exports.CID = cid.CID;
exports.hasher = hasher;
exports.digest = digest;
exports.varint = varint;
exports.bytes = bytes;
exports.bases = bases;
exports.codecs = codecs;
exports.hashes = hashes;


/***/ }),

/***/ 4594:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

__nccwpck_require__(5978);
var cid = __nccwpck_require__(6447);
var bytes = __nccwpck_require__(6507);

const readonly = ({enumerable = true, configurable = false} = {}) => ({
  enumerable,
  configurable,
  writable: false
});
const links = function* (source, base) {
  if (source == null)
    return;
  if (source instanceof Uint8Array)
    return;
  for (const [key, value] of Object.entries(source)) {
    const path = [
      ...base,
      key
    ];
    if (value != null && typeof value === 'object') {
      if (Array.isArray(value)) {
        for (const [index, element] of value.entries()) {
          const elementPath = [
            ...path,
            index
          ];
          const cid$1 = cid.CID.asCID(element);
          if (cid$1) {
            yield [
              elementPath.join('/'),
              cid$1
            ];
          } else if (typeof element === 'object') {
            yield* links(element, elementPath);
          }
        }
      } else {
        const cid$1 = cid.CID.asCID(value);
        if (cid$1) {
          yield [
            path.join('/'),
            cid$1
          ];
        } else {
          yield* links(value, path);
        }
      }
    }
  }
};
const tree = function* (source, base) {
  if (source == null)
    return;
  for (const [key, value] of Object.entries(source)) {
    const path = [
      ...base,
      key
    ];
    yield path.join('/');
    if (value != null && !(value instanceof Uint8Array) && typeof value === 'object' && !cid.CID.asCID(value)) {
      if (Array.isArray(value)) {
        for (const [index, element] of value.entries()) {
          const elementPath = [
            ...path,
            index
          ];
          yield elementPath.join('/');
          if (typeof element === 'object' && !cid.CID.asCID(element)) {
            yield* tree(element, elementPath);
          }
        }
      } else {
        yield* tree(value, path);
      }
    }
  }
};
const get = (source, path) => {
  let node = source;
  for (const [index, key] of path.entries()) {
    node = node[key];
    if (node == null) {
      throw new Error(`Object has no property at ${ path.slice(0, index + 1).map(part => `[${ JSON.stringify(part) }]`).join('') }`);
    }
    const cid$1 = cid.CID.asCID(node);
    if (cid$1) {
      return {
        value: cid$1,
        remaining: path.slice(index + 1).join('/')
      };
    }
  }
  return { value: node };
};
class Block {
  constructor({cid, bytes, value}) {
    if (!cid || !bytes || typeof value === 'undefined')
      throw new Error('Missing required argument');
    this.cid = cid;
    this.bytes = bytes;
    this.value = value;
    this.asBlock = this;
    Object.defineProperties(this, {
      cid: readonly(),
      bytes: readonly(),
      value: readonly(),
      asBlock: readonly()
    });
  }
  links() {
    return links(this.value, []);
  }
  tree() {
    return tree(this.value, []);
  }
  get(path = '/') {
    return get(this.value, path.split('/').filter(Boolean));
  }
}
const encode = async ({value, codec, hasher}) => {
  if (typeof value === 'undefined')
    throw new Error('Missing required argument "value"');
  if (!codec || !hasher)
    throw new Error('Missing required argument: codec or hasher');
  const bytes = codec.encode(value);
  const hash = await hasher.digest(bytes);
  const cid$1 = cid.CID.create(1, codec.code, hash);
  return new Block({
    value,
    bytes,
    cid: cid$1
  });
};
const decode = async ({bytes, codec, hasher}) => {
  if (!bytes)
    throw new Error('Missing required argument "bytes"');
  if (!codec || !hasher)
    throw new Error('Missing required argument: codec or hasher');
  const value = codec.decode(bytes);
  const hash = await hasher.digest(bytes);
  const cid$1 = cid.CID.create(1, codec.code, hash);
  return new Block({
    value,
    bytes,
    cid: cid$1
  });
};
const createUnsafe = ({
  bytes,
  cid,
  value: maybeValue,
  codec
}) => {
  const value = maybeValue !== undefined ? maybeValue : codec && codec.decode(bytes);
  if (value === undefined)
    throw new Error('Missing required argument, must either provide "value" or "codec"');
  return new Block({
    cid,
    bytes,
    value
  });
};
const create = async ({bytes: bytes$1, cid, hasher, codec}) => {
  if (!bytes$1)
    throw new Error('Missing required argument "bytes"');
  if (!hasher)
    throw new Error('Missing required argument "hasher"');
  const value = codec.decode(bytes$1);
  const hash = await hasher.digest(bytes$1);
  if (!bytes.equals(cid.multihash.bytes, hash.bytes)) {
    throw new Error('CID hash does not match bytes');
  }
  return createUnsafe({
    bytes: bytes$1,
    cid,
    value,
    codec
  });
};

exports.Block = Block;
exports.create = create;
exports.createUnsafe = createUnsafe;
exports.decode = decode;
exports.encode = encode;


/***/ }),

/***/ 6507:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

const empty = new Uint8Array(0);
const toHex = d => d.reduce((hex, byte) => hex + byte.toString(16).padStart(2, '0'), '');
const fromHex = hex => {
  const hexes = hex.match(/../g);
  return hexes ? new Uint8Array(hexes.map(b => parseInt(b, 16))) : empty;
};
const equals = (aa, bb) => {
  if (aa === bb)
    return true;
  if (aa.byteLength !== bb.byteLength) {
    return false;
  }
  for (let ii = 0; ii < aa.byteLength; ii++) {
    if (aa[ii] !== bb[ii]) {
      return false;
    }
  }
  return true;
};
const coerce = o => {
  if (o instanceof Uint8Array && o.constructor.name === 'Uint8Array')
    return o;
  if (o instanceof ArrayBuffer)
    return new Uint8Array(o);
  if (ArrayBuffer.isView(o)) {
    return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
  }
  throw new Error('Unknown type, must be binary type');
};
const isBinary = o => o instanceof ArrayBuffer || ArrayBuffer.isView(o);
const fromString = str => new TextEncoder().encode(str);
const toString = b => new TextDecoder().decode(b);

exports.coerce = coerce;
exports.empty = empty;
exports.equals = equals;
exports.fromHex = fromHex;
exports.fromString = fromString;
exports.isBinary = isBinary;
exports.toHex = toHex;
exports.toString = toString;


/***/ }),

/***/ 6447:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var varint = __nccwpck_require__(4972);
var digest = __nccwpck_require__(76);
var base58 = __nccwpck_require__(5648);
var base32 = __nccwpck_require__(2884);
var bytes = __nccwpck_require__(6507);

class CID {
  constructor(version, code, multihash, bytes) {
    this.code = code;
    this.version = version;
    this.multihash = multihash;
    this.bytes = bytes;
    this.byteOffset = bytes.byteOffset;
    this.byteLength = bytes.byteLength;
    this.asCID = this;
    this._baseCache = new Map();
    Object.defineProperties(this, {
      byteOffset: hidden,
      byteLength: hidden,
      code: readonly,
      version: readonly,
      multihash: readonly,
      bytes: readonly,
      _baseCache: hidden,
      asCID: hidden
    });
  }
  toV0() {
    switch (this.version) {
    case 0: {
        return this;
      }
    default: {
        const {code, multihash} = this;
        if (code !== DAG_PB_CODE) {
          throw new Error('Cannot convert a non dag-pb CID to CIDv0');
        }
        if (multihash.code !== SHA_256_CODE) {
          throw new Error('Cannot convert non sha2-256 multihash CID to CIDv0');
        }
        return CID.createV0(multihash);
      }
    }
  }
  toV1() {
    switch (this.version) {
    case 0: {
        const {code, digest: digest$1} = this.multihash;
        const multihash = digest.create(code, digest$1);
        return CID.createV1(this.code, multihash);
      }
    case 1: {
        return this;
      }
    default: {
        throw Error(`Can not convert CID version ${ this.version } to version 0. This is a bug please report`);
      }
    }
  }
  equals(other) {
    return other && this.code === other.code && this.version === other.version && digest.equals(this.multihash, other.multihash);
  }
  toString(base) {
    const {bytes, version, _baseCache} = this;
    switch (version) {
    case 0:
      return toStringV0(bytes, _baseCache, base || base58.base58btc.encoder);
    default:
      return toStringV1(bytes, _baseCache, base || base32.base32.encoder);
    }
  }
  toJSON() {
    return {
      code: this.code,
      version: this.version,
      hash: this.multihash.bytes
    };
  }
  get [Symbol.toStringTag]() {
    return 'CID';
  }
  [Symbol.for('nodejs.util.inspect.custom')]() {
    return 'CID(' + this.toString() + ')';
  }
  static isCID(value) {
    deprecate(/^0\.0/, IS_CID_DEPRECATION);
    return !!(value && (value[cidSymbol] || value.asCID === value));
  }
  get toBaseEncodedString() {
    throw new Error('Deprecated, use .toString()');
  }
  get codec() {
    throw new Error('"codec" property is deprecated, use integer "code" property instead');
  }
  get buffer() {
    throw new Error('Deprecated .buffer property, use .bytes to get Uint8Array instead');
  }
  get multibaseName() {
    throw new Error('"multibaseName" property is deprecated');
  }
  get prefix() {
    throw new Error('"prefix" property is deprecated');
  }
  static asCID(value) {
    if (value instanceof CID) {
      return value;
    } else if (value != null && value.asCID === value) {
      const {version, code, multihash, bytes} = value;
      return new CID(version, code, multihash, bytes || encodeCID(version, code, multihash.bytes));
    } else if (value != null && value[cidSymbol] === true) {
      const {version, multihash, code} = value;
      const digest$1 = digest.decode(multihash);
      return CID.create(version, code, digest$1);
    } else {
      return null;
    }
  }
  static create(version, code, digest) {
    if (typeof code !== 'number') {
      throw new Error('String codecs are no longer supported');
    }
    switch (version) {
    case 0: {
        if (code !== DAG_PB_CODE) {
          throw new Error(`Version 0 CID must use dag-pb (code: ${ DAG_PB_CODE }) block encoding`);
        } else {
          return new CID(version, code, digest, digest.bytes);
        }
      }
    case 1: {
        const bytes = encodeCID(version, code, digest.bytes);
        return new CID(version, code, digest, bytes);
      }
    default: {
        throw new Error('Invalid version');
      }
    }
  }
  static createV0(digest) {
    return CID.create(0, DAG_PB_CODE, digest);
  }
  static createV1(code, digest) {
    return CID.create(1, code, digest);
  }
  static decode(bytes) {
    const [cid, remainder] = CID.decodeFirst(bytes);
    if (remainder.length) {
      throw new Error('Incorrect length');
    }
    return cid;
  }
  static decodeFirst(bytes$1) {
    const specs = CID.inspectBytes(bytes$1);
    const prefixSize = specs.size - specs.multihashSize;
    const multihashBytes = bytes.coerce(bytes$1.subarray(prefixSize, prefixSize + specs.multihashSize));
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error('Incorrect length');
    }
    const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
    const digest$1 = new digest.Digest(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
    const cid = specs.version === 0 ? CID.createV0(digest$1) : CID.createV1(specs.codec, digest$1);
    return [
      cid,
      bytes$1.subarray(specs.size)
    ];
  }
  static inspectBytes(initialBytes) {
    let offset = 0;
    const next = () => {
      const [i, length] = varint.decode(initialBytes.subarray(offset));
      offset += length;
      return i;
    };
    let version = next();
    let codec = DAG_PB_CODE;
    if (version === 18) {
      version = 0;
      offset = 0;
    } else if (version === 1) {
      codec = next();
    }
    if (version !== 0 && version !== 1) {
      throw new RangeError(`Invalid CID version ${ version }`);
    }
    const prefixSize = offset;
    const multihashCode = next();
    const digestSize = next();
    const size = offset + digestSize;
    const multihashSize = size - prefixSize;
    return {
      version,
      codec,
      multihashCode,
      digestSize,
      multihashSize,
      size
    };
  }
  static parse(source, base) {
    const [prefix, bytes] = parseCIDtoBytes(source, base);
    const cid = CID.decode(bytes);
    cid._baseCache.set(prefix, source);
    return cid;
  }
}
const parseCIDtoBytes = (source, base) => {
  switch (source[0]) {
  case 'Q': {
      const decoder = base || base58.base58btc;
      return [
        base58.base58btc.prefix,
        decoder.decode(`${ base58.base58btc.prefix }${ source }`)
      ];
    }
  case base58.base58btc.prefix: {
      const decoder = base || base58.base58btc;
      return [
        base58.base58btc.prefix,
        decoder.decode(source)
      ];
    }
  case base32.base32.prefix: {
      const decoder = base || base32.base32;
      return [
        base32.base32.prefix,
        decoder.decode(source)
      ];
    }
  default: {
      if (base == null) {
        throw Error('To parse non base32 or base58btc encoded CID multibase decoder must be provided');
      }
      return [
        source[0],
        base.decode(source)
      ];
    }
  }
};
const toStringV0 = (bytes, cache, base) => {
  const {prefix} = base;
  if (prefix !== base58.base58btc.prefix) {
    throw Error(`Cannot string encode V0 in ${ base.name } encoding`);
  }
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid = base.encode(bytes).slice(1);
    cache.set(prefix, cid);
    return cid;
  } else {
    return cid;
  }
};
const toStringV1 = (bytes, cache, base) => {
  const {prefix} = base;
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid = base.encode(bytes);
    cache.set(prefix, cid);
    return cid;
  } else {
    return cid;
  }
};
const DAG_PB_CODE = 112;
const SHA_256_CODE = 18;
const encodeCID = (version, code, multihash) => {
  const codeOffset = varint.encodingLength(version);
  const hashOffset = codeOffset + varint.encodingLength(code);
  const bytes = new Uint8Array(hashOffset + multihash.byteLength);
  varint.encodeTo(version, bytes, 0);
  varint.encodeTo(code, bytes, codeOffset);
  bytes.set(multihash, hashOffset);
  return bytes;
};
const cidSymbol = Symbol.for('@ipld/js-cid/CID');
const readonly = {
  writable: false,
  configurable: false,
  enumerable: true
};
const hidden = {
  writable: false,
  enumerable: false,
  configurable: false
};
const version = '0.0.0-dev';
const deprecate = (range, message) => {
  if (range.test(version)) {
    console.warn(message);
  } else {
    throw new Error(message);
  }
};
const IS_CID_DEPRECATION = `CID.isCID(v) is deprecated and will be removed in the next major release.
Following code pattern:

if (CID.isCID(value)) {
  doSomethingWithCID(value)
}

Is replaced with:

const cid = CID.asCID(value)
if (cid) {
  // Make sure to use cid instead of value
  doSomethingWithCID(cid)
}
`;

exports.CID = CID;


/***/ }),

/***/ 5336:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

const {name, code, encode, decode} = {
  name: 'json',
  code: 512,
  encode: json => new TextEncoder().encode(JSON.stringify(json)),
  decode: bytes => JSON.parse(new TextDecoder().decode(bytes))
};

exports.code = code;
exports.decode = decode;
exports.encode = encode;
exports.name = name;


/***/ }),

/***/ 2048:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var bytes = __nccwpck_require__(6507);

const raw = bytes$1 => bytes.coerce(bytes$1);
const {name, code, encode, decode} = {
  name: 'raw',
  code: 85,
  decode: raw,
  encode: raw
};

exports.code = code;
exports.decode = decode;
exports.encode = encode;
exports.name = name;


/***/ }),

/***/ 76:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var bytes = __nccwpck_require__(6507);
var varint = __nccwpck_require__(4972);

const create = (code, digest) => {
  const size = digest.byteLength;
  const sizeOffset = varint.encodingLength(code);
  const digestOffset = sizeOffset + varint.encodingLength(size);
  const bytes = new Uint8Array(digestOffset + size);
  varint.encodeTo(code, bytes, 0);
  varint.encodeTo(size, bytes, sizeOffset);
  bytes.set(digest, digestOffset);
  return new Digest(code, size, digest, bytes);
};
const decode = multihash => {
  const bytes$1 = bytes.coerce(multihash);
  const [code, sizeOffset] = varint.decode(bytes$1);
  const [size, digestOffset] = varint.decode(bytes$1.subarray(sizeOffset));
  const digest = bytes$1.subarray(sizeOffset + digestOffset);
  if (digest.byteLength !== size) {
    throw new Error('Incorrect length');
  }
  return new Digest(code, size, digest, bytes$1);
};
const equals = (a, b) => {
  if (a === b) {
    return true;
  } else {
    return a.code === b.code && a.size === b.size && bytes.equals(a.bytes, b.bytes);
  }
};
class Digest {
  constructor(code, size, digest, bytes) {
    this.code = code;
    this.size = size;
    this.digest = digest;
    this.bytes = bytes;
  }
}

exports.Digest = Digest;
exports.create = create;
exports.decode = decode;
exports.equals = equals;


/***/ }),

/***/ 92:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var digest = __nccwpck_require__(76);

const from = ({name, code, encode}) => new Hasher(name, code, encode);
class Hasher {
  constructor(name, code, encode) {
    this.name = name;
    this.code = code;
    this.encode = encode;
  }
  async digest(input) {
    if (input instanceof Uint8Array) {
      const digest$1 = await this.encode(input);
      return digest.create(this.code, digest$1);
    } else {
      throw Error('Unknown type, must be binary type');
    }
  }
}

exports.Hasher = Hasher;
exports.from = from;


/***/ }),

/***/ 2379:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var hasher = __nccwpck_require__(92);
var bytes = __nccwpck_require__(6507);

const identity = hasher.from({
  name: 'identity',
  code: 0,
  encode: input => bytes.coerce(input)
});

exports.identity = identity;


/***/ }),

/***/ 6987:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var crypto = __nccwpck_require__(6417);
var hasher = __nccwpck_require__(92);
var bytes = __nccwpck_require__(6507);

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var crypto__default = /*#__PURE__*/_interopDefaultLegacy(crypto);

const sha256 = hasher.from({
  name: 'sha2-256',
  code: 18,
  encode: input => bytes.coerce(crypto__default['default'].createHash('sha256').update(input).digest())
});
const sha512 = hasher.from({
  name: 'sha2-512',
  code: 19,
  encode: input => bytes.coerce(crypto__default['default'].createHash('sha512').update(input).digest())
});

exports.sha256 = sha256;
exports.sha512 = sha512;


/***/ }),

/***/ 5978:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var cid = __nccwpck_require__(6447);
var varint = __nccwpck_require__(4972);
var bytes = __nccwpck_require__(6507);
var hasher = __nccwpck_require__(92);
var digest = __nccwpck_require__(76);



exports.CID = cid.CID;
exports.varint = varint;
exports.bytes = bytes;
exports.hasher = hasher;
exports.digest = digest;


/***/ }),

/***/ 4972:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var varint$1 = __nccwpck_require__(4890);

const decode = data => {
  const code = varint$1.decode(data);
  return [
    code,
    varint$1.decode.bytes
  ];
};
const encodeTo = (int, target, offset = 0) => {
  varint$1.encode(int, target, offset);
  return target;
};
const encodingLength = int => {
  return varint$1.encodingLength(int);
};

exports.decode = decode;
exports.encodeTo = encodeTo;
exports.encodingLength = encodingLength;


/***/ }),

/***/ 228:
/***/ ((module) => {

"use strict";


function base(ALPHABET, name) {
  if (ALPHABET.length >= 255) {
    throw new TypeError('Alphabet too long');
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i);
    var xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + ' is ambiguous');
    }
    BASE_MAP[xc] = i;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode(source) {
    if (source instanceof Uint8Array);
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError('Expected Uint8Array');
    }
    if (source.length === 0) {
      return '';
    }
    var zeroes = 0;
    var length = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i = 0;
      for (var it1 = size - 1; (carry !== 0 || i < length) && it1 !== -1; it1--, i++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error('Non-zero carry');
      }
      length = i;
      pbegin++;
    }
    var it2 = size - length;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== 'string') {
      throw new TypeError('Expected String');
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source[psz] === ' ') {
      return;
    }
    var zeroes = 0;
    var length = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size = (source.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i = 0;
      for (var it3 = size - 1; (carry !== 0 || i < length) && it3 !== -1; it3--, i++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error('Non-zero carry');
      }
      length = i;
      psz++;
    }
    if (source[psz] === ' ') {
      return;
    }
    var it4 = size - length;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size - it4));
    var j = zeroes;
    while (it4 !== size) {
      vch[j++] = b256[it4++];
    }
    return vch;
  }
  function decode(string) {
    var buffer = decodeUnsafe(string);
    if (buffer) {
      return buffer;
    }
    throw new Error(`Non-${ name } character`);
  }
  return {
    encode: encode,
    decodeUnsafe: decodeUnsafe,
    decode: decode
  };
}
var src = base;
var _brrp__multiformats_scope_baseX = src;

module.exports = _brrp__multiformats_scope_baseX;


/***/ }),

/***/ 4890:
/***/ ((module) => {

"use strict";


var encode_1 = encode;
var MSB = 128, REST = 127, MSBALL = ~REST, INT = Math.pow(2, 31);
function encode(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT) {
    out[offset++] = num & 255 | MSB;
    num /= 128;
  }
  while (num & MSBALL) {
    out[offset++] = num & 255 | MSB;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode.bytes = offset - oldOffset + 1;
  return out;
}
var decode = read;
var MSB$1 = 128, REST$1 = 127;
function read(buf, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf.length;
  do {
    if (counter >= l) {
      read.bytes = 0;
      throw new RangeError('Could not decode varint');
    }
    b = buf[counter++];
    res += shift < 28 ? (b & REST$1) << shift : (b & REST$1) * Math.pow(2, shift);
    shift += 7;
  } while (b >= MSB$1);
  read.bytes = counter - offset;
  return res;
}
var N1 = Math.pow(2, 7);
var N2 = Math.pow(2, 14);
var N3 = Math.pow(2, 21);
var N4 = Math.pow(2, 28);
var N5 = Math.pow(2, 35);
var N6 = Math.pow(2, 42);
var N7 = Math.pow(2, 49);
var N8 = Math.pow(2, 56);
var N9 = Math.pow(2, 63);
var length = function (value) {
  return value < N1 ? 1 : value < N2 ? 2 : value < N3 ? 3 : value < N4 ? 4 : value < N5 ? 5 : value < N6 ? 6 : value < N7 ? 7 : value < N8 ? 8 : value < N9 ? 9 : 10;
};
var varint = {
  encode: encode_1,
  decode: decode,
  encodingLength: length
};
var _brrp_varint = varint;

module.exports = _brrp_varint;


/***/ }),

/***/ 7214:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = __nccwpck_require__(1306);


/***/ }),

/***/ 1306:
/***/ (function(module, exports) {

/* jshint -W086: true */
// +----------------------------------------------------------------------+
// | murmurHash3js.js v3.0.1 // https://github.com/pid/murmurHash3js
// | A javascript implementation of MurmurHash3's x86 hashing algorithms. |
// |----------------------------------------------------------------------|
// | Copyright (c) 2012-2015 Karan Lyons                                       |
// | https://github.com/karanlyons/murmurHash3.js/blob/c1778f75792abef7bdd74bc85d2d4e1a3d25cfe9/murmurHash3.js |
// | Freely distributable under the MIT license.                          |
// +----------------------------------------------------------------------+

;(function (root, undefined) {
    'use strict';

    // Create a local object that'll be exported or referenced globally.
    var library = {
        'version': '3.0.0',
        'x86': {},
        'x64': {},
        'inputValidation': true
    };

    // PRIVATE FUNCTIONS
    // -----------------

    function _validBytes(bytes) {
        // check the input is an array or a typed array
        if (!Array.isArray(bytes) && !ArrayBuffer.isView(bytes)) {
            return false;
        }

        // check all bytes are actually bytes
        for (var i = 0; i < bytes.length; i++) {
            if (!Number.isInteger(bytes[i]) || bytes[i] < 0 || bytes[i] > 255) {
                return false;
            }
        }
        return true;
    }

    function _x86Multiply(m, n) {
        //
        // Given two 32bit ints, returns the two multiplied together as a
        // 32bit int.
        //

        return ((m & 0xffff) * n) + ((((m >>> 16) * n) & 0xffff) << 16);
    }

    function _x86Rotl(m, n) {
        //
        // Given a 32bit int and an int representing a number of bit positions,
        // returns the 32bit int rotated left by that number of positions.
        //

        return (m << n) | (m >>> (32 - n));
    }

    function _x86Fmix(h) {
        //
        // Given a block, returns murmurHash3's final x86 mix of that block.
        //

        h ^= h >>> 16;
        h = _x86Multiply(h, 0x85ebca6b);
        h ^= h >>> 13;
        h = _x86Multiply(h, 0xc2b2ae35);
        h ^= h >>> 16;

        return h;
    }

    function _x64Add(m, n) {
        //
        // Given two 64bit ints (as an array of two 32bit ints) returns the two
        // added together as a 64bit int (as an array of two 32bit ints).
        //

        m = [m[0] >>> 16, m[0] & 0xffff, m[1] >>> 16, m[1] & 0xffff];
        n = [n[0] >>> 16, n[0] & 0xffff, n[1] >>> 16, n[1] & 0xffff];
        var o = [0, 0, 0, 0];

        o[3] += m[3] + n[3];
        o[2] += o[3] >>> 16;
        o[3] &= 0xffff;

        o[2] += m[2] + n[2];
        o[1] += o[2] >>> 16;
        o[2] &= 0xffff;

        o[1] += m[1] + n[1];
        o[0] += o[1] >>> 16;
        o[1] &= 0xffff;

        o[0] += m[0] + n[0];
        o[0] &= 0xffff;

        return [(o[0] << 16) | o[1], (o[2] << 16) | o[3]];
    }

    function _x64Multiply(m, n) {
        //
        // Given two 64bit ints (as an array of two 32bit ints) returns the two
        // multiplied together as a 64bit int (as an array of two 32bit ints).
        //

        m = [m[0] >>> 16, m[0] & 0xffff, m[1] >>> 16, m[1] & 0xffff];
        n = [n[0] >>> 16, n[0] & 0xffff, n[1] >>> 16, n[1] & 0xffff];
        var o = [0, 0, 0, 0];

        o[3] += m[3] * n[3];
        o[2] += o[3] >>> 16;
        o[3] &= 0xffff;

        o[2] += m[2] * n[3];
        o[1] += o[2] >>> 16;
        o[2] &= 0xffff;

        o[2] += m[3] * n[2];
        o[1] += o[2] >>> 16;
        o[2] &= 0xffff;

        o[1] += m[1] * n[3];
        o[0] += o[1] >>> 16;
        o[1] &= 0xffff;

        o[1] += m[2] * n[2];
        o[0] += o[1] >>> 16;
        o[1] &= 0xffff;

        o[1] += m[3] * n[1];
        o[0] += o[1] >>> 16;
        o[1] &= 0xffff;

        o[0] += (m[0] * n[3]) + (m[1] * n[2]) + (m[2] * n[1]) + (m[3] * n[0]);
        o[0] &= 0xffff;

        return [(o[0] << 16) | o[1], (o[2] << 16) | o[3]];
    }

    function _x64Rotl(m, n) {
        //
        // Given a 64bit int (as an array of two 32bit ints) and an int
        // representing a number of bit positions, returns the 64bit int (as an
        // array of two 32bit ints) rotated left by that number of positions.
        //

        n %= 64;

        if (n === 32) {
            return [m[1], m[0]];
        } else if (n < 32) {
            return [(m[0] << n) | (m[1] >>> (32 - n)), (m[1] << n) | (m[0] >>> (32 - n))];
        } else {
            n -= 32;
            return [(m[1] << n) | (m[0] >>> (32 - n)), (m[0] << n) | (m[1] >>> (32 - n))];
        }
    }

    function _x64LeftShift(m, n) {
        //
        // Given a 64bit int (as an array of two 32bit ints) and an int
        // representing a number of bit positions, returns the 64bit int (as an
        // array of two 32bit ints) shifted left by that number of positions.
        //

        n %= 64;

        if (n === 0) {
            return m;
        } else if (n < 32) {
            return [(m[0] << n) | (m[1] >>> (32 - n)), m[1] << n];
        } else {
            return [m[1] << (n - 32), 0];
        }
    }

    function _x64Xor(m, n) {
        //
        // Given two 64bit ints (as an array of two 32bit ints) returns the two
        // xored together as a 64bit int (as an array of two 32bit ints).
        //

        return [m[0] ^ n[0], m[1] ^ n[1]];
    }

    function _x64Fmix(h) {
        //
        // Given a block, returns murmurHash3's final x64 mix of that block.
        // (`[0, h[0] >>> 1]` is a 33 bit unsigned right shift. This is the
        // only place where we need to right shift 64bit ints.)
        //

        h = _x64Xor(h, [0, h[0] >>> 1]);
        h = _x64Multiply(h, [0xff51afd7, 0xed558ccd]);
        h = _x64Xor(h, [0, h[0] >>> 1]);
        h = _x64Multiply(h, [0xc4ceb9fe, 0x1a85ec53]);
        h = _x64Xor(h, [0, h[0] >>> 1]);

        return h;
    }

    // PUBLIC FUNCTIONS
    // ----------------

    library.x86.hash32 = function (bytes, seed) {
        //
        // Given a string and an optional seed as an int, returns a 32 bit hash
        // using the x86 flavor of MurmurHash3, as an unsigned int.
        //
        if (library.inputValidation && !_validBytes(bytes)) {
            return undefined;
        }
        seed = seed || 0;

        var remainder = bytes.length % 4;
        var blocks = bytes.length - remainder;

        var h1 = seed;

        var k1 = 0;

        var c1 = 0xcc9e2d51;
        var c2 = 0x1b873593;

        for (var i = 0; i < blocks; i = i + 4) {
            k1 = (bytes[i]) | (bytes[i + 1] << 8) | (bytes[i + 2] << 16) | (bytes[i + 3] << 24);

            k1 = _x86Multiply(k1, c1);
            k1 = _x86Rotl(k1, 15);
            k1 = _x86Multiply(k1, c2);

            h1 ^= k1;
            h1 = _x86Rotl(h1, 13);
            h1 = _x86Multiply(h1, 5) + 0xe6546b64;
        }

        k1 = 0;

        switch (remainder) {
            case 3:
                k1 ^= bytes[i + 2] << 16;

            case 2:
                k1 ^= bytes[i + 1] << 8;

            case 1:
                k1 ^= bytes[i];
                k1 = _x86Multiply(k1, c1);
                k1 = _x86Rotl(k1, 15);
                k1 = _x86Multiply(k1, c2);
                h1 ^= k1;
        }

        h1 ^= bytes.length;
        h1 = _x86Fmix(h1);

        return h1 >>> 0;
    };

    library.x86.hash128 = function (bytes, seed) {
        //
        // Given a string and an optional seed as an int, returns a 128 bit
        // hash using the x86 flavor of MurmurHash3, as an unsigned hex.
        //
        if (library.inputValidation && !_validBytes(bytes)) {
            return undefined;
        }

        seed = seed || 0;
        var remainder = bytes.length % 16;
        var blocks = bytes.length - remainder;

        var h1 = seed;
        var h2 = seed;
        var h3 = seed;
        var h4 = seed;

        var k1 = 0;
        var k2 = 0;
        var k3 = 0;
        var k4 = 0;

        var c1 = 0x239b961b;
        var c2 = 0xab0e9789;
        var c3 = 0x38b34ae5;
        var c4 = 0xa1e38b93;

        for (var i = 0; i < blocks; i = i + 16) {
            k1 = (bytes[i]) | (bytes[i + 1] << 8) | (bytes[i + 2] << 16) | (bytes[i + 3] << 24);
            k2 = (bytes[i + 4]) | (bytes[i + 5] << 8) | (bytes[i + 6] << 16) | (bytes[i + 7] << 24);
            k3 = (bytes[i + 8]) | (bytes[i + 9] << 8) | (bytes[i + 10] << 16) | (bytes[i + 11] << 24);
            k4 = (bytes[i + 12]) | (bytes[i + 13] << 8) | (bytes[i + 14] << 16) | (bytes[i + 15] << 24);

            k1 = _x86Multiply(k1, c1);
            k1 = _x86Rotl(k1, 15);
            k1 = _x86Multiply(k1, c2);
            h1 ^= k1;

            h1 = _x86Rotl(h1, 19);
            h1 += h2;
            h1 = _x86Multiply(h1, 5) + 0x561ccd1b;

            k2 = _x86Multiply(k2, c2);
            k2 = _x86Rotl(k2, 16);
            k2 = _x86Multiply(k2, c3);
            h2 ^= k2;

            h2 = _x86Rotl(h2, 17);
            h2 += h3;
            h2 = _x86Multiply(h2, 5) + 0x0bcaa747;

            k3 = _x86Multiply(k3, c3);
            k3 = _x86Rotl(k3, 17);
            k3 = _x86Multiply(k3, c4);
            h3 ^= k3;

            h3 = _x86Rotl(h3, 15);
            h3 += h4;
            h3 = _x86Multiply(h3, 5) + 0x96cd1c35;

            k4 = _x86Multiply(k4, c4);
            k4 = _x86Rotl(k4, 18);
            k4 = _x86Multiply(k4, c1);
            h4 ^= k4;

            h4 = _x86Rotl(h4, 13);
            h4 += h1;
            h4 = _x86Multiply(h4, 5) + 0x32ac3b17;
        }

        k1 = 0;
        k2 = 0;
        k3 = 0;
        k4 = 0;

        switch (remainder) {
            case 15:
                k4 ^= bytes[i + 14] << 16;

            case 14:
                k4 ^= bytes[i + 13] << 8;

            case 13:
                k4 ^= bytes[i + 12];
                k4 = _x86Multiply(k4, c4);
                k4 = _x86Rotl(k4, 18);
                k4 = _x86Multiply(k4, c1);
                h4 ^= k4;

            case 12:
                k3 ^= bytes[i + 11] << 24;

            case 11:
                k3 ^= bytes[i + 10] << 16;

            case 10:
                k3 ^= bytes[i + 9] << 8;

            case 9:
                k3 ^= bytes[i + 8];
                k3 = _x86Multiply(k3, c3);
                k3 = _x86Rotl(k3, 17);
                k3 = _x86Multiply(k3, c4);
                h3 ^= k3;

            case 8:
                k2 ^= bytes[i + 7] << 24;

            case 7:
                k2 ^= bytes[i + 6] << 16;

            case 6:
                k2 ^= bytes[i + 5] << 8;

            case 5:
                k2 ^= bytes[i + 4];
                k2 = _x86Multiply(k2, c2);
                k2 = _x86Rotl(k2, 16);
                k2 = _x86Multiply(k2, c3);
                h2 ^= k2;

            case 4:
                k1 ^= bytes[i + 3] << 24;

            case 3:
                k1 ^= bytes[i + 2] << 16;

            case 2:
                k1 ^= bytes[i + 1] << 8;

            case 1:
                k1 ^= bytes[i];
                k1 = _x86Multiply(k1, c1);
                k1 = _x86Rotl(k1, 15);
                k1 = _x86Multiply(k1, c2);
                h1 ^= k1;
        }

        h1 ^= bytes.length;
        h2 ^= bytes.length;
        h3 ^= bytes.length;
        h4 ^= bytes.length;

        h1 += h2;
        h1 += h3;
        h1 += h4;
        h2 += h1;
        h3 += h1;
        h4 += h1;

        h1 = _x86Fmix(h1);
        h2 = _x86Fmix(h2);
        h3 = _x86Fmix(h3);
        h4 = _x86Fmix(h4);

        h1 += h2;
        h1 += h3;
        h1 += h4;
        h2 += h1;
        h3 += h1;
        h4 += h1;

        return ("00000000" + (h1 >>> 0).toString(16)).slice(-8) + ("00000000" + (h2 >>> 0).toString(16)).slice(-8) + ("00000000" + (h3 >>> 0).toString(16)).slice(-8) + ("00000000" + (h4 >>> 0).toString(16)).slice(-8);
    };

    library.x64.hash128 = function (bytes, seed) {
        //
        // Given a string and an optional seed as an int, returns a 128 bit
        // hash using the x64 flavor of MurmurHash3, as an unsigned hex.
        //
        if (library.inputValidation && !_validBytes(bytes)) {
            return undefined;
        }
        seed = seed || 0;

        var remainder = bytes.length % 16;
        var blocks = bytes.length - remainder;

        var h1 = [0, seed];
        var h2 = [0, seed];

        var k1 = [0, 0];
        var k2 = [0, 0];

        var c1 = [0x87c37b91, 0x114253d5];
        var c2 = [0x4cf5ad43, 0x2745937f];

        for (var i = 0; i < blocks; i = i + 16) {
            k1 = [(bytes[i + 4]) | (bytes[i + 5] << 8) | (bytes[i + 6] << 16) | (bytes[i + 7] << 24), (bytes[i]) |
                (bytes[i + 1] << 8) | (bytes[i + 2] << 16) | (bytes[i + 3] << 24)];
            k2 = [(bytes[i + 12]) | (bytes[i + 13] << 8) | (bytes[i + 14] << 16) | (bytes[i + 15] << 24), (bytes[i + 8]) |
                (bytes[i + 9] << 8) | (bytes[i + 10] << 16) | (bytes[i + 11] << 24)];

            k1 = _x64Multiply(k1, c1);
            k1 = _x64Rotl(k1, 31);
            k1 = _x64Multiply(k1, c2);
            h1 = _x64Xor(h1, k1);

            h1 = _x64Rotl(h1, 27);
            h1 = _x64Add(h1, h2);
            h1 = _x64Add(_x64Multiply(h1, [0, 5]), [0, 0x52dce729]);

            k2 = _x64Multiply(k2, c2);
            k2 = _x64Rotl(k2, 33);
            k2 = _x64Multiply(k2, c1);
            h2 = _x64Xor(h2, k2);

            h2 = _x64Rotl(h2, 31);
            h2 = _x64Add(h2, h1);
            h2 = _x64Add(_x64Multiply(h2, [0, 5]), [0, 0x38495ab5]);
        }

        k1 = [0, 0];
        k2 = [0, 0];

        switch (remainder) {
            case 15:
                k2 = _x64Xor(k2, _x64LeftShift([0, bytes[i + 14]], 48));

            case 14:
                k2 = _x64Xor(k2, _x64LeftShift([0, bytes[i + 13]], 40));

            case 13:
                k2 = _x64Xor(k2, _x64LeftShift([0, bytes[i + 12]], 32));

            case 12:
                k2 = _x64Xor(k2, _x64LeftShift([0, bytes[i + 11]], 24));

            case 11:
                k2 = _x64Xor(k2, _x64LeftShift([0, bytes[i + 10]], 16));

            case 10:
                k2 = _x64Xor(k2, _x64LeftShift([0, bytes[i + 9]], 8));

            case 9:
                k2 = _x64Xor(k2, [0, bytes[i + 8]]);
                k2 = _x64Multiply(k2, c2);
                k2 = _x64Rotl(k2, 33);
                k2 = _x64Multiply(k2, c1);
                h2 = _x64Xor(h2, k2);

            case 8:
                k1 = _x64Xor(k1, _x64LeftShift([0, bytes[i + 7]], 56));

            case 7:
                k1 = _x64Xor(k1, _x64LeftShift([0, bytes[i + 6]], 48));

            case 6:
                k1 = _x64Xor(k1, _x64LeftShift([0, bytes[i + 5]], 40));

            case 5:
                k1 = _x64Xor(k1, _x64LeftShift([0, bytes[i + 4]], 32));

            case 4:
                k1 = _x64Xor(k1, _x64LeftShift([0, bytes[i + 3]], 24));

            case 3:
                k1 = _x64Xor(k1, _x64LeftShift([0, bytes[i + 2]], 16));

            case 2:
                k1 = _x64Xor(k1, _x64LeftShift([0, bytes[i + 1]], 8));

            case 1:
                k1 = _x64Xor(k1, [0, bytes[i]]);
                k1 = _x64Multiply(k1, c1);
                k1 = _x64Rotl(k1, 31);
                k1 = _x64Multiply(k1, c2);
                h1 = _x64Xor(h1, k1);
        }

        h1 = _x64Xor(h1, [0, bytes.length]);
        h2 = _x64Xor(h2, [0, bytes.length]);

        h1 = _x64Add(h1, h2);
        h2 = _x64Add(h2, h1);

        h1 = _x64Fmix(h1);
        h2 = _x64Fmix(h2);

        h1 = _x64Add(h1, h2);
        h2 = _x64Add(h2, h1);

        return ("00000000" + (h1[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h1[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (h2[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h2[1] >>> 0).toString(16)).slice(-8);
    };

    // INITIALIZATION
    // --------------

    // Export murmurHash3 for CommonJS, either as an AMD module or just as part
    // of the global object.
    if (true) {

        if ( true && module.exports) {
            exports = module.exports = library;
        }

        exports.murmurHash3 = library;

    } else {}
})(this);


/***/ }),

/***/ 2548:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

const retry = __nccwpck_require__(4347);

const networkErrorMsgs = [
	'Failed to fetch', // Chrome
	'NetworkError when attempting to fetch resource.', // Firefox
	'The Internet connection appears to be offline.', // Safari
	'Network request failed' // `cross-fetch`
];

class AbortError extends Error {
	constructor(message) {
		super();

		if (message instanceof Error) {
			this.originalError = message;
			({message} = message);
		} else {
			this.originalError = new Error(message);
			this.originalError.stack = this.stack;
		}

		this.name = 'AbortError';
		this.message = message;
	}
}

const decorateErrorWithCounts = (error, attemptNumber, options) => {
	// Minus 1 from attemptNumber because the first attempt does not count as a retry
	const retriesLeft = options.retries - (attemptNumber - 1);

	error.attemptNumber = attemptNumber;
	error.retriesLeft = retriesLeft;
	return error;
};

const isNetworkError = errorMessage => networkErrorMsgs.includes(errorMessage);

const pRetry = (input, options) => new Promise((resolve, reject) => {
	options = {
		onFailedAttempt: () => {},
		retries: 10,
		...options
	};

	const operation = retry.operation(options);

	operation.attempt(async attemptNumber => {
		try {
			resolve(await input(attemptNumber));
		} catch (error) {
			if (!(error instanceof Error)) {
				reject(new TypeError(`Non-error was thrown: "${error}". You should only throw errors.`));
				return;
			}

			if (error instanceof AbortError) {
				operation.stop();
				reject(error.originalError);
			} else if (error instanceof TypeError && !isNetworkError(error.message)) {
				operation.stop();
				reject(error);
			} else {
				decorateErrorWithCounts(error, attemptNumber, options);

				try {
					await options.onFailedAttempt(error);
				} catch (error) {
					reject(error);
					return;
				}

				if (!operation.retry(error)) {
					reject(operation.mainError());
				}
			}
		}
	});
});

module.exports = pRetry;
// TODO: remove this in the next major version
module.exports.default = pRetry;

module.exports.AbortError = AbortError;


/***/ }),

/***/ 6916:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
// minimal library entry point.


module.exports = __nccwpck_require__(3242);


/***/ }),

/***/ 3242:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

var protobuf = exports;

/**
 * Build type, one of `"full"`, `"light"` or `"minimal"`.
 * @name build
 * @type {string}
 * @const
 */
protobuf.build = "minimal";

// Serialization
protobuf.Writer       = __nccwpck_require__(3098);
protobuf.BufferWriter = __nccwpck_require__(1863);
protobuf.Reader       = __nccwpck_require__(1011);
protobuf.BufferReader = __nccwpck_require__(339);

// Utility
protobuf.util         = __nccwpck_require__(1241);
protobuf.rpc          = __nccwpck_require__(6444);
protobuf.roots        = __nccwpck_require__(73);
protobuf.configure    = configure;

/* istanbul ignore next */
/**
 * Reconfigures the library according to the environment.
 * @returns {undefined}
 */
function configure() {
    protobuf.util._configure();
    protobuf.Writer._configure(protobuf.BufferWriter);
    protobuf.Reader._configure(protobuf.BufferReader);
}

// Set up buffer utility according to the environment
configure();


/***/ }),

/***/ 1011:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

module.exports = Reader;

var util      = __nccwpck_require__(1241);

var BufferReader; // cyclic

var LongBits  = util.LongBits,
    utf8      = util.utf8;

/* istanbul ignore next */
function indexOutOfRange(reader, writeLength) {
    return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
}

/**
 * Constructs a new reader instance using the specified buffer.
 * @classdesc Wire format reader using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 * @param {Uint8Array} buffer Buffer to read from
 */
function Reader(buffer) {

    /**
     * Read buffer.
     * @type {Uint8Array}
     */
    this.buf = buffer;

    /**
     * Read buffer position.
     * @type {number}
     */
    this.pos = 0;

    /**
     * Read buffer length.
     * @type {number}
     */
    this.len = buffer.length;
}

var create_array = typeof Uint8Array !== "undefined"
    ? function create_typed_array(buffer) {
        if (buffer instanceof Uint8Array || Array.isArray(buffer))
            return new Reader(buffer);
        throw Error("illegal buffer");
    }
    /* istanbul ignore next */
    : function create_array(buffer) {
        if (Array.isArray(buffer))
            return new Reader(buffer);
        throw Error("illegal buffer");
    };

var create = function create() {
    return util.Buffer
        ? function create_buffer_setup(buffer) {
            return (Reader.create = function create_buffer(buffer) {
                return util.Buffer.isBuffer(buffer)
                    ? new BufferReader(buffer)
                    /* istanbul ignore next */
                    : create_array(buffer);
            })(buffer);
        }
        /* istanbul ignore next */
        : create_array;
};

/**
 * Creates a new reader using the specified buffer.
 * @function
 * @param {Uint8Array|Buffer} buffer Buffer to read from
 * @returns {Reader|BufferReader} A {@link BufferReader} if `buffer` is a Buffer, otherwise a {@link Reader}
 * @throws {Error} If `buffer` is not a valid buffer
 */
Reader.create = create();

Reader.prototype._slice = util.Array.prototype.subarray || /* istanbul ignore next */ util.Array.prototype.slice;

/**
 * Reads a varint as an unsigned 32 bit value.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.uint32 = (function read_uint32_setup() {
    var value = 4294967295; // optimizer type-hint, tends to deopt otherwise (?!)
    return function read_uint32() {
        value = (         this.buf[this.pos] & 127       ) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) <<  7) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 14) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 21) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] &  15) << 28) >>> 0; if (this.buf[this.pos++] < 128) return value;

        /* istanbul ignore if */
        if ((this.pos += 5) > this.len) {
            this.pos = this.len;
            throw indexOutOfRange(this, 10);
        }
        return value;
    };
})();

/**
 * Reads a varint as a signed 32 bit value.
 * @returns {number} Value read
 */
Reader.prototype.int32 = function read_int32() {
    return this.uint32() | 0;
};

/**
 * Reads a zig-zag encoded varint as a signed 32 bit value.
 * @returns {number} Value read
 */
Reader.prototype.sint32 = function read_sint32() {
    var value = this.uint32();
    return value >>> 1 ^ -(value & 1) | 0;
};

/* eslint-disable no-invalid-this */

function readLongVarint() {
    // tends to deopt with local vars for octet etc.
    var bits = new LongBits(0, 0);
    var i = 0;
    if (this.len - this.pos > 4) { // fast route (lo)
        for (; i < 4; ++i) {
            // 1st..4th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
        // 5th
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) >>  4) >>> 0;
        if (this.buf[this.pos++] < 128)
            return bits;
        i = 0;
    } else {
        for (; i < 3; ++i) {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
            // 1st..3th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
        // 4th
        bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
        return bits;
    }
    if (this.len - this.pos > 4) { // fast route (hi)
        for (; i < 5; ++i) {
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
    } else {
        for (; i < 5; ++i) {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
    }
    /* istanbul ignore next */
    throw Error("invalid varint encoding");
}

/* eslint-enable no-invalid-this */

/**
 * Reads a varint as a signed 64 bit value.
 * @name Reader#int64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a varint as an unsigned 64 bit value.
 * @name Reader#uint64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a zig-zag encoded varint as a signed 64 bit value.
 * @name Reader#sint64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a varint as a boolean.
 * @returns {boolean} Value read
 */
Reader.prototype.bool = function read_bool() {
    return this.uint32() !== 0;
};

function readFixed32_end(buf, end) { // note that this uses `end`, not `pos`
    return (buf[end - 4]
          | buf[end - 3] << 8
          | buf[end - 2] << 16
          | buf[end - 1] << 24) >>> 0;
}

/**
 * Reads fixed 32 bits as an unsigned 32 bit integer.
 * @returns {number} Value read
 */
Reader.prototype.fixed32 = function read_fixed32() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    return readFixed32_end(this.buf, this.pos += 4);
};

/**
 * Reads fixed 32 bits as a signed 32 bit integer.
 * @returns {number} Value read
 */
Reader.prototype.sfixed32 = function read_sfixed32() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    return readFixed32_end(this.buf, this.pos += 4) | 0;
};

/* eslint-disable no-invalid-this */

function readFixed64(/* this: Reader */) {

    /* istanbul ignore if */
    if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 8);

    return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
}

/* eslint-enable no-invalid-this */

/**
 * Reads fixed 64 bits.
 * @name Reader#fixed64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads zig-zag encoded fixed 64 bits.
 * @name Reader#sfixed64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a float (32 bit) as a number.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.float = function read_float() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    var value = util.float.readFloatLE(this.buf, this.pos);
    this.pos += 4;
    return value;
};

/**
 * Reads a double (64 bit float) as a number.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.double = function read_double() {

    /* istanbul ignore if */
    if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 4);

    var value = util.float.readDoubleLE(this.buf, this.pos);
    this.pos += 8;
    return value;
};

/**
 * Reads a sequence of bytes preceeded by its length as a varint.
 * @returns {Uint8Array} Value read
 */
Reader.prototype.bytes = function read_bytes() {
    var length = this.uint32(),
        start  = this.pos,
        end    = this.pos + length;

    /* istanbul ignore if */
    if (end > this.len)
        throw indexOutOfRange(this, length);

    this.pos += length;
    if (Array.isArray(this.buf)) // plain array
        return this.buf.slice(start, end);
    return start === end // fix for IE 10/Win8 and others' subarray returning array of size 1
        ? new this.buf.constructor(0)
        : this._slice.call(this.buf, start, end);
};

/**
 * Reads a string preceeded by its byte length as a varint.
 * @returns {string} Value read
 */
Reader.prototype.string = function read_string() {
    var bytes = this.bytes();
    return utf8.read(bytes, 0, bytes.length);
};

/**
 * Skips the specified number of bytes if specified, otherwise skips a varint.
 * @param {number} [length] Length if known, otherwise a varint is assumed
 * @returns {Reader} `this`
 */
Reader.prototype.skip = function skip(length) {
    if (typeof length === "number") {
        /* istanbul ignore if */
        if (this.pos + length > this.len)
            throw indexOutOfRange(this, length);
        this.pos += length;
    } else {
        do {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
        } while (this.buf[this.pos++] & 128);
    }
    return this;
};

/**
 * Skips the next element of the specified wire type.
 * @param {number} wireType Wire type received
 * @returns {Reader} `this`
 */
Reader.prototype.skipType = function(wireType) {
    switch (wireType) {
        case 0:
            this.skip();
            break;
        case 1:
            this.skip(8);
            break;
        case 2:
            this.skip(this.uint32());
            break;
        case 3:
            while ((wireType = this.uint32() & 7) !== 4) {
                this.skipType(wireType);
            }
            break;
        case 5:
            this.skip(4);
            break;

        /* istanbul ignore next */
        default:
            throw Error("invalid wire type " + wireType + " at offset " + this.pos);
    }
    return this;
};

Reader._configure = function(BufferReader_) {
    BufferReader = BufferReader_;
    Reader.create = create();
    BufferReader._configure();

    var fn = util.Long ? "toLong" : /* istanbul ignore next */ "toNumber";
    util.merge(Reader.prototype, {

        int64: function read_int64() {
            return readLongVarint.call(this)[fn](false);
        },

        uint64: function read_uint64() {
            return readLongVarint.call(this)[fn](true);
        },

        sint64: function read_sint64() {
            return readLongVarint.call(this).zzDecode()[fn](false);
        },

        fixed64: function read_fixed64() {
            return readFixed64.call(this)[fn](true);
        },

        sfixed64: function read_sfixed64() {
            return readFixed64.call(this)[fn](false);
        }

    });
};


/***/ }),

/***/ 339:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

module.exports = BufferReader;

// extends Reader
var Reader = __nccwpck_require__(1011);
(BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;

var util = __nccwpck_require__(1241);

/**
 * Constructs a new buffer reader instance.
 * @classdesc Wire format reader using node buffers.
 * @extends Reader
 * @constructor
 * @param {Buffer} buffer Buffer to read from
 */
function BufferReader(buffer) {
    Reader.call(this, buffer);

    /**
     * Read buffer.
     * @name BufferReader#buf
     * @type {Buffer}
     */
}

BufferReader._configure = function () {
    /* istanbul ignore else */
    if (util.Buffer)
        BufferReader.prototype._slice = util.Buffer.prototype.slice;
};


/**
 * @override
 */
BufferReader.prototype.string = function read_string_buffer() {
    var len = this.uint32(); // modifies pos
    return this.buf.utf8Slice
        ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len))
        : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
};

/**
 * Reads a sequence of bytes preceeded by its length as a varint.
 * @name BufferReader#bytes
 * @function
 * @returns {Buffer} Value read
 */

BufferReader._configure();


/***/ }),

/***/ 73:
/***/ ((module) => {

"use strict";

module.exports = {};

/**
 * Named roots.
 * This is where pbjs stores generated structures (the option `-r, --root` specifies a name).
 * Can also be used manually to make roots available accross modules.
 * @name roots
 * @type {Object.<string,Root>}
 * @example
 * // pbjs -r myroot -o compiled.js ...
 *
 * // in another module:
 * require("./compiled.js");
 *
 * // in any subsequent module:
 * var root = protobuf.roots["myroot"];
 */


/***/ }),

/***/ 6444:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


/**
 * Streaming RPC helpers.
 * @namespace
 */
var rpc = exports;

/**
 * RPC implementation passed to {@link Service#create} performing a service request on network level, i.e. by utilizing http requests or websockets.
 * @typedef RPCImpl
 * @type {function}
 * @param {Method|rpc.ServiceMethod<Message<{}>,Message<{}>>} method Reflected or static method being called
 * @param {Uint8Array} requestData Request data
 * @param {RPCImplCallback} callback Callback function
 * @returns {undefined}
 * @example
 * function rpcImpl(method, requestData, callback) {
 *     if (protobuf.util.lcFirst(method.name) !== "myMethod") // compatible with static code
 *         throw Error("no such method");
 *     asynchronouslyObtainAResponse(requestData, function(err, responseData) {
 *         callback(err, responseData);
 *     });
 * }
 */

/**
 * Node-style callback as used by {@link RPCImpl}.
 * @typedef RPCImplCallback
 * @type {function}
 * @param {Error|null} error Error, if any, otherwise `null`
 * @param {Uint8Array|null} [response] Response data or `null` to signal end of stream, if there hasn't been an error
 * @returns {undefined}
 */

rpc.Service = __nccwpck_require__(2439);


/***/ }),

/***/ 2439:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

module.exports = Service;

var util = __nccwpck_require__(1241);

// Extends EventEmitter
(Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;

/**
 * A service method callback as used by {@link rpc.ServiceMethod|ServiceMethod}.
 *
 * Differs from {@link RPCImplCallback} in that it is an actual callback of a service method which may not return `response = null`.
 * @typedef rpc.ServiceMethodCallback
 * @template TRes extends Message<TRes>
 * @type {function}
 * @param {Error|null} error Error, if any
 * @param {TRes} [response] Response message
 * @returns {undefined}
 */

/**
 * A service method part of a {@link rpc.Service} as created by {@link Service.create}.
 * @typedef rpc.ServiceMethod
 * @template TReq extends Message<TReq>
 * @template TRes extends Message<TRes>
 * @type {function}
 * @param {TReq|Properties<TReq>} request Request message or plain object
 * @param {rpc.ServiceMethodCallback<TRes>} [callback] Node-style callback called with the error, if any, and the response message
 * @returns {Promise<Message<TRes>>} Promise if `callback` has been omitted, otherwise `undefined`
 */

/**
 * Constructs a new RPC service instance.
 * @classdesc An RPC service as returned by {@link Service#create}.
 * @exports rpc.Service
 * @extends util.EventEmitter
 * @constructor
 * @param {RPCImpl} rpcImpl RPC implementation
 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
 */
function Service(rpcImpl, requestDelimited, responseDelimited) {

    if (typeof rpcImpl !== "function")
        throw TypeError("rpcImpl must be a function");

    util.EventEmitter.call(this);

    /**
     * RPC implementation. Becomes `null` once the service is ended.
     * @type {RPCImpl|null}
     */
    this.rpcImpl = rpcImpl;

    /**
     * Whether requests are length-delimited.
     * @type {boolean}
     */
    this.requestDelimited = Boolean(requestDelimited);

    /**
     * Whether responses are length-delimited.
     * @type {boolean}
     */
    this.responseDelimited = Boolean(responseDelimited);
}

/**
 * Calls a service method through {@link rpc.Service#rpcImpl|rpcImpl}.
 * @param {Method|rpc.ServiceMethod<TReq,TRes>} method Reflected or static method
 * @param {Constructor<TReq>} requestCtor Request constructor
 * @param {Constructor<TRes>} responseCtor Response constructor
 * @param {TReq|Properties<TReq>} request Request message or plain object
 * @param {rpc.ServiceMethodCallback<TRes>} callback Service callback
 * @returns {undefined}
 * @template TReq extends Message<TReq>
 * @template TRes extends Message<TRes>
 */
Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {

    if (!request)
        throw TypeError("request must be specified");

    var self = this;
    if (!callback)
        return util.asPromise(rpcCall, self, method, requestCtor, responseCtor, request);

    if (!self.rpcImpl) {
        setTimeout(function() { callback(Error("already ended")); }, 0);
        return undefined;
    }

    try {
        return self.rpcImpl(
            method,
            requestCtor[self.requestDelimited ? "encodeDelimited" : "encode"](request).finish(),
            function rpcCallback(err, response) {

                if (err) {
                    self.emit("error", err, method);
                    return callback(err);
                }

                if (response === null) {
                    self.end(/* endedByRPC */ true);
                    return undefined;
                }

                if (!(response instanceof responseCtor)) {
                    try {
                        response = responseCtor[self.responseDelimited ? "decodeDelimited" : "decode"](response);
                    } catch (err) {
                        self.emit("error", err, method);
                        return callback(err);
                    }
                }

                self.emit("data", response, method);
                return callback(null, response);
            }
        );
    } catch (err) {
        self.emit("error", err, method);
        setTimeout(function() { callback(err); }, 0);
        return undefined;
    }
};

/**
 * Ends this service and emits the `end` event.
 * @param {boolean} [endedByRPC=false] Whether the service has been ended by the RPC implementation.
 * @returns {rpc.Service} `this`
 */
Service.prototype.end = function end(endedByRPC) {
    if (this.rpcImpl) {
        if (!endedByRPC) // signal end to rpcImpl
            this.rpcImpl(null, null, null);
        this.rpcImpl = null;
        this.emit("end").off();
    }
    return this;
};


/***/ }),

/***/ 8374:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

module.exports = LongBits;

var util = __nccwpck_require__(1241);

/**
 * Constructs new long bits.
 * @classdesc Helper class for working with the low and high bits of a 64 bit value.
 * @memberof util
 * @constructor
 * @param {number} lo Low 32 bits, unsigned
 * @param {number} hi High 32 bits, unsigned
 */
function LongBits(lo, hi) {

    // note that the casts below are theoretically unnecessary as of today, but older statically
    // generated converter code might still call the ctor with signed 32bits. kept for compat.

    /**
     * Low bits.
     * @type {number}
     */
    this.lo = lo >>> 0;

    /**
     * High bits.
     * @type {number}
     */
    this.hi = hi >>> 0;
}

/**
 * Zero bits.
 * @memberof util.LongBits
 * @type {util.LongBits}
 */
var zero = LongBits.zero = new LongBits(0, 0);

zero.toNumber = function() { return 0; };
zero.zzEncode = zero.zzDecode = function() { return this; };
zero.length = function() { return 1; };

/**
 * Zero hash.
 * @memberof util.LongBits
 * @type {string}
 */
var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";

/**
 * Constructs new long bits from the specified number.
 * @param {number} value Value
 * @returns {util.LongBits} Instance
 */
LongBits.fromNumber = function fromNumber(value) {
    if (value === 0)
        return zero;
    var sign = value < 0;
    if (sign)
        value = -value;
    var lo = value >>> 0,
        hi = (value - lo) / 4294967296 >>> 0;
    if (sign) {
        hi = ~hi >>> 0;
        lo = ~lo >>> 0;
        if (++lo > 4294967295) {
            lo = 0;
            if (++hi > 4294967295)
                hi = 0;
        }
    }
    return new LongBits(lo, hi);
};

/**
 * Constructs new long bits from a number, long or string.
 * @param {Long|number|string} value Value
 * @returns {util.LongBits} Instance
 */
LongBits.from = function from(value) {
    if (typeof value === "number")
        return LongBits.fromNumber(value);
    if (util.isString(value)) {
        /* istanbul ignore else */
        if (util.Long)
            value = util.Long.fromString(value);
        else
            return LongBits.fromNumber(parseInt(value, 10));
    }
    return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
};

/**
 * Converts this long bits to a possibly unsafe JavaScript number.
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {number} Possibly unsafe number
 */
LongBits.prototype.toNumber = function toNumber(unsigned) {
    if (!unsigned && this.hi >>> 31) {
        var lo = ~this.lo + 1 >>> 0,
            hi = ~this.hi     >>> 0;
        if (!lo)
            hi = hi + 1 >>> 0;
        return -(lo + hi * 4294967296);
    }
    return this.lo + this.hi * 4294967296;
};

/**
 * Converts this long bits to a long.
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long} Long
 */
LongBits.prototype.toLong = function toLong(unsigned) {
    return util.Long
        ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned))
        /* istanbul ignore next */
        : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
};

var charCodeAt = String.prototype.charCodeAt;

/**
 * Constructs new long bits from the specified 8 characters long hash.
 * @param {string} hash Hash
 * @returns {util.LongBits} Bits
 */
LongBits.fromHash = function fromHash(hash) {
    if (hash === zeroHash)
        return zero;
    return new LongBits(
        ( charCodeAt.call(hash, 0)
        | charCodeAt.call(hash, 1) << 8
        | charCodeAt.call(hash, 2) << 16
        | charCodeAt.call(hash, 3) << 24) >>> 0
    ,
        ( charCodeAt.call(hash, 4)
        | charCodeAt.call(hash, 5) << 8
        | charCodeAt.call(hash, 6) << 16
        | charCodeAt.call(hash, 7) << 24) >>> 0
    );
};

/**
 * Converts this long bits to a 8 characters long hash.
 * @returns {string} Hash
 */
LongBits.prototype.toHash = function toHash() {
    return String.fromCharCode(
        this.lo        & 255,
        this.lo >>> 8  & 255,
        this.lo >>> 16 & 255,
        this.lo >>> 24      ,
        this.hi        & 255,
        this.hi >>> 8  & 255,
        this.hi >>> 16 & 255,
        this.hi >>> 24
    );
};

/**
 * Zig-zag encodes this long bits.
 * @returns {util.LongBits} `this`
 */
LongBits.prototype.zzEncode = function zzEncode() {
    var mask =   this.hi >> 31;
    this.hi  = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
    this.lo  = ( this.lo << 1                   ^ mask) >>> 0;
    return this;
};

/**
 * Zig-zag decodes this long bits.
 * @returns {util.LongBits} `this`
 */
LongBits.prototype.zzDecode = function zzDecode() {
    var mask = -(this.lo & 1);
    this.lo  = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
    this.hi  = ( this.hi >>> 1                  ^ mask) >>> 0;
    return this;
};

/**
 * Calculates the length of this longbits when encoded as a varint.
 * @returns {number} Length
 */
LongBits.prototype.length = function length() {
    var part0 =  this.lo,
        part1 = (this.lo >>> 28 | this.hi << 4) >>> 0,
        part2 =  this.hi >>> 24;
    return part2 === 0
         ? part1 === 0
           ? part0 < 16384
             ? part0 < 128 ? 1 : 2
             : part0 < 2097152 ? 3 : 4
           : part1 < 16384
             ? part1 < 128 ? 5 : 6
             : part1 < 2097152 ? 7 : 8
         : part2 < 128 ? 9 : 10;
};


/***/ }),

/***/ 1241:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var util = exports;

// used to return a Promise where callback is omitted
util.asPromise = __nccwpck_require__(252);

// converts to / from base64 encoded strings
util.base64 = __nccwpck_require__(6718);

// base class of rpc.Service
util.EventEmitter = __nccwpck_require__(6850);

// float handling accross browsers
util.float = __nccwpck_require__(1843);

// requires modules optionally and hides the call from bundlers
util.inquire = __nccwpck_require__(94);

// converts to / from utf8 encoded strings
util.utf8 = __nccwpck_require__(9049);

// provides a node-like buffer pool in the browser
util.pool = __nccwpck_require__(7743);

// utility to work with the low and high bits of a 64 bit value
util.LongBits = __nccwpck_require__(8374);

/**
 * Whether running within node or not.
 * @memberof util
 * @type {boolean}
 */
util.isNode = Boolean(typeof global !== "undefined"
                   && global
                   && global.process
                   && global.process.versions
                   && global.process.versions.node);

/**
 * Global object reference.
 * @memberof util
 * @type {Object}
 */
util.global = util.isNode && global
           || typeof window !== "undefined" && window
           || typeof self   !== "undefined" && self
           || this; // eslint-disable-line no-invalid-this

/**
 * An immuable empty array.
 * @memberof util
 * @type {Array.<*>}
 * @const
 */
util.emptyArray = Object.freeze ? Object.freeze([]) : /* istanbul ignore next */ []; // used on prototypes

/**
 * An immutable empty object.
 * @type {Object}
 * @const
 */
util.emptyObject = Object.freeze ? Object.freeze({}) : /* istanbul ignore next */ {}; // used on prototypes

/**
 * Tests if the specified value is an integer.
 * @function
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is an integer
 */
util.isInteger = Number.isInteger || /* istanbul ignore next */ function isInteger(value) {
    return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
};

/**
 * Tests if the specified value is a string.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a string
 */
util.isString = function isString(value) {
    return typeof value === "string" || value instanceof String;
};

/**
 * Tests if the specified value is a non-null object.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a non-null object
 */
util.isObject = function isObject(value) {
    return value && typeof value === "object";
};

/**
 * Checks if a property on a message is considered to be present.
 * This is an alias of {@link util.isSet}.
 * @function
 * @param {Object} obj Plain object or message instance
 * @param {string} prop Property name
 * @returns {boolean} `true` if considered to be present, otherwise `false`
 */
util.isset =

/**
 * Checks if a property on a message is considered to be present.
 * @param {Object} obj Plain object or message instance
 * @param {string} prop Property name
 * @returns {boolean} `true` if considered to be present, otherwise `false`
 */
util.isSet = function isSet(obj, prop) {
    var value = obj[prop];
    if (value != null && obj.hasOwnProperty(prop)) // eslint-disable-line eqeqeq, no-prototype-builtins
        return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
    return false;
};

/**
 * Any compatible Buffer instance.
 * This is a minimal stand-alone definition of a Buffer instance. The actual type is that exported by node's typings.
 * @interface Buffer
 * @extends Uint8Array
 */

/**
 * Node's Buffer class if available.
 * @type {Constructor<Buffer>}
 */
util.Buffer = (function() {
    try {
        var Buffer = util.inquire("buffer").Buffer;
        // refuse to use non-node buffers if not explicitly assigned (perf reasons):
        return Buffer.prototype.utf8Write ? Buffer : /* istanbul ignore next */ null;
    } catch (e) {
        /* istanbul ignore next */
        return null;
    }
})();

// Internal alias of or polyfull for Buffer.from.
util._Buffer_from = null;

// Internal alias of or polyfill for Buffer.allocUnsafe.
util._Buffer_allocUnsafe = null;

/**
 * Creates a new buffer of whatever type supported by the environment.
 * @param {number|number[]} [sizeOrArray=0] Buffer size or number array
 * @returns {Uint8Array|Buffer} Buffer
 */
util.newBuffer = function newBuffer(sizeOrArray) {
    /* istanbul ignore next */
    return typeof sizeOrArray === "number"
        ? util.Buffer
            ? util._Buffer_allocUnsafe(sizeOrArray)
            : new util.Array(sizeOrArray)
        : util.Buffer
            ? util._Buffer_from(sizeOrArray)
            : typeof Uint8Array === "undefined"
                ? sizeOrArray
                : new Uint8Array(sizeOrArray);
};

/**
 * Array implementation used in the browser. `Uint8Array` if supported, otherwise `Array`.
 * @type {Constructor<Uint8Array>}
 */
util.Array = typeof Uint8Array !== "undefined" ? Uint8Array /* istanbul ignore next */ : Array;

/**
 * Any compatible Long instance.
 * This is a minimal stand-alone definition of a Long instance. The actual type is that exported by long.js.
 * @interface Long
 * @property {number} low Low bits
 * @property {number} high High bits
 * @property {boolean} unsigned Whether unsigned or not
 */

/**
 * Long.js's Long class if available.
 * @type {Constructor<Long>}
 */
util.Long = /* istanbul ignore next */ util.global.dcodeIO && /* istanbul ignore next */ util.global.dcodeIO.Long
         || /* istanbul ignore next */ util.global.Long
         || util.inquire("long");

/**
 * Regular expression used to verify 2 bit (`bool`) map keys.
 * @type {RegExp}
 * @const
 */
util.key2Re = /^true|false|0|1$/;

/**
 * Regular expression used to verify 32 bit (`int32` etc.) map keys.
 * @type {RegExp}
 * @const
 */
util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;

/**
 * Regular expression used to verify 64 bit (`int64` etc.) map keys.
 * @type {RegExp}
 * @const
 */
util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;

/**
 * Converts a number or long to an 8 characters long hash string.
 * @param {Long|number} value Value to convert
 * @returns {string} Hash
 */
util.longToHash = function longToHash(value) {
    return value
        ? util.LongBits.from(value).toHash()
        : util.LongBits.zeroHash;
};

/**
 * Converts an 8 characters long hash string to a long or number.
 * @param {string} hash Hash
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long|number} Original value
 */
util.longFromHash = function longFromHash(hash, unsigned) {
    var bits = util.LongBits.fromHash(hash);
    if (util.Long)
        return util.Long.fromBits(bits.lo, bits.hi, unsigned);
    return bits.toNumber(Boolean(unsigned));
};

/**
 * Merges the properties of the source object into the destination object.
 * @memberof util
 * @param {Object.<string,*>} dst Destination object
 * @param {Object.<string,*>} src Source object
 * @param {boolean} [ifNotSet=false] Merges only if the key is not already set
 * @returns {Object.<string,*>} Destination object
 */
function merge(dst, src, ifNotSet) { // used by converters
    for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
        if (dst[keys[i]] === undefined || !ifNotSet)
            dst[keys[i]] = src[keys[i]];
    return dst;
}

util.merge = merge;

/**
 * Converts the first character of a string to lower case.
 * @param {string} str String to convert
 * @returns {string} Converted string
 */
util.lcFirst = function lcFirst(str) {
    return str.charAt(0).toLowerCase() + str.substring(1);
};

/**
 * Creates a custom error constructor.
 * @memberof util
 * @param {string} name Error name
 * @returns {Constructor<Error>} Custom error constructor
 */
function newError(name) {

    function CustomError(message, properties) {

        if (!(this instanceof CustomError))
            return new CustomError(message, properties);

        // Error.call(this, message);
        // ^ just returns a new error instance because the ctor can be called as a function

        Object.defineProperty(this, "message", { get: function() { return message; } });

        /* istanbul ignore next */
        if (Error.captureStackTrace) // node
            Error.captureStackTrace(this, CustomError);
        else
            Object.defineProperty(this, "stack", { value: new Error().stack || "" });

        if (properties)
            merge(this, properties);
    }

    (CustomError.prototype = Object.create(Error.prototype)).constructor = CustomError;

    Object.defineProperty(CustomError.prototype, "name", { get: function() { return name; } });

    CustomError.prototype.toString = function toString() {
        return this.name + ": " + this.message;
    };

    return CustomError;
}

util.newError = newError;

/**
 * Constructs a new protocol error.
 * @classdesc Error subclass indicating a protocol specifc error.
 * @memberof util
 * @extends Error
 * @template T extends Message<T>
 * @constructor
 * @param {string} message Error message
 * @param {Object.<string,*>} [properties] Additional properties
 * @example
 * try {
 *     MyMessage.decode(someBuffer); // throws if required fields are missing
 * } catch (e) {
 *     if (e instanceof ProtocolError && e.instance)
 *         console.log("decoded so far: " + JSON.stringify(e.instance));
 * }
 */
util.ProtocolError = newError("ProtocolError");

/**
 * So far decoded message instance.
 * @name util.ProtocolError#instance
 * @type {Message<T>}
 */

/**
 * A OneOf getter as returned by {@link util.oneOfGetter}.
 * @typedef OneOfGetter
 * @type {function}
 * @returns {string|undefined} Set field name, if any
 */

/**
 * Builds a getter for a oneof's present field name.
 * @param {string[]} fieldNames Field names
 * @returns {OneOfGetter} Unbound getter
 */
util.oneOfGetter = function getOneOf(fieldNames) {
    var fieldMap = {};
    for (var i = 0; i < fieldNames.length; ++i)
        fieldMap[fieldNames[i]] = 1;

    /**
     * @returns {string|undefined} Set field name, if any
     * @this Object
     * @ignore
     */
    return function() { // eslint-disable-line consistent-return
        for (var keys = Object.keys(this), i = keys.length - 1; i > -1; --i)
            if (fieldMap[keys[i]] === 1 && this[keys[i]] !== undefined && this[keys[i]] !== null)
                return keys[i];
    };
};

/**
 * A OneOf setter as returned by {@link util.oneOfSetter}.
 * @typedef OneOfSetter
 * @type {function}
 * @param {string|undefined} value Field name
 * @returns {undefined}
 */

/**
 * Builds a setter for a oneof's present field name.
 * @param {string[]} fieldNames Field names
 * @returns {OneOfSetter} Unbound setter
 */
util.oneOfSetter = function setOneOf(fieldNames) {

    /**
     * @param {string} name Field name
     * @returns {undefined}
     * @this Object
     * @ignore
     */
    return function(name) {
        for (var i = 0; i < fieldNames.length; ++i)
            if (fieldNames[i] !== name)
                delete this[fieldNames[i]];
    };
};

/**
 * Default conversion options used for {@link Message#toJSON} implementations.
 *
 * These options are close to proto3's JSON mapping with the exception that internal types like Any are handled just like messages. More precisely:
 *
 * - Longs become strings
 * - Enums become string keys
 * - Bytes become base64 encoded strings
 * - (Sub-)Messages become plain objects
 * - Maps become plain objects with all string keys
 * - Repeated fields become arrays
 * - NaN and Infinity for float and double fields become strings
 *
 * @type {IConversionOptions}
 * @see https://developers.google.com/protocol-buffers/docs/proto3?hl=en#json
 */
util.toJSONOptions = {
    longs: String,
    enums: String,
    bytes: String,
    json: true
};

// Sets up buffer utility according to the environment (called in index-minimal)
util._configure = function() {
    var Buffer = util.Buffer;
    /* istanbul ignore if */
    if (!Buffer) {
        util._Buffer_from = util._Buffer_allocUnsafe = null;
        return;
    }
    // because node 4.x buffers are incompatible & immutable
    // see: https://github.com/dcodeIO/protobuf.js/pull/665
    util._Buffer_from = Buffer.from !== Uint8Array.from && Buffer.from ||
        /* istanbul ignore next */
        function Buffer_from(value, encoding) {
            return new Buffer(value, encoding);
        };
    util._Buffer_allocUnsafe = Buffer.allocUnsafe ||
        /* istanbul ignore next */
        function Buffer_allocUnsafe(size) {
            return new Buffer(size);
        };
};


/***/ }),

/***/ 3098:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

module.exports = Writer;

var util      = __nccwpck_require__(1241);

var BufferWriter; // cyclic

var LongBits  = util.LongBits,
    base64    = util.base64,
    utf8      = util.utf8;

/**
 * Constructs a new writer operation instance.
 * @classdesc Scheduled writer operation.
 * @constructor
 * @param {function(*, Uint8Array, number)} fn Function to call
 * @param {number} len Value byte length
 * @param {*} val Value to write
 * @ignore
 */
function Op(fn, len, val) {

    /**
     * Function to call.
     * @type {function(Uint8Array, number, *)}
     */
    this.fn = fn;

    /**
     * Value byte length.
     * @type {number}
     */
    this.len = len;

    /**
     * Next operation.
     * @type {Writer.Op|undefined}
     */
    this.next = undefined;

    /**
     * Value to write.
     * @type {*}
     */
    this.val = val; // type varies
}

/* istanbul ignore next */
function noop() {} // eslint-disable-line no-empty-function

/**
 * Constructs a new writer state instance.
 * @classdesc Copied writer state.
 * @memberof Writer
 * @constructor
 * @param {Writer} writer Writer to copy state from
 * @ignore
 */
function State(writer) {

    /**
     * Current head.
     * @type {Writer.Op}
     */
    this.head = writer.head;

    /**
     * Current tail.
     * @type {Writer.Op}
     */
    this.tail = writer.tail;

    /**
     * Current buffer length.
     * @type {number}
     */
    this.len = writer.len;

    /**
     * Next state.
     * @type {State|null}
     */
    this.next = writer.states;
}

/**
 * Constructs a new writer instance.
 * @classdesc Wire format writer using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 */
function Writer() {

    /**
     * Current length.
     * @type {number}
     */
    this.len = 0;

    /**
     * Operations head.
     * @type {Object}
     */
    this.head = new Op(noop, 0, 0);

    /**
     * Operations tail
     * @type {Object}
     */
    this.tail = this.head;

    /**
     * Linked forked states.
     * @type {Object|null}
     */
    this.states = null;

    // When a value is written, the writer calculates its byte length and puts it into a linked
    // list of operations to perform when finish() is called. This both allows us to allocate
    // buffers of the exact required size and reduces the amount of work we have to do compared
    // to first calculating over objects and then encoding over objects. In our case, the encoding
    // part is just a linked list walk calling operations with already prepared values.
}

var create = function create() {
    return util.Buffer
        ? function create_buffer_setup() {
            return (Writer.create = function create_buffer() {
                return new BufferWriter();
            })();
        }
        /* istanbul ignore next */
        : function create_array() {
            return new Writer();
        };
};

/**
 * Creates a new writer.
 * @function
 * @returns {BufferWriter|Writer} A {@link BufferWriter} when Buffers are supported, otherwise a {@link Writer}
 */
Writer.create = create();

/**
 * Allocates a buffer of the specified size.
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */
Writer.alloc = function alloc(size) {
    return new util.Array(size);
};

// Use Uint8Array buffer pool in the browser, just like node does with buffers
/* istanbul ignore else */
if (util.Array !== Array)
    Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);

/**
 * Pushes a new operation to the queue.
 * @param {function(Uint8Array, number, *)} fn Function to call
 * @param {number} len Value byte length
 * @param {number} val Value to write
 * @returns {Writer} `this`
 * @private
 */
Writer.prototype._push = function push(fn, len, val) {
    this.tail = this.tail.next = new Op(fn, len, val);
    this.len += len;
    return this;
};

function writeByte(val, buf, pos) {
    buf[pos] = val & 255;
}

function writeVarint32(val, buf, pos) {
    while (val > 127) {
        buf[pos++] = val & 127 | 128;
        val >>>= 7;
    }
    buf[pos] = val;
}

/**
 * Constructs a new varint writer operation instance.
 * @classdesc Scheduled varint writer operation.
 * @extends Op
 * @constructor
 * @param {number} len Value byte length
 * @param {number} val Value to write
 * @ignore
 */
function VarintOp(len, val) {
    this.len = len;
    this.next = undefined;
    this.val = val;
}

VarintOp.prototype = Object.create(Op.prototype);
VarintOp.prototype.fn = writeVarint32;

/**
 * Writes an unsigned 32 bit value as a varint.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.uint32 = function write_uint32(value) {
    // here, the call to this.push has been inlined and a varint specific Op subclass is used.
    // uint32 is by far the most frequently used operation and benefits significantly from this.
    this.len += (this.tail = this.tail.next = new VarintOp(
        (value = value >>> 0)
                < 128       ? 1
        : value < 16384     ? 2
        : value < 2097152   ? 3
        : value < 268435456 ? 4
        :                     5,
    value)).len;
    return this;
};

/**
 * Writes a signed 32 bit value as a varint.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.int32 = function write_int32(value) {
    return value < 0
        ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) // 10 bytes per spec
        : this.uint32(value);
};

/**
 * Writes a 32 bit value as a varint, zig-zag encoded.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.sint32 = function write_sint32(value) {
    return this.uint32((value << 1 ^ value >> 31) >>> 0);
};

function writeVarint64(val, buf, pos) {
    while (val.hi) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
        val.hi >>>= 7;
    }
    while (val.lo > 127) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = val.lo >>> 7;
    }
    buf[pos++] = val.lo;
}

/**
 * Writes an unsigned 64 bit value as a varint.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.uint64 = function write_uint64(value) {
    var bits = LongBits.from(value);
    return this._push(writeVarint64, bits.length(), bits);
};

/**
 * Writes a signed 64 bit value as a varint.
 * @function
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.int64 = Writer.prototype.uint64;

/**
 * Writes a signed 64 bit value as a varint, zig-zag encoded.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.sint64 = function write_sint64(value) {
    var bits = LongBits.from(value).zzEncode();
    return this._push(writeVarint64, bits.length(), bits);
};

/**
 * Writes a boolish value as a varint.
 * @param {boolean} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.bool = function write_bool(value) {
    return this._push(writeByte, 1, value ? 1 : 0);
};

function writeFixed32(val, buf, pos) {
    buf[pos    ] =  val         & 255;
    buf[pos + 1] =  val >>> 8   & 255;
    buf[pos + 2] =  val >>> 16  & 255;
    buf[pos + 3] =  val >>> 24;
}

/**
 * Writes an unsigned 32 bit value as fixed 32 bits.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.fixed32 = function write_fixed32(value) {
    return this._push(writeFixed32, 4, value >>> 0);
};

/**
 * Writes a signed 32 bit value as fixed 32 bits.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.sfixed32 = Writer.prototype.fixed32;

/**
 * Writes an unsigned 64 bit value as fixed 64 bits.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.fixed64 = function write_fixed64(value) {
    var bits = LongBits.from(value);
    return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
};

/**
 * Writes a signed 64 bit value as fixed 64 bits.
 * @function
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.sfixed64 = Writer.prototype.fixed64;

/**
 * Writes a float (32 bit).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.float = function write_float(value) {
    return this._push(util.float.writeFloatLE, 4, value);
};

/**
 * Writes a double (64 bit float).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.double = function write_double(value) {
    return this._push(util.float.writeDoubleLE, 8, value);
};

var writeBytes = util.Array.prototype.set
    ? function writeBytes_set(val, buf, pos) {
        buf.set(val, pos); // also works for plain array values
    }
    /* istanbul ignore next */
    : function writeBytes_for(val, buf, pos) {
        for (var i = 0; i < val.length; ++i)
            buf[pos + i] = val[i];
    };

/**
 * Writes a sequence of bytes.
 * @param {Uint8Array|string} value Buffer or base64 encoded string to write
 * @returns {Writer} `this`
 */
Writer.prototype.bytes = function write_bytes(value) {
    var len = value.length >>> 0;
    if (!len)
        return this._push(writeByte, 1, 0);
    if (util.isString(value)) {
        var buf = Writer.alloc(len = base64.length(value));
        base64.decode(value, buf, 0);
        value = buf;
    }
    return this.uint32(len)._push(writeBytes, len, value);
};

/**
 * Writes a string.
 * @param {string} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.string = function write_string(value) {
    var len = utf8.length(value);
    return len
        ? this.uint32(len)._push(utf8.write, len, value)
        : this._push(writeByte, 1, 0);
};

/**
 * Forks this writer's state by pushing it to a stack.
 * Calling {@link Writer#reset|reset} or {@link Writer#ldelim|ldelim} resets the writer to the previous state.
 * @returns {Writer} `this`
 */
Writer.prototype.fork = function fork() {
    this.states = new State(this);
    this.head = this.tail = new Op(noop, 0, 0);
    this.len = 0;
    return this;
};

/**
 * Resets this instance to the last state.
 * @returns {Writer} `this`
 */
Writer.prototype.reset = function reset() {
    if (this.states) {
        this.head   = this.states.head;
        this.tail   = this.states.tail;
        this.len    = this.states.len;
        this.states = this.states.next;
    } else {
        this.head = this.tail = new Op(noop, 0, 0);
        this.len  = 0;
    }
    return this;
};

/**
 * Resets to the last state and appends the fork state's current write length as a varint followed by its operations.
 * @returns {Writer} `this`
 */
Writer.prototype.ldelim = function ldelim() {
    var head = this.head,
        tail = this.tail,
        len  = this.len;
    this.reset().uint32(len);
    if (len) {
        this.tail.next = head.next; // skip noop
        this.tail = tail;
        this.len += len;
    }
    return this;
};

/**
 * Finishes the write operation.
 * @returns {Uint8Array} Finished buffer
 */
Writer.prototype.finish = function finish() {
    var head = this.head.next, // skip noop
        buf  = this.constructor.alloc(this.len),
        pos  = 0;
    while (head) {
        head.fn(head.val, buf, pos);
        pos += head.len;
        head = head.next;
    }
    // this.head = this.tail = null;
    return buf;
};

Writer._configure = function(BufferWriter_) {
    BufferWriter = BufferWriter_;
    Writer.create = create();
    BufferWriter._configure();
};


/***/ }),

/***/ 1863:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

module.exports = BufferWriter;

// extends Writer
var Writer = __nccwpck_require__(3098);
(BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;

var util = __nccwpck_require__(1241);

/**
 * Constructs a new buffer writer instance.
 * @classdesc Wire format writer using node buffers.
 * @extends Writer
 * @constructor
 */
function BufferWriter() {
    Writer.call(this);
}

BufferWriter._configure = function () {
    /**
     * Allocates a buffer of the specified size.
     * @function
     * @param {number} size Buffer size
     * @returns {Buffer} Buffer
     */
    BufferWriter.alloc = util._Buffer_allocUnsafe;

    BufferWriter.writeBytesBuffer = util.Buffer && util.Buffer.prototype instanceof Uint8Array && util.Buffer.prototype.set.name === "set"
        ? function writeBytesBuffer_set(val, buf, pos) {
          buf.set(val, pos); // faster than copy (requires node >= 4 where Buffers extend Uint8Array and set is properly inherited)
          // also works for plain array values
        }
        /* istanbul ignore next */
        : function writeBytesBuffer_copy(val, buf, pos) {
          if (val.copy) // Buffer values
            val.copy(buf, pos, 0, val.length);
          else for (var i = 0; i < val.length;) // plain array values
            buf[pos++] = val[i++];
        };
};


/**
 * @override
 */
BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
    if (util.isString(value))
        value = util._Buffer_from(value, "base64");
    var len = value.length >>> 0;
    this.uint32(len);
    if (len)
        this._push(BufferWriter.writeBytesBuffer, len, value);
    return this;
};

function writeStringBuffer(val, buf, pos) {
    if (val.length < 40) // plain js is faster for short strings (probably due to redundant assertions)
        util.utf8.write(val, buf, pos);
    else if (buf.utf8Write)
        buf.utf8Write(val, pos);
    else
        buf.write(val, pos);
}

/**
 * @override
 */
BufferWriter.prototype.string = function write_string_buffer(value) {
    var len = util.Buffer.byteLength(value);
    this.uint32(len);
    if (len)
        this._push(writeStringBuffer, len, value);
    return this;
};


/**
 * Finishes the write operation.
 * @name BufferWriter#finish
 * @function
 * @returns {Buffer} Finished buffer
 */

BufferWriter._configure();


/***/ }),

/***/ 4580:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {


const { instantiateSync } = __nccwpck_require__(1748);
const fs = __nccwpck_require__(5747)

loadWebAssembly.supported = typeof WebAssembly !== 'undefined'

async function loadWebAssembly (imp = {}) {
  if (!loadWebAssembly.supported) return null
  
  return instantiateSync(fs.readFileSync(__nccwpck_require__.ab + "rabin.wasm"), imp);
}
module.exports = loadWebAssembly


/***/ }),

/***/ 1715:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Rabin = __nccwpck_require__(5519)
const getRabin = __nccwpck_require__(4580)

const create = async (avg, min, max, windowSize, polynomial) => {
    const compiled = await getRabin()
    return new Rabin(compiled, avg, min, max, windowSize, polynomial)
}

module.exports = {
    Rabin,
    create
}


/***/ }),

/***/ 5519:
/***/ ((module) => {

/**
 * Rabin fingerprinting
 *
 * @class Rabin
 */
class Rabin {
    /**
     * Creates an instance of Rabin.
     * @param { import("./../dist/rabin-wasm") } asModule
     * @param {number} [bits=12]
     * @param {number} [min=8 * 1024]
     * @param {number} [max=32 * 1024]
     * @param {number} polynomial
     * @memberof Rabin
     */
    constructor(asModule, bits = 12, min = 8 * 1024, max = 32 * 1024, windowSize = 64, polynomial) {
        this.bits = bits
        this.min = min
        this.max = max
        this.asModule = asModule
        this.rabin = new asModule.Rabin(bits, min, max, windowSize, polynomial)
        this.polynomial = polynomial
    }

    /**
     * Fingerprints the buffer
     *
     * @param {Uint8Array} buf
     * @returns {Array<number>}
     * @memberof Rabin
     */
    fingerprint(buf) {
        const {
            __retain,
            __release,
            __allocArray,
            __getInt32Array,
            Int32Array_ID,
            Uint8Array_ID
        } = this.asModule

        const lengths = new Int32Array(Math.ceil(buf.length/this.min))
        const lengthsPtr = __retain(__allocArray(Int32Array_ID, lengths))
        const pointer = __retain(__allocArray(Uint8Array_ID, buf))

        const out = this.rabin.fingerprint(pointer, lengthsPtr)
        const processed = __getInt32Array(out)

        __release(pointer)
        __release(lengthsPtr)

        const end = processed.indexOf(0);
        return end >= 0 ? processed.subarray(0, end) : processed;
    }
}

module.exports = Rabin

/***/ }),

/***/ 4347:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = __nccwpck_require__(6244);

/***/ }),

/***/ 6244:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

var RetryOperation = __nccwpck_require__(5369);

exports.operation = function(options) {
  var timeouts = exports.timeouts(options);
  return new RetryOperation(timeouts, {
      forever: options && (options.forever || options.retries === Infinity),
      unref: options && options.unref,
      maxRetryTime: options && options.maxRetryTime
  });
};

exports.timeouts = function(options) {
  if (options instanceof Array) {
    return [].concat(options);
  }

  var opts = {
    retries: 10,
    factor: 2,
    minTimeout: 1 * 1000,
    maxTimeout: Infinity,
    randomize: false
  };
  for (var key in options) {
    opts[key] = options[key];
  }

  if (opts.minTimeout > opts.maxTimeout) {
    throw new Error('minTimeout is greater than maxTimeout');
  }

  var timeouts = [];
  for (var i = 0; i < opts.retries; i++) {
    timeouts.push(this.createTimeout(i, opts));
  }

  if (options && options.forever && !timeouts.length) {
    timeouts.push(this.createTimeout(i, opts));
  }

  // sort the array numerically ascending
  timeouts.sort(function(a,b) {
    return a - b;
  });

  return timeouts;
};

exports.createTimeout = function(attempt, opts) {
  var random = (opts.randomize)
    ? (Math.random() + 1)
    : 1;

  var timeout = Math.round(random * Math.max(opts.minTimeout, 1) * Math.pow(opts.factor, attempt));
  timeout = Math.min(timeout, opts.maxTimeout);

  return timeout;
};

exports.wrap = function(obj, options, methods) {
  if (options instanceof Array) {
    methods = options;
    options = null;
  }

  if (!methods) {
    methods = [];
    for (var key in obj) {
      if (typeof obj[key] === 'function') {
        methods.push(key);
      }
    }
  }

  for (var i = 0; i < methods.length; i++) {
    var method   = methods[i];
    var original = obj[method];

    obj[method] = function retryWrapper(original) {
      var op       = exports.operation(options);
      var args     = Array.prototype.slice.call(arguments, 1);
      var callback = args.pop();

      args.push(function(err) {
        if (op.retry(err)) {
          return;
        }
        if (err) {
          arguments[0] = op.mainError();
        }
        callback.apply(this, arguments);
      });

      op.attempt(function() {
        original.apply(obj, args);
      });
    }.bind(obj, original);
    obj[method].options = options;
  }
};


/***/ }),

/***/ 5369:
/***/ ((module) => {

function RetryOperation(timeouts, options) {
  // Compatibility for the old (timeouts, retryForever) signature
  if (typeof options === 'boolean') {
    options = { forever: options };
  }

  this._originalTimeouts = JSON.parse(JSON.stringify(timeouts));
  this._timeouts = timeouts;
  this._options = options || {};
  this._maxRetryTime = options && options.maxRetryTime || Infinity;
  this._fn = null;
  this._errors = [];
  this._attempts = 1;
  this._operationTimeout = null;
  this._operationTimeoutCb = null;
  this._timeout = null;
  this._operationStart = null;
  this._timer = null;

  if (this._options.forever) {
    this._cachedTimeouts = this._timeouts.slice(0);
  }
}
module.exports = RetryOperation;

RetryOperation.prototype.reset = function() {
  this._attempts = 1;
  this._timeouts = this._originalTimeouts.slice(0);
}

RetryOperation.prototype.stop = function() {
  if (this._timeout) {
    clearTimeout(this._timeout);
  }
  if (this._timer) {
    clearTimeout(this._timer);
  }

  this._timeouts       = [];
  this._cachedTimeouts = null;
};

RetryOperation.prototype.retry = function(err) {
  if (this._timeout) {
    clearTimeout(this._timeout);
  }

  if (!err) {
    return false;
  }
  var currentTime = new Date().getTime();
  if (err && currentTime - this._operationStart >= this._maxRetryTime) {
    this._errors.push(err);
    this._errors.unshift(new Error('RetryOperation timeout occurred'));
    return false;
  }

  this._errors.push(err);

  var timeout = this._timeouts.shift();
  if (timeout === undefined) {
    if (this._cachedTimeouts) {
      // retry forever, only keep last error
      this._errors.splice(0, this._errors.length - 1);
      timeout = this._cachedTimeouts.slice(-1);
    } else {
      return false;
    }
  }

  var self = this;
  this._timer = setTimeout(function() {
    self._attempts++;

    if (self._operationTimeoutCb) {
      self._timeout = setTimeout(function() {
        self._operationTimeoutCb(self._attempts);
      }, self._operationTimeout);

      if (self._options.unref) {
          self._timeout.unref();
      }
    }

    self._fn(self._attempts);
  }, timeout);

  if (this._options.unref) {
      this._timer.unref();
  }

  return true;
};

RetryOperation.prototype.attempt = function(fn, timeoutOps) {
  this._fn = fn;

  if (timeoutOps) {
    if (timeoutOps.timeout) {
      this._operationTimeout = timeoutOps.timeout;
    }
    if (timeoutOps.cb) {
      this._operationTimeoutCb = timeoutOps.cb;
    }
  }

  var self = this;
  if (this._operationTimeoutCb) {
    this._timeout = setTimeout(function() {
      self._operationTimeoutCb();
    }, self._operationTimeout);
  }

  this._operationStart = new Date().getTime();

  this._fn(this._attempts);
};

RetryOperation.prototype.try = function(fn) {
  console.log('Using RetryOperation.try() is deprecated');
  this.attempt(fn);
};

RetryOperation.prototype.start = function(fn) {
  console.log('Using RetryOperation.start() is deprecated');
  this.attempt(fn);
};

RetryOperation.prototype.start = RetryOperation.prototype.try;

RetryOperation.prototype.errors = function() {
  return this._errors;
};

RetryOperation.prototype.attempts = function() {
  return this._attempts;
};

RetryOperation.prototype.mainError = function() {
  if (this._errors.length === 0) {
    return null;
  }

  var counts = {};
  var mainError = null;
  var mainErrorCount = 0;

  for (var i = 0; i < this._errors.length; i++) {
    var error = this._errors[i];
    var message = error.message;
    var count = (counts[message] || 0) + 1;

    counts[message] = count;

    if (count >= mainErrorCount) {
      mainError = error;
      mainErrorCount = count;
    }
  }

  return mainError;
};


/***/ }),

/***/ 1128:
/***/ ((module) => {

"use strict";


// JS treats subjects of bitwise operators as SIGNED 32 bit numbers,
// which means the maximum amount of bits we can store inside each byte
// is 7..
const BITS_PER_BYTE = 7

module.exports = class SparseArray {
  constructor () {
    this._bitArrays = []
    this._data = []
    this._length = 0
    this._changedLength = false
    this._changedData = false
  }

  set (index, value) {
    let pos = this._internalPositionFor(index, false)
    if (value === undefined) {
      // unsetting
      if (pos !== -1) {
        // remove item from bit array and array itself
        this._unsetInternalPos(pos)
        this._unsetBit(index)
        this._changedLength = true
        this._changedData = true
      }
    } else {
      let needsSort = false
      if (pos === -1) {
        pos = this._data.length
        this._setBit(index)
        this._changedData = true
      } else {
        needsSort = true
      }
      this._setInternalPos(pos, index, value, needsSort)
      this._changedLength = true
    }
  }

  unset (index) {
    this.set(index, undefined)
  }

  get (index) {
    this._sortData()
    const pos = this._internalPositionFor(index, true)
    if (pos === -1) {
      return undefined
    }
    return this._data[pos][1]
  }

  push (value) {
    this.set(this.length, value)
    return this.length
  }

  get length () {
    this._sortData()
    if (this._changedLength) {
      const last = this._data[this._data.length - 1]
      this._length = last ? last[0] + 1 : 0
      this._changedLength = false
    }
    return this._length
  }

  forEach (iterator) {
    let i = 0
    while(i < this.length) {
      iterator(this.get(i), i, this)
      i++
    }
  }

  map (iterator) {
    let i = 0
    let mapped = new Array(this.length)
    while(i < this.length) {
      mapped[i] = iterator(this.get(i), i, this)
      i++
    }
    return mapped
  }

  reduce (reducer, initialValue) {
    let i = 0
    let acc = initialValue
    while(i < this.length) {
      const value = this.get(i)
      acc = reducer(acc, value, i)
      i++
    }
    return acc
  }

  find (finder) {
    let i = 0, found, last
    while ((i < this.length) && !found) {
      last = this.get(i)
      found = finder(last)
      i++
    }
    return found ? last : undefined
  }

  _internalPositionFor (index, noCreate) {
    const bytePos = this._bytePosFor(index, noCreate)
    if (bytePos >= this._bitArrays.length) {
      return -1
    }
    const byte = this._bitArrays[bytePos]
    const bitPos = index - bytePos * BITS_PER_BYTE
    const exists = (byte & (1 << bitPos)) > 0
    if (!exists) {
      return -1
    }
    const previousPopCount = this._bitArrays.slice(0, bytePos).reduce(popCountReduce, 0)

    const mask = ~(0xffffffff << (bitPos + 1))
    const bytePopCount = popCount(byte & mask)
    const arrayPos = previousPopCount + bytePopCount - 1
    return arrayPos
  }

  _bytePosFor (index, noCreate) {
    const bytePos = Math.floor(index / BITS_PER_BYTE)
    const targetLength = bytePos + 1
    while (!noCreate && this._bitArrays.length < targetLength) {
      this._bitArrays.push(0)
    }
    return bytePos
  }

  _setBit (index) {
    const bytePos = this._bytePosFor(index, false)
    this._bitArrays[bytePos] |= (1 << (index - (bytePos * BITS_PER_BYTE)))
  }

  _unsetBit(index) {
    const bytePos = this._bytePosFor(index, false)
    this._bitArrays[bytePos] &= ~(1 << (index - (bytePos * BITS_PER_BYTE)))
  }

  _setInternalPos(pos, index, value, needsSort) {
    const data =this._data
    const elem = [index, value]
    if (needsSort) {
      this._sortData()
      data[pos] = elem
    } else {
      // new element. just shove it into the array
      // but be nice about where we shove it
      // in order to make sorting it later easier
      if (data.length) {
        if (data[data.length - 1][0] >= index) {
          data.push(elem)
        } else if (data[0][0] <= index) {
          data.unshift(elem)
        } else {
          const randomIndex = Math.round(data.length / 2)
          this._data = data.slice(0, randomIndex).concat(elem).concat(data.slice(randomIndex))
        }
      } else {
        this._data.push(elem)
      }
      this._changedData = true
      this._changedLength = true
    }
  }

  _unsetInternalPos (pos) {
    this._data.splice(pos, 1)
  }

  _sortData () {
    if (this._changedData) {
      this._data.sort(sortInternal)
    }

    this._changedData = false
  }

  bitField () {
    const bytes = []
    let pendingBitsForResultingByte = 8
    let pendingBitsForNewByte = 0
    let resultingByte = 0
    let newByte
    const pending = this._bitArrays.slice()
    while (pending.length || pendingBitsForNewByte) {
      if (pendingBitsForNewByte === 0) {
        newByte = pending.shift()
        pendingBitsForNewByte = 7
      }

      const usingBits = Math.min(pendingBitsForNewByte, pendingBitsForResultingByte)
      const mask = ~(0b11111111 << usingBits)
      const masked = newByte & mask
      resultingByte |= masked << (8 - pendingBitsForResultingByte)
      newByte = newByte >>> usingBits
      pendingBitsForNewByte -= usingBits
      pendingBitsForResultingByte -= usingBits

      if (!pendingBitsForResultingByte || (!pendingBitsForNewByte && !pending.length)) {
        bytes.push(resultingByte)
        resultingByte = 0
        pendingBitsForResultingByte = 8
      }
    }

    // remove trailing zeroes
    for(var i = bytes.length - 1; i > 0; i--) {
      const value = bytes[i]
      if (value === 0) {
        bytes.pop()
      } else {
        break
      }
    }

    return bytes
  }

  compactArray () {
    this._sortData()
    return this._data.map(valueOnly)
  }
}

function popCountReduce (count, byte) {
  return count + popCount(byte)
}

function popCount(_v) {
  let v = _v
  v = v - ((v >> 1) & 0x55555555)                    // reuse input as temporary
  v = (v & 0x33333333) + ((v >> 2) & 0x33333333)     // temp
  return ((v + (v >> 4) & 0xF0F0F0F) * 0x1010101) >> 24
}

function sortInternal (a, b) {
  return a[0] - b[0]
}

function valueOnly (elem) {
  return elem[1]
}

/***/ }),

/***/ 8205:
/***/ (function(__unused_webpack_module, exports) {

(function (global, factory) {
     true ? factory(exports) :
    0;
}(this, (function (exports) { 'use strict';

    async function* _batch(size, iterable) {
        let dataBatch = [];
        for await (const data of iterable) {
            dataBatch.push(data);
            if (dataBatch.length === size) {
                yield dataBatch;
                dataBatch = [];
            }
        }
        if (dataBatch.length > 0) {
            yield dataBatch;
        }
    }
    function* _syncBatch(size, iterable) {
        let dataBatch = [];
        for (const data of iterable) {
            dataBatch.push(data);
            if (dataBatch.length === size) {
                yield dataBatch;
                dataBatch = [];
            }
        }
        if (dataBatch.length > 0) {
            yield dataBatch;
        }
    }
    function batch(size, iterable) {
        if (iterable === undefined) {
            return curriedIterable => batch(size, curriedIterable);
        }
        if (iterable[Symbol.asyncIterator]) {
            return _batch(size, iterable);
        }
        return _syncBatch(size, iterable);
    }

    function getIterator(iterable) {
        if (typeof iterable.next === 'function') {
            return iterable;
        }
        if (typeof iterable[Symbol.iterator] === 'function') {
            return iterable[Symbol.iterator]();
        }
        if (typeof iterable[Symbol.asyncIterator] === 'function') {
            return iterable[Symbol.asyncIterator]();
        }
        throw new TypeError('"values" does not to conform to any of the iterator or iterable protocols');
    }

    function defer() {
        let reject;
        let resolve;
        const promise = new Promise((resolveFunc, rejectFunc) => {
            resolve = resolveFunc;
            reject = rejectFunc;
        });
        return {
            promise,
            reject,
            resolve,
        };
    }

    /// <reference lib="esnext.asynciterable" />
    function _buffer(size, iterable) {
        const iterator = getIterator(iterable);
        const resultQueue = [];
        const readQueue = [];
        let reading = false;
        let ended = false;
        function fulfillReadQueue() {
            while (readQueue.length > 0 && resultQueue.length > 0) {
                const readDeferred = readQueue.shift();
                const { error, value } = resultQueue.shift();
                if (error) {
                    readDeferred.reject(error);
                }
                else {
                    readDeferred.resolve({ done: false, value });
                }
            }
            while (readQueue.length > 0 && ended) {
                const { resolve } = readQueue.shift();
                resolve({ done: true, value: undefined });
            }
        }
        async function fillQueue() {
            if (ended) {
                return;
            }
            if (reading) {
                return;
            }
            if (resultQueue.length >= size) {
                return;
            }
            reading = true;
            try {
                const { done, value } = await iterator.next();
                if (done) {
                    ended = true;
                }
                else {
                    resultQueue.push({ value });
                }
            }
            catch (error) {
                ended = true;
                resultQueue.push({ error });
            }
            fulfillReadQueue();
            reading = false;
            fillQueue();
        }
        async function next() {
            if (resultQueue.length > 0) {
                const { error, value } = resultQueue.shift();
                if (error) {
                    throw error;
                }
                fillQueue();
                return { done: false, value };
            }
            if (ended) {
                return { done: true, value: undefined }; // stupid ts
            }
            const deferred = defer();
            readQueue.push(deferred);
            fillQueue();
            return deferred.promise;
        }
        const asyncIterableIterator = {
            next,
            [Symbol.asyncIterator]: () => asyncIterableIterator,
        };
        return asyncIterableIterator;
    }
    function* syncBuffer(size, iterable) {
        const valueQueue = [];
        let e;
        try {
            for (const value of iterable) {
                valueQueue.push(value);
                if (valueQueue.length <= size) {
                    continue;
                }
                yield valueQueue.shift();
            }
        }
        catch (error) {
            e = error;
        }
        for (const value of valueQueue) {
            yield value;
        }
        if (e) {
            throw e;
        }
    }
    function buffer(size, iterable) {
        if (iterable === undefined) {
            return curriedIterable => buffer(size, curriedIterable);
        }
        if (size === 0) {
            return iterable;
        }
        if (iterable[Symbol.asyncIterator]) {
            return _buffer(size, iterable);
        }
        return syncBuffer(size, iterable);
    }

    async function _collect(iterable) {
        const values = [];
        for await (const value of iterable) {
            values.push(value);
        }
        return values;
    }
    function collect(iterable) {
        if (iterable[Symbol.asyncIterator]) {
            return _collect(iterable);
        }
        return Array.from(iterable);
    }

    async function* _concat(iterables) {
        for await (const iterable of iterables) {
            yield* iterable;
        }
    }
    function* _syncConcat(iterables) {
        for (const iterable of iterables) {
            yield* iterable;
        }
    }
    function concat(...iterables) {
        const hasAnyAsync = iterables.find(itr => itr[Symbol.asyncIterator] !== undefined);
        if (hasAnyAsync) {
            return _concat(iterables);
        }
        else {
            return _syncConcat(iterables);
        }
    }

    async function _consume(iterable) {
        for await (const val of iterable) {
            // do nothing
        }
    }
    function consume(iterable) {
        if (iterable[Symbol.asyncIterator]) {
            return _consume(iterable);
        }
        for (const val of iterable) {
            // do nothing
        }
    }

    async function* _filter(filterFunc, iterable) {
        for await (const data of iterable) {
            if (await filterFunc(data)) {
                yield data;
            }
        }
    }
    function filter(filterFunc, iterable) {
        if (iterable === undefined) {
            return (curriedIterable) => _filter(filterFunc, curriedIterable);
        }
        return _filter(filterFunc, iterable);
    }

    async function* flatten(iterable) {
        for await (const maybeItr of iterable) {
            if (maybeItr && typeof maybeItr !== 'string' && (maybeItr[Symbol.iterator] || maybeItr[Symbol.asyncIterator])) {
                yield* flatten(maybeItr);
            }
            else {
                yield maybeItr;
            }
        }
    }

    async function* _map(func, iterable) {
        for await (const val of iterable) {
            yield await func(val);
        }
    }
    function map(func, iterable) {
        if (iterable === undefined) {
            return curriedIterable => _map(func, curriedIterable);
        }
        return _map(func, iterable);
    }

    function flatMap(func, iterable) {
        if (iterable === undefined) {
            return curriedIterable => flatMap(func, curriedIterable);
        }
        return filter(i => i !== undefined && i !== null, flatten(map(func, iterable)));
    }

    function _flatTransform(concurrency, func, iterable) {
        const iterator = getIterator(iterable);
        const resultQueue = [];
        const readQueue = [];
        let ended = false;
        let reading = false;
        let inflightCount = 0;
        let lastError = null;
        function fulfillReadQueue() {
            while (readQueue.length > 0 && resultQueue.length > 0) {
                const { resolve } = readQueue.shift();
                const value = resultQueue.shift();
                resolve({ done: false, value });
            }
            while (readQueue.length > 0 && inflightCount === 0 && ended) {
                const { resolve, reject } = readQueue.shift();
                if (lastError) {
                    reject(lastError);
                    lastError = null;
                }
                else {
                    resolve({ done: true, value: undefined });
                }
            }
        }
        async function fillQueue() {
            if (ended) {
                fulfillReadQueue();
                return;
            }
            if (reading) {
                return;
            }
            if (inflightCount + resultQueue.length >= concurrency) {
                return;
            }
            reading = true;
            inflightCount++;
            try {
                const { done, value } = await iterator.next();
                if (done) {
                    ended = true;
                    inflightCount--;
                    fulfillReadQueue();
                }
                else {
                    mapAndQueue(value);
                }
            }
            catch (error) {
                ended = true;
                inflightCount--;
                lastError = error;
                fulfillReadQueue();
            }
            reading = false;
            fillQueue();
        }
        async function mapAndQueue(itrValue) {
            try {
                const value = await func(itrValue);
                if (value && value[Symbol.asyncIterator]) {
                    for await (const asyncVal of value) {
                        resultQueue.push(asyncVal);
                    }
                }
                else {
                    resultQueue.push(value);
                }
            }
            catch (error) {
                ended = true;
                lastError = error;
            }
            inflightCount--;
            fulfillReadQueue();
            fillQueue();
        }
        async function next() {
            if (resultQueue.length === 0) {
                const deferred = defer();
                readQueue.push(deferred);
                fillQueue();
                return deferred.promise;
            }
            const value = resultQueue.shift();
            fillQueue();
            return { done: false, value };
        }
        const asyncIterableIterator = {
            next,
            [Symbol.asyncIterator]: () => asyncIterableIterator,
        };
        return asyncIterableIterator;
    }
    function flatTransform(concurrency, func, iterable) {
        if (func === undefined) {
            return (curriedFunc, curriedIterable) => curriedIterable
                ? flatTransform(concurrency, curriedFunc, curriedIterable)
                : flatTransform(concurrency, curriedFunc);
        }
        if (iterable === undefined) {
            return (curriedIterable) => flatTransform(concurrency, func, curriedIterable);
        }
        return filter(i => i !== undefined && i !== null, flatten(_flatTransform(concurrency, func, iterable)));
    }

    async function onceReadable(stream) {
        return new Promise(resolve => {
            stream.once('readable', () => {
                resolve();
            });
        });
    }
    async function* _fromStream(stream) {
        while (true) {
            const data = stream.read();
            if (data !== null) {
                yield data;
                continue;
            }
            if (stream._readableState.ended) {
                break;
            }
            await onceReadable(stream);
        }
    }
    function fromStream(stream) {
        if (typeof stream[Symbol.asyncIterator] === 'function') {
            return stream;
        }
        return _fromStream(stream);
    }

    async function* merge(...iterables) {
        const sources = new Set(iterables.map(getIterator));
        while (sources.size > 0) {
            for (const iterator of sources) {
                const nextVal = await iterator.next();
                if (nextVal.done) {
                    sources.delete(iterator);
                }
                else {
                    yield nextVal.value;
                }
            }
        }
    }

    function pipeline(firstFn, ...fns) {
        let previousFn = firstFn();
        for (const func of fns) {
            previousFn = func(previousFn);
        }
        return previousFn;
    }

    async function* _parallelMap(concurrency, func, iterable) {
        let transformError = null;
        const wrapFunc = value => ({
            value: func(value),
        });
        const stopOnError = async function* (source) {
            for await (const value of source) {
                if (transformError) {
                    return;
                }
                yield value;
            }
        };
        const output = pipeline(() => iterable, buffer(1), stopOnError, map(wrapFunc), buffer(concurrency - 1));
        const itr = getIterator(output);
        while (true) {
            const { value, done } = await itr.next();
            if (done) {
                break;
            }
            try {
                const val = await value.value;
                if (!transformError) {
                    yield val;
                }
            }
            catch (error) {
                transformError = error;
            }
        }
        if (transformError) {
            throw transformError;
        }
    }
    function parallelMap(concurrency, func, iterable) {
        if (func === undefined) {
            return (curriedFunc, curriedIterable) => parallelMap(concurrency, curriedFunc, curriedIterable);
        }
        if (iterable === undefined) {
            return curriedIterable => parallelMap(concurrency, func, curriedIterable);
        }
        if (concurrency === 1) {
            return map(func, iterable);
        }
        return _parallelMap(concurrency, func, iterable);
    }

    function parallelFlatMap(concurrency, func, iterable) {
        if (func === undefined) {
            return (curriedFunc, curriedIterable) => curriedIterable
                ? parallelFlatMap(concurrency, curriedFunc, curriedIterable)
                : parallelFlatMap(concurrency, curriedFunc);
        }
        if (iterable === undefined) {
            return (curriedIterable) => parallelFlatMap(concurrency, func, curriedIterable);
        }
        return filter(i => i !== undefined && i !== null, flatten(parallelMap(concurrency, func, iterable)));
    }

    /// <reference lib="esnext.asynciterable" />
    async function* parallelMerge(...iterables) {
        const inputs = iterables.map(getIterator);
        const concurrentWork = new Set();
        const values = new Map();
        let lastError = null;
        let errCb = null;
        let valueCb = null;
        const notifyError = err => {
            lastError = err;
            if (errCb) {
                errCb(err);
            }
        };
        const notifyDone = value => {
            if (valueCb) {
                valueCb(value);
            }
        };
        const waitForQueue = () => new Promise((resolve, reject) => {
            if (lastError) {
                reject(lastError);
            }
            if (values.size > 0) {
                return resolve();
            }
            valueCb = resolve;
            errCb = reject;
        });
        const queueNext = input => {
            const nextVal = Promise.resolve(input.next()).then(async ({ done, value }) => {
                if (!done) {
                    values.set(input, value);
                }
                concurrentWork.delete(nextVal);
            });
            concurrentWork.add(nextVal);
            nextVal.then(notifyDone, notifyError);
        };
        for (const input of inputs) {
            queueNext(input);
        }
        while (true) {
            // We technically don't have to check `values.size` as the for loop should have emptied it
            // However I haven't yet found specs verifying that behavior, only tests
            // the guard in waitForQueue() checking for values is in place for the same reason
            if (concurrentWork.size === 0 && values.size === 0) {
                return;
            }
            await waitForQueue();
            for (const [input, value] of values) {
                values.delete(input);
                yield value;
                queueNext(input);
            }
        }
    }

    async function _reduce(func, start, iterable) {
        let value = start;
        for await (const nextItem of iterable) {
            value = await func(value, nextItem);
        }
        return value;
    }
    function reduce(func, start, iterable) {
        if (start === undefined) {
            return (curriedStart, curriedIterable) => curriedIterable ? _reduce(func, curriedStart, curriedIterable) : reduce(func, curriedStart);
        }
        if (iterable === undefined) {
            return (curriedIterable) => reduce(func, start, curriedIterable);
        }
        return _reduce(func, start, iterable);
    }

    async function* _take(count, iterable) {
        let taken = 0;
        for await (const val of iterable) {
            yield await val;
            taken++;
            if (taken >= count) {
                break;
            }
        }
    }
    function* _syncTake(count, iterable) {
        let taken = 0;
        for (const val of iterable) {
            yield val;
            taken++;
            if (taken >= count) {
                break;
            }
        }
    }
    function take(count, iterable) {
        if (iterable === undefined) {
            return curriedIterable => take(count, curriedIterable);
        }
        if (iterable[Symbol.asyncIterator]) {
            return _take(count, iterable);
        }
        return _syncTake(count, iterable);
    }

    async function* _asyncTap(func, iterable) {
        for await (const val of iterable) {
            await func(val);
            yield val;
        }
    }
    function tap(func, iterable) {
        if (iterable === undefined) {
            return (curriedIterable) => _asyncTap(func, curriedIterable);
        }
        return _asyncTap(func, iterable);
    }

    function addTime(a, b) {
        let seconds = a[0] + b[0];
        let nanoseconds = a[1] + b[1];
        if (nanoseconds >= 1000000000) {
            const remainder = nanoseconds % 1000000000;
            seconds += (nanoseconds - remainder) / 1000000000;
            nanoseconds = remainder;
        }
        return [seconds, nanoseconds];
    }
    async function* _asyncTime(config, iterable) {
        const itr = iterable[Symbol.asyncIterator]();
        let total = [0, 0];
        while (true) {
            const start = process.hrtime();
            const { value, done } = await itr.next();
            const delta = process.hrtime(start);
            total = addTime(total, delta);
            if (config.progress) {
                config.progress(delta, total);
            }
            if (done) {
                if (config.total) {
                    config.total(total);
                }
                return value;
            }
            yield value;
        }
    }
    function* _syncTime(config, iterable) {
        const itr = iterable[Symbol.iterator]();
        let total = [0, 0];
        while (true) {
            const start = process.hrtime();
            const { value, done } = itr.next();
            const delta = process.hrtime(start);
            total = addTime(total, delta);
            if (config.progress) {
                config.progress(delta, total);
            }
            if (done) {
                if (config.total) {
                    config.total(total);
                }
                return value;
            }
            yield value;
        }
    }
    function time(config = {}, iterable) {
        if (iterable === undefined) {
            return curriedIterable => time(config, curriedIterable);
        }
        if (iterable[Symbol.asyncIterator] !== undefined) {
            return _asyncTime(config, iterable);
        }
        else {
            return _syncTime(config, iterable);
        }
    }

    function _transform(concurrency, func, iterable) {
        const iterator = getIterator(iterable);
        const resultQueue = [];
        const readQueue = [];
        let ended = false;
        let reading = false;
        let inflightCount = 0;
        let lastError = null;
        function fulfillReadQueue() {
            while (readQueue.length > 0 && resultQueue.length > 0) {
                const { resolve } = readQueue.shift();
                const value = resultQueue.shift();
                resolve({ done: false, value });
            }
            while (readQueue.length > 0 && inflightCount === 0 && ended) {
                const { resolve, reject } = readQueue.shift();
                if (lastError) {
                    reject(lastError);
                    lastError = null;
                }
                else {
                    resolve({ done: true, value: undefined });
                }
            }
        }
        async function fillQueue() {
            if (ended) {
                fulfillReadQueue();
                return;
            }
            if (reading) {
                return;
            }
            if (inflightCount + resultQueue.length >= concurrency) {
                return;
            }
            reading = true;
            inflightCount++;
            try {
                const { done, value } = await iterator.next();
                if (done) {
                    ended = true;
                    inflightCount--;
                    fulfillReadQueue();
                }
                else {
                    mapAndQueue(value);
                }
            }
            catch (error) {
                ended = true;
                inflightCount--;
                lastError = error;
                fulfillReadQueue();
            }
            reading = false;
            fillQueue();
        }
        async function mapAndQueue(itrValue) {
            try {
                const value = await func(itrValue);
                resultQueue.push(value);
            }
            catch (error) {
                ended = true;
                lastError = error;
            }
            inflightCount--;
            fulfillReadQueue();
            fillQueue();
        }
        async function next() {
            if (resultQueue.length === 0) {
                const deferred = defer();
                readQueue.push(deferred);
                fillQueue();
                return deferred.promise;
            }
            const value = resultQueue.shift();
            fillQueue();
            return { done: false, value };
        }
        const asyncIterableIterator = {
            next,
            [Symbol.asyncIterator]: () => asyncIterableIterator,
        };
        return asyncIterableIterator;
    }
    function transform(concurrency, func, iterable) {
        if (func === undefined) {
            return (curriedFunc, curriedIterable) => curriedIterable
                ? transform(concurrency, curriedFunc, curriedIterable)
                : transform(concurrency, curriedFunc);
        }
        if (iterable === undefined) {
            return (curriedIterable) => transform(concurrency, func, curriedIterable);
        }
        return _transform(concurrency, func, iterable);
    }

    async function _writeToStream(stream, iterable) {
        let lastError = null;
        let errCb = null;
        let drainCb = null;
        const notifyError = err => {
            lastError = err;
            if (errCb) {
                errCb(err);
            }
        };
        const notifyDrain = () => {
            if (drainCb) {
                drainCb();
            }
        };
        const cleanup = () => {
            stream.removeListener('error', notifyError);
            stream.removeListener('drain', notifyDrain);
        };
        stream.once('error', notifyError);
        const waitForDrain = () => new Promise((resolve, reject) => {
            if (lastError) {
                return reject(lastError);
            }
            stream.once('drain', notifyDrain);
            drainCb = resolve;
            errCb = reject;
        });
        for await (const value of iterable) {
            if (stream.write(value) === false) {
                await waitForDrain();
            }
            if (lastError) {
                break;
            }
        }
        cleanup();
        if (lastError) {
            throw lastError;
        }
    }
    function writeToStream(stream, iterable) {
        if (iterable === undefined) {
            return (curriedIterable) => _writeToStream(stream, curriedIterable);
        }
        return _writeToStream(stream, iterable);
    }

    exports.batch = batch;
    exports.buffer = buffer;
    exports.collect = collect;
    exports.concat = concat;
    exports.consume = consume;
    exports.filter = filter;
    exports.flatMap = flatMap;
    exports.flatTransform = flatTransform;
    exports.flatten = flatten;
    exports.fromStream = fromStream;
    exports.getIterator = getIterator;
    exports.map = map;
    exports.merge = merge;
    exports.parallelFlatMap = parallelFlatMap;
    exports.parallelMap = parallelMap;
    exports.parallelMerge = parallelMerge;
    exports.pipeline = pipeline;
    exports.reduce = reduce;
    exports.take = take;
    exports.tap = tap;
    exports.time = time;
    exports.transform = transform;
    exports.writeToStream = writeToStream;

    Object.defineProperty(exports, '__esModule', { value: true });

})));


/***/ }),

/***/ 6399:
/***/ ((module) => {

"use strict";


/**
 * Can be used with Array.sort to sort and array with Uint8Array entries
 *
 * @param {Uint8Array} a
 * @param {Uint8Array} b
 */
function compare (a, b) {
  for (let i = 0; i < a.byteLength; i++) {
    if (a[i] < b[i]) {
      return -1
    }

    if (a[i] > b[i]) {
      return 1
    }
  }

  if (a.byteLength > b.byteLength) {
    return 1
  }

  if (a.byteLength < b.byteLength) {
    return -1
  }

  return 0
}

module.exports = compare


/***/ }),

/***/ 7952:
/***/ ((module) => {

"use strict";


/**
 * Returns a new Uint8Array created by concatenating the passed ArrayLikes
 *
 * @param {Array<ArrayLike<number>>} arrays
 * @param {number} [length]
 */
function concat (arrays, length) {
  if (!length) {
    length = arrays.reduce((acc, curr) => acc + curr.length, 0)
  }

  const output = new Uint8Array(length)
  let offset = 0

  for (const arr of arrays) {
    output.set(arr, offset)
    offset += arr.length
  }

  return output
}

module.exports = concat


/***/ }),

/***/ 333:
/***/ ((module) => {

"use strict";


/**
 * Returns true if the two passed Uint8Arrays have the same content
 *
 * @param {Uint8Array} a
 * @param {Uint8Array} b
 */
function equals (a, b) {
  if (a === b) {
    return true
  }

  if (a.byteLength !== b.byteLength) {
    return false
  }

  for (let i = 0; i < a.byteLength; i++) {
    if (a[i] !== b[i]) {
      return false
    }
  }

  return true
}

module.exports = equals


/***/ }),

/***/ 828:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const bases = __nccwpck_require__(6043)

/**
 * @typedef {import('./util/bases').SupportedEncodings} SupportedEncodings
 */

/**
 * Create a `Uint8Array` from the passed string
 *
 * Supports `utf8`, `utf-8`, `hex`, and any encoding supported by the multiformats module.
 *
 * Also `ascii` which is similar to node's 'binary' encoding.
 *
 * @param {string} string
 * @param {SupportedEncodings} [encoding=utf8] - utf8, base16, base64, base64urlpad, etc
 * @returns {Uint8Array}
 */
function fromString (string, encoding = 'utf8') {
  const base = bases[encoding]

  if (!base) {
    throw new Error(`Unsupported encoding "${encoding}"`)
  }

  // add multibase prefix
  return base.decoder.decode(`${base.prefix}${string}`)
}

module.exports = fromString


/***/ }),

/***/ 5804:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

const compare = __nccwpck_require__(6399)
const concat = __nccwpck_require__(7952)
const equals = __nccwpck_require__(333)
const fromString = __nccwpck_require__(828)
const toString = __nccwpck_require__(757)
const xor = __nccwpck_require__(8281)

module.exports = {
  compare,
  concat,
  equals,
  fromString,
  toString,
  xor
}


/***/ }),

/***/ 757:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const bases = __nccwpck_require__(6043)

/**
 * @typedef {import('./util/bases').SupportedEncodings} SupportedEncodings
 */

/**
 * Turns a `Uint8Array` into a string.
 *
 * Supports `utf8`, `utf-8` and any encoding supported by the multibase module.
 *
 * Also `ascii` which is similar to node's 'binary' encoding.
 *
 * @param {Uint8Array} array - The array to turn into a string
 * @param {SupportedEncodings} [encoding=utf8] - The encoding to use
 * @returns {string}
 */
function toString (array, encoding = 'utf8') {
  const base = bases[encoding]

  if (!base) {
    throw new Error(`Unsupported encoding "${encoding}"`)
  }

  // strip multibase prefix
  return base.encoder.encode(array).substring(1)
}

module.exports = toString


/***/ }),

/***/ 6043:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
  

const { bases } = __nccwpck_require__(1046)

/**
 * @typedef {import('multiformats/bases/interface').MultibaseCodec<any>} MultibaseCodec
 */

/**
 * @param {string} name
 * @param {string} prefix
 * @param {(buf: Uint8Array) => string} encode
 * @param {(str: string) => Uint8Array} decode
 * @returns {MultibaseCodec}
 */
function createCodec (name, prefix, encode, decode) {
  return {
    name,
    prefix,
    encoder: {
      name,
      prefix,
      encode
    },
    decoder: {
      decode
    }
  }
}

const string = createCodec('utf8', 'u', (buf) => {
  const decoder = new TextDecoder('utf8')
  return 'u' + decoder.decode(buf)
}, (str) => {
  const encoder = new TextEncoder()
  return encoder.encode(str.substring(1))
})

const ascii = createCodec('ascii', 'a', (buf) => {
  let string = 'a'

  for (let i = 0; i < buf.length; i++) {
    string += String.fromCharCode(buf[i])
  }
  return string
}, (str) => {
  str = str.substring(1)
  const buf = new Uint8Array(str.length)

  for (let i = 0; i < str.length; i++) {
    buf[i] = str.charCodeAt(i)
  }

  return buf
})

/**
 * @typedef {'utf8' | 'utf-8' | 'hex' | 'latin1' | 'ascii' | 'binary' | keyof bases } SupportedEncodings
 */

/**
 * @type {Record<SupportedEncodings, MultibaseCodec>}
 */
const BASES = {
  'utf8': string,
  'utf-8': string,
  'hex': bases.base16,
  'latin1': ascii,
  'ascii': ascii,
  'binary': ascii,

  ...bases
}

module.exports = BASES


/***/ }),

/***/ 8281:
/***/ ((module) => {

"use strict";


/**
 * Returns the xor distance between two arrays
 *
 * @param {Uint8Array} a
 * @param {Uint8Array} b
 */
function xor (a, b) {
  if (a.length !== b.length) {
    throw new Error('Inputs should have the same length')
  }

  const result = new Uint8Array(a.length)

  for (let i = 0; i < a.length; i++) {
    result[i] = a[i] ^ b[i]
  }

  return result
}

module.exports = xor


/***/ }),

/***/ 7458:
/***/ ((module) => {

module.exports = read

var MSB = 0x80
  , REST = 0x7F

function read(buf, offset) {
  var res    = 0
    , offset = offset || 0
    , shift  = 0
    , counter = offset
    , b
    , l = buf.length

  do {
    if (counter >= l || shift > 49) {
      read.bytes = 0
      throw new RangeError('Could not decode varint')
    }
    b = buf[counter++]
    res += shift < 28
      ? (b & REST) << shift
      : (b & REST) * Math.pow(2, shift)
    shift += 7
  } while (b >= MSB)

  read.bytes = counter - offset

  return res
}


/***/ }),

/***/ 1415:
/***/ ((module) => {

module.exports = encode

var MSB = 0x80
  , REST = 0x7F
  , MSBALL = ~REST
  , INT = Math.pow(2, 31)

function encode(num, out, offset) {
  if (Number.MAX_SAFE_INTEGER && num > Number.MAX_SAFE_INTEGER) {
    encode.bytes = 0
    throw new RangeError('Could not encode varint')
  }
  out = out || []
  offset = offset || 0
  var oldOffset = offset

  while(num >= INT) {
    out[offset++] = (num & 0xFF) | MSB
    num /= 128
  }
  while(num & MSBALL) {
    out[offset++] = (num & 0xFF) | MSB
    num >>>= 7
  }
  out[offset] = num | 0
  
  encode.bytes = offset - oldOffset + 1
  
  return out
}


/***/ }),

/***/ 8018:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = {
    encode: __nccwpck_require__(1415)
  , decode: __nccwpck_require__(7458)
  , encodingLength: __nccwpck_require__(5235)
}


/***/ }),

/***/ 5235:
/***/ ((module) => {


var N1 = Math.pow(2,  7)
var N2 = Math.pow(2, 14)
var N3 = Math.pow(2, 21)
var N4 = Math.pow(2, 28)
var N5 = Math.pow(2, 35)
var N6 = Math.pow(2, 42)
var N7 = Math.pow(2, 49)
var N8 = Math.pow(2, 56)
var N9 = Math.pow(2, 63)

module.exports = function (value) {
  return (
    value < N1 ? 1
  : value < N2 ? 2
  : value < N3 ? 3
  : value < N4 ? 4
  : value < N5 ? 5
  : value < N6 ? 6
  : value < N7 ? 7
  : value < N8 ? 8
  : value < N9 ? 9
  :              10
  )
}


/***/ }),

/***/ 1430:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


exports.TextEncoder =
  typeof TextEncoder !== "undefined" ? TextEncoder : __nccwpck_require__(1669).TextEncoder

exports.TextDecoder =
  typeof TextDecoder !== "undefined" ? TextDecoder : __nccwpck_require__(1669).TextDecoder


/***/ }),

/***/ 608:
/***/ (function(__unused_webpack_module, exports) {

/**
 * web-streams-polyfill v3.0.3
 */
(function (global, factory) {
     true ? factory(exports) :
    0;
}(this, (function (exports) { 'use strict';

    /// <reference lib="es2015.symbol" />
    var SymbolPolyfill = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ?
        Symbol :
        function (description) { return "Symbol(" + description + ")"; };

    /// <reference lib="dom" />
    function noop() {
        return undefined;
    }
    function getGlobals() {
        if (typeof self !== 'undefined') {
            return self;
        }
        else if (typeof window !== 'undefined') {
            return window;
        }
        else if (typeof global !== 'undefined') {
            return global;
        }
        return undefined;
    }
    var globals = getGlobals();

    function typeIsObject(x) {
        return (typeof x === 'object' && x !== null) || typeof x === 'function';
    }
    var rethrowAssertionErrorRejection = noop;

    var originalPromise = Promise;
    var originalPromiseThen = Promise.prototype.then;
    var originalPromiseResolve = Promise.resolve.bind(originalPromise);
    var originalPromiseReject = Promise.reject.bind(originalPromise);
    function newPromise(executor) {
        return new originalPromise(executor);
    }
    function promiseResolvedWith(value) {
        return originalPromiseResolve(value);
    }
    function promiseRejectedWith(reason) {
        return originalPromiseReject(reason);
    }
    function PerformPromiseThen(promise, onFulfilled, onRejected) {
        // There doesn't appear to be any way to correctly emulate the behaviour from JavaScript, so this is just an
        // approximation.
        return originalPromiseThen.call(promise, onFulfilled, onRejected);
    }
    function uponPromise(promise, onFulfilled, onRejected) {
        PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), undefined, rethrowAssertionErrorRejection);
    }
    function uponFulfillment(promise, onFulfilled) {
        uponPromise(promise, onFulfilled);
    }
    function uponRejection(promise, onRejected) {
        uponPromise(promise, undefined, onRejected);
    }
    function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
        return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
    }
    function setPromiseIsHandledToTrue(promise) {
        PerformPromiseThen(promise, undefined, rethrowAssertionErrorRejection);
    }
    var queueMicrotask = (function () {
        var globalQueueMicrotask = globals && globals.queueMicrotask;
        if (typeof globalQueueMicrotask === 'function') {
            return globalQueueMicrotask;
        }
        var resolvedPromise = promiseResolvedWith(undefined);
        return function (fn) { return PerformPromiseThen(resolvedPromise, fn); };
    })();
    function reflectCall(F, V, args) {
        if (typeof F !== 'function') {
            throw new TypeError('Argument is not a function');
        }
        return Function.prototype.apply.call(F, V, args);
    }
    function promiseCall(F, V, args) {
        try {
            return promiseResolvedWith(reflectCall(F, V, args));
        }
        catch (value) {
            return promiseRejectedWith(value);
        }
    }

    // Original from Chromium
    // https://chromium.googlesource.com/chromium/src/+/0aee4434a4dba42a42abaea9bfbc0cd196a63bc1/third_party/blink/renderer/core/streams/SimpleQueue.js
    var QUEUE_MAX_ARRAY_SIZE = 16384;
    /**
     * Simple queue structure.
     *
     * Avoids scalability issues with using a packed array directly by using
     * multiple arrays in a linked list and keeping the array size bounded.
     */
    var SimpleQueue = /** @class */ (function () {
        function SimpleQueue() {
            this._cursor = 0;
            this._size = 0;
            // _front and _back are always defined.
            this._front = {
                _elements: [],
                _next: undefined
            };
            this._back = this._front;
            // The cursor is used to avoid calling Array.shift().
            // It contains the index of the front element of the array inside the
            // front-most node. It is always in the range [0, QUEUE_MAX_ARRAY_SIZE).
            this._cursor = 0;
            // When there is only one node, size === elements.length - cursor.
            this._size = 0;
        }
        Object.defineProperty(SimpleQueue.prototype, "length", {
            get: function () {
                return this._size;
            },
            enumerable: false,
            configurable: true
        });
        // For exception safety, this method is structured in order:
        // 1. Read state
        // 2. Calculate required state mutations
        // 3. Perform state mutations
        SimpleQueue.prototype.push = function (element) {
            var oldBack = this._back;
            var newBack = oldBack;
            if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
                newBack = {
                    _elements: [],
                    _next: undefined
                };
            }
            // push() is the mutation most likely to throw an exception, so it
            // goes first.
            oldBack._elements.push(element);
            if (newBack !== oldBack) {
                this._back = newBack;
                oldBack._next = newBack;
            }
            ++this._size;
        };
        // Like push(), shift() follows the read -> calculate -> mutate pattern for
        // exception safety.
        SimpleQueue.prototype.shift = function () { // must not be called on an empty queue
            var oldFront = this._front;
            var newFront = oldFront;
            var oldCursor = this._cursor;
            var newCursor = oldCursor + 1;
            var elements = oldFront._elements;
            var element = elements[oldCursor];
            if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
                newFront = oldFront._next;
                newCursor = 0;
            }
            // No mutations before this point.
            --this._size;
            this._cursor = newCursor;
            if (oldFront !== newFront) {
                this._front = newFront;
            }
            // Permit shifted element to be garbage collected.
            elements[oldCursor] = undefined;
            return element;
        };
        // The tricky thing about forEach() is that it can be called
        // re-entrantly. The queue may be mutated inside the callback. It is easy to
        // see that push() within the callback has no negative effects since the end
        // of the queue is checked for on every iteration. If shift() is called
        // repeatedly within the callback then the next iteration may return an
        // element that has been removed. In this case the callback will be called
        // with undefined values until we either "catch up" with elements that still
        // exist or reach the back of the queue.
        SimpleQueue.prototype.forEach = function (callback) {
            var i = this._cursor;
            var node = this._front;
            var elements = node._elements;
            while (i !== elements.length || node._next !== undefined) {
                if (i === elements.length) {
                    node = node._next;
                    elements = node._elements;
                    i = 0;
                    if (elements.length === 0) {
                        break;
                    }
                }
                callback(elements[i]);
                ++i;
            }
        };
        // Return the element that would be returned if shift() was called now,
        // without modifying the queue.
        SimpleQueue.prototype.peek = function () { // must not be called on an empty queue
            var front = this._front;
            var cursor = this._cursor;
            return front._elements[cursor];
        };
        return SimpleQueue;
    }());

    function ReadableStreamReaderGenericInitialize(reader, stream) {
        reader._ownerReadableStream = stream;
        stream._reader = reader;
        if (stream._state === 'readable') {
            defaultReaderClosedPromiseInitialize(reader);
        }
        else if (stream._state === 'closed') {
            defaultReaderClosedPromiseInitializeAsResolved(reader);
        }
        else {
            defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
        }
    }
    // A client of ReadableStreamDefaultReader and ReadableStreamBYOBReader may use these functions directly to bypass state
    // check.
    function ReadableStreamReaderGenericCancel(reader, reason) {
        var stream = reader._ownerReadableStream;
        return ReadableStreamCancel(stream, reason);
    }
    function ReadableStreamReaderGenericRelease(reader) {
        if (reader._ownerReadableStream._state === 'readable') {
            defaultReaderClosedPromiseReject(reader, new TypeError("Reader was released and can no longer be used to monitor the stream's closedness"));
        }
        else {
            defaultReaderClosedPromiseResetToRejected(reader, new TypeError("Reader was released and can no longer be used to monitor the stream's closedness"));
        }
        reader._ownerReadableStream._reader = undefined;
        reader._ownerReadableStream = undefined;
    }
    // Helper functions for the readers.
    function readerLockException(name) {
        return new TypeError('Cannot ' + name + ' a stream using a released reader');
    }
    // Helper functions for the ReadableStreamDefaultReader.
    function defaultReaderClosedPromiseInitialize(reader) {
        reader._closedPromise = newPromise(function (resolve, reject) {
            reader._closedPromise_resolve = resolve;
            reader._closedPromise_reject = reject;
        });
    }
    function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
        defaultReaderClosedPromiseInitialize(reader);
        defaultReaderClosedPromiseReject(reader, reason);
    }
    function defaultReaderClosedPromiseInitializeAsResolved(reader) {
        defaultReaderClosedPromiseInitialize(reader);
        defaultReaderClosedPromiseResolve(reader);
    }
    function defaultReaderClosedPromiseReject(reader, reason) {
        if (reader._closedPromise_reject === undefined) {
            return;
        }
        setPromiseIsHandledToTrue(reader._closedPromise);
        reader._closedPromise_reject(reason);
        reader._closedPromise_resolve = undefined;
        reader._closedPromise_reject = undefined;
    }
    function defaultReaderClosedPromiseResetToRejected(reader, reason) {
        defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
    }
    function defaultReaderClosedPromiseResolve(reader) {
        if (reader._closedPromise_resolve === undefined) {
            return;
        }
        reader._closedPromise_resolve(undefined);
        reader._closedPromise_resolve = undefined;
        reader._closedPromise_reject = undefined;
    }

    var AbortSteps = SymbolPolyfill('[[AbortSteps]]');
    var ErrorSteps = SymbolPolyfill('[[ErrorSteps]]');
    var CancelSteps = SymbolPolyfill('[[CancelSteps]]');
    var PullSteps = SymbolPolyfill('[[PullSteps]]');

    /// <reference lib="es2015.core" />
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite#Polyfill
    var NumberIsFinite = Number.isFinite || function (x) {
        return typeof x === 'number' && isFinite(x);
    };

    /// <reference lib="es2015.core" />
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc#Polyfill
    var MathTrunc = Math.trunc || function (v) {
        return v < 0 ? Math.ceil(v) : Math.floor(v);
    };

    // https://heycam.github.io/webidl/#idl-dictionaries
    function isDictionary(x) {
        return typeof x === 'object' || typeof x === 'function';
    }
    function assertDictionary(obj, context) {
        if (obj !== undefined && !isDictionary(obj)) {
            throw new TypeError(context + " is not an object.");
        }
    }
    // https://heycam.github.io/webidl/#idl-callback-functions
    function assertFunction(x, context) {
        if (typeof x !== 'function') {
            throw new TypeError(context + " is not a function.");
        }
    }
    // https://heycam.github.io/webidl/#idl-object
    function isObject(x) {
        return (typeof x === 'object' && x !== null) || typeof x === 'function';
    }
    function assertObject(x, context) {
        if (!isObject(x)) {
            throw new TypeError(context + " is not an object.");
        }
    }
    function assertRequiredArgument(x, position, context) {
        if (x === undefined) {
            throw new TypeError("Parameter " + position + " is required in '" + context + "'.");
        }
    }
    function assertRequiredField(x, field, context) {
        if (x === undefined) {
            throw new TypeError(field + " is required in '" + context + "'.");
        }
    }
    // https://heycam.github.io/webidl/#idl-unrestricted-double
    function convertUnrestrictedDouble(value) {
        return Number(value);
    }
    function censorNegativeZero(x) {
        return x === 0 ? 0 : x;
    }
    function integerPart(x) {
        return censorNegativeZero(MathTrunc(x));
    }
    // https://heycam.github.io/webidl/#idl-unsigned-long-long
    function convertUnsignedLongLongWithEnforceRange(value, context) {
        var lowerBound = 0;
        var upperBound = Number.MAX_SAFE_INTEGER;
        var x = Number(value);
        x = censorNegativeZero(x);
        if (!NumberIsFinite(x)) {
            throw new TypeError(context + " is not a finite number");
        }
        x = integerPart(x);
        if (x < lowerBound || x > upperBound) {
            throw new TypeError(context + " is outside the accepted range of " + lowerBound + " to " + upperBound + ", inclusive");
        }
        if (!NumberIsFinite(x) || x === 0) {
            return 0;
        }
        // TODO Use BigInt if supported?
        // let xBigInt = BigInt(integerPart(x));
        // xBigInt = BigInt.asUintN(64, xBigInt);
        // return Number(xBigInt);
        return x;
    }

    function assertReadableStream(x, context) {
        if (!IsReadableStream(x)) {
            throw new TypeError(context + " is not a ReadableStream.");
        }
    }

    // Abstract operations for the ReadableStream.
    function AcquireReadableStreamDefaultReader(stream) {
        return new ReadableStreamDefaultReader(stream);
    }
    // ReadableStream API exposed for controllers.
    function ReadableStreamAddReadRequest(stream, readRequest) {
        stream._reader._readRequests.push(readRequest);
    }
    function ReadableStreamFulfillReadRequest(stream, chunk, done) {
        var reader = stream._reader;
        var readRequest = reader._readRequests.shift();
        if (done) {
            readRequest._closeSteps();
        }
        else {
            readRequest._chunkSteps(chunk);
        }
    }
    function ReadableStreamGetNumReadRequests(stream) {
        return stream._reader._readRequests.length;
    }
    function ReadableStreamHasDefaultReader(stream) {
        var reader = stream._reader;
        if (reader === undefined) {
            return false;
        }
        if (!IsReadableStreamDefaultReader(reader)) {
            return false;
        }
        return true;
    }
    /**
     * A default reader vended by a {@link ReadableStream}.
     *
     * @public
     */
    var ReadableStreamDefaultReader = /** @class */ (function () {
        function ReadableStreamDefaultReader(stream) {
            assertRequiredArgument(stream, 1, 'ReadableStreamDefaultReader');
            assertReadableStream(stream, 'First parameter');
            if (IsReadableStreamLocked(stream)) {
                throw new TypeError('This stream has already been locked for exclusive reading by another reader');
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readRequests = new SimpleQueue();
        }
        Object.defineProperty(ReadableStreamDefaultReader.prototype, "closed", {
            /**
             * Returns a promise that will be fulfilled when the stream becomes closed,
             * or rejected if the stream ever errors or the reader's lock is released before the stream finishes closing.
             */
            get: function () {
                if (!IsReadableStreamDefaultReader(this)) {
                    return promiseRejectedWith(defaultReaderBrandCheckException('closed'));
                }
                return this._closedPromise;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * If the reader is active, behaves the same as {@link ReadableStream.cancel | stream.cancel(reason)}.
         */
        ReadableStreamDefaultReader.prototype.cancel = function (reason) {
            if (reason === void 0) { reason = undefined; }
            if (!IsReadableStreamDefaultReader(this)) {
                return promiseRejectedWith(defaultReaderBrandCheckException('cancel'));
            }
            if (this._ownerReadableStream === undefined) {
                return promiseRejectedWith(readerLockException('cancel'));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
        };
        /**
         * Returns a promise that allows access to the next chunk from the stream's internal queue, if available.
         *
         * If reading a chunk causes the queue to become empty, more data will be pulled from the underlying source.
         */
        ReadableStreamDefaultReader.prototype.read = function () {
            if (!IsReadableStreamDefaultReader(this)) {
                return promiseRejectedWith(defaultReaderBrandCheckException('read'));
            }
            if (this._ownerReadableStream === undefined) {
                return promiseRejectedWith(readerLockException('read from'));
            }
            var resolvePromise;
            var rejectPromise;
            var promise = newPromise(function (resolve, reject) {
                resolvePromise = resolve;
                rejectPromise = reject;
            });
            var readRequest = {
                _chunkSteps: function (chunk) { return resolvePromise({ value: chunk, done: false }); },
                _closeSteps: function () { return resolvePromise({ value: undefined, done: true }); },
                _errorSteps: function (e) { return rejectPromise(e); }
            };
            ReadableStreamDefaultReaderRead(this, readRequest);
            return promise;
        };
        /**
         * Releases the reader's lock on the corresponding stream. After the lock is released, the reader is no longer active.
         * If the associated stream is errored when the lock is released, the reader will appear errored in the same way
         * from now on; otherwise, the reader will appear closed.
         *
         * A reader's lock cannot be released while it still has a pending read request, i.e., if a promise returned by
         * the reader's {@link ReadableStreamDefaultReader.read | read()} method has not yet been settled. Attempting to
         * do so will throw a `TypeError` and leave the reader locked to the stream.
         */
        ReadableStreamDefaultReader.prototype.releaseLock = function () {
            if (!IsReadableStreamDefaultReader(this)) {
                throw defaultReaderBrandCheckException('releaseLock');
            }
            if (this._ownerReadableStream === undefined) {
                return;
            }
            if (this._readRequests.length > 0) {
                throw new TypeError('Tried to release a reader lock when that reader has pending read() calls un-settled');
            }
            ReadableStreamReaderGenericRelease(this);
        };
        return ReadableStreamDefaultReader;
    }());
    Object.defineProperties(ReadableStreamDefaultReader.prototype, {
        cancel: { enumerable: true },
        read: { enumerable: true },
        releaseLock: { enumerable: true },
        closed: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(ReadableStreamDefaultReader.prototype, SymbolPolyfill.toStringTag, {
            value: 'ReadableStreamDefaultReader',
            configurable: true
        });
    }
    // Abstract operations for the readers.
    function IsReadableStreamDefaultReader(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_readRequests')) {
            return false;
        }
        return true;
    }
    function ReadableStreamDefaultReaderRead(reader, readRequest) {
        var stream = reader._ownerReadableStream;
        stream._disturbed = true;
        if (stream._state === 'closed') {
            readRequest._closeSteps();
        }
        else if (stream._state === 'errored') {
            readRequest._errorSteps(stream._storedError);
        }
        else {
            stream._readableStreamController[PullSteps](readRequest);
        }
    }
    // Helper functions for the ReadableStreamDefaultReader.
    function defaultReaderBrandCheckException(name) {
        return new TypeError("ReadableStreamDefaultReader.prototype." + name + " can only be used on a ReadableStreamDefaultReader");
    }

    /// <reference lib="es2018.asynciterable" />
    var _a;
    var AsyncIteratorPrototype;
    if (typeof SymbolPolyfill.asyncIterator === 'symbol') {
        // We're running inside a ES2018+ environment, but we're compiling to an older syntax.
        // We cannot access %AsyncIteratorPrototype% without non-ES2018 syntax, but we can re-create it.
        AsyncIteratorPrototype = (_a = {},
            // 25.1.3.1 %AsyncIteratorPrototype% [ @@asyncIterator ] ( )
            // https://tc39.github.io/ecma262/#sec-asynciteratorprototype-asynciterator
            _a[SymbolPolyfill.asyncIterator] = function () {
                return this;
            },
            _a);
        Object.defineProperty(AsyncIteratorPrototype, SymbolPolyfill.asyncIterator, { enumerable: false });
    }

    /// <reference lib="es2018.asynciterable" />
    var ReadableStreamAsyncIteratorImpl = /** @class */ (function () {
        function ReadableStreamAsyncIteratorImpl(reader, preventCancel) {
            this._ongoingPromise = undefined;
            this._isFinished = false;
            this._reader = reader;
            this._preventCancel = preventCancel;
        }
        ReadableStreamAsyncIteratorImpl.prototype.next = function () {
            var _this = this;
            var nextSteps = function () { return _this._nextSteps(); };
            this._ongoingPromise = this._ongoingPromise ?
                transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) :
                nextSteps();
            return this._ongoingPromise;
        };
        ReadableStreamAsyncIteratorImpl.prototype.return = function (value) {
            var _this = this;
            var returnSteps = function () { return _this._returnSteps(value); };
            return this._ongoingPromise ?
                transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) :
                returnSteps();
        };
        ReadableStreamAsyncIteratorImpl.prototype._nextSteps = function () {
            var _this = this;
            if (this._isFinished) {
                return Promise.resolve({ value: undefined, done: true });
            }
            var reader = this._reader;
            if (reader._ownerReadableStream === undefined) {
                return promiseRejectedWith(readerLockException('iterate'));
            }
            var resolvePromise;
            var rejectPromise;
            var promise = newPromise(function (resolve, reject) {
                resolvePromise = resolve;
                rejectPromise = reject;
            });
            var readRequest = {
                _chunkSteps: function (chunk) {
                    _this._ongoingPromise = undefined;
                    // This needs to be delayed by one microtask, otherwise we stop pulling too early which breaks a test.
                    // FIXME Is this a bug in the specification, or in the test?
                    queueMicrotask(function () { return resolvePromise({ value: chunk, done: false }); });
                },
                _closeSteps: function () {
                    _this._ongoingPromise = undefined;
                    _this._isFinished = true;
                    ReadableStreamReaderGenericRelease(reader);
                    resolvePromise({ value: undefined, done: true });
                },
                _errorSteps: function (reason) {
                    _this._ongoingPromise = undefined;
                    _this._isFinished = true;
                    ReadableStreamReaderGenericRelease(reader);
                    rejectPromise(reason);
                }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promise;
        };
        ReadableStreamAsyncIteratorImpl.prototype._returnSteps = function (value) {
            if (this._isFinished) {
                return Promise.resolve({ value: value, done: true });
            }
            this._isFinished = true;
            var reader = this._reader;
            if (reader._ownerReadableStream === undefined) {
                return promiseRejectedWith(readerLockException('finish iterating'));
            }
            if (!this._preventCancel) {
                var result = ReadableStreamReaderGenericCancel(reader, value);
                ReadableStreamReaderGenericRelease(reader);
                return transformPromiseWith(result, function () { return ({ value: value, done: true }); });
            }
            ReadableStreamReaderGenericRelease(reader);
            return promiseResolvedWith({ value: value, done: true });
        };
        return ReadableStreamAsyncIteratorImpl;
    }());
    var ReadableStreamAsyncIteratorPrototype = {
        next: function () {
            if (!IsReadableStreamAsyncIterator(this)) {
                return promiseRejectedWith(streamAsyncIteratorBrandCheckException('next'));
            }
            return this._asyncIteratorImpl.next();
        },
        return: function (value) {
            if (!IsReadableStreamAsyncIterator(this)) {
                return promiseRejectedWith(streamAsyncIteratorBrandCheckException('return'));
            }
            return this._asyncIteratorImpl.return(value);
        }
    };
    if (AsyncIteratorPrototype !== undefined) {
        Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
    }
    // Abstract operations for the ReadableStream.
    function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
        var reader = AcquireReadableStreamDefaultReader(stream);
        var impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
        var iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
        iterator._asyncIteratorImpl = impl;
        return iterator;
    }
    function IsReadableStreamAsyncIterator(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_asyncIteratorImpl')) {
            return false;
        }
        return true;
    }
    // Helper functions for the ReadableStream.
    function streamAsyncIteratorBrandCheckException(name) {
        return new TypeError("ReadableStreamAsyncIterator." + name + " can only be used on a ReadableSteamAsyncIterator");
    }

    /// <reference lib="es2015.core" />
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN#Polyfill
    var NumberIsNaN = Number.isNaN || function (x) {
        // eslint-disable-next-line no-self-compare
        return x !== x;
    };

    function IsFiniteNonNegativeNumber(v) {
        if (!IsNonNegativeNumber(v)) {
            return false;
        }
        if (v === Infinity) {
            return false;
        }
        return true;
    }
    function IsNonNegativeNumber(v) {
        if (typeof v !== 'number') {
            return false;
        }
        if (NumberIsNaN(v)) {
            return false;
        }
        if (v < 0) {
            return false;
        }
        return true;
    }

    function DequeueValue(container) {
        var pair = container._queue.shift();
        container._queueTotalSize -= pair.size;
        if (container._queueTotalSize < 0) {
            container._queueTotalSize = 0;
        }
        return pair.value;
    }
    function EnqueueValueWithSize(container, value, size) {
        size = Number(size);
        if (!IsFiniteNonNegativeNumber(size)) {
            throw new RangeError('Size must be a finite, non-NaN, non-negative number.');
        }
        container._queue.push({ value: value, size: size });
        container._queueTotalSize += size;
    }
    function PeekQueueValue(container) {
        var pair = container._queue.peek();
        return pair.value;
    }
    function ResetQueue(container) {
        container._queue = new SimpleQueue();
        container._queueTotalSize = 0;
    }

    function CreateArrayFromList(elements) {
        // We use arrays to represent lists, so this is basically a no-op.
        // Do a slice though just in case we happen to depend on the unique-ness.
        return elements.slice();
    }
    function CopyDataBlockBytes(dest, destOffset, src, srcOffset, n) {
        new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n), destOffset);
    }
    // Not implemented correctly
    function TransferArrayBuffer(O) {
        return O;
    }
    // Not implemented correctly
    function IsDetachedBuffer(O) {
        return false;
    }

    /**
     * A pull-into request in a {@link ReadableByteStreamController}.
     *
     * @public
     */
    var ReadableStreamBYOBRequest = /** @class */ (function () {
        function ReadableStreamBYOBRequest() {
            throw new TypeError('Illegal constructor');
        }
        Object.defineProperty(ReadableStreamBYOBRequest.prototype, "view", {
            /**
             * Returns the view for writing in to, or `null` if the BYOB request has already been responded to.
             */
            get: function () {
                if (!IsReadableStreamBYOBRequest(this)) {
                    throw byobRequestBrandCheckException('view');
                }
                return this._view;
            },
            enumerable: false,
            configurable: true
        });
        ReadableStreamBYOBRequest.prototype.respond = function (bytesWritten) {
            if (!IsReadableStreamBYOBRequest(this)) {
                throw byobRequestBrandCheckException('respond');
            }
            assertRequiredArgument(bytesWritten, 1, 'respond');
            bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, 'First parameter');
            if (this._associatedReadableByteStreamController === undefined) {
                throw new TypeError('This BYOB request has been invalidated');
            }
            if (IsDetachedBuffer(this._view.buffer)) ;
            ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
        };
        ReadableStreamBYOBRequest.prototype.respondWithNewView = function (view) {
            if (!IsReadableStreamBYOBRequest(this)) {
                throw byobRequestBrandCheckException('respondWithNewView');
            }
            assertRequiredArgument(view, 1, 'respondWithNewView');
            if (!ArrayBuffer.isView(view)) {
                throw new TypeError('You can only respond with array buffer views');
            }
            if (view.byteLength === 0) {
                throw new TypeError('chunk must have non-zero byteLength');
            }
            if (view.buffer.byteLength === 0) {
                throw new TypeError("chunk's buffer must have non-zero byteLength");
            }
            if (this._associatedReadableByteStreamController === undefined) {
                throw new TypeError('This BYOB request has been invalidated');
            }
            ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
        };
        return ReadableStreamBYOBRequest;
    }());
    Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
        respond: { enumerable: true },
        respondWithNewView: { enumerable: true },
        view: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(ReadableStreamBYOBRequest.prototype, SymbolPolyfill.toStringTag, {
            value: 'ReadableStreamBYOBRequest',
            configurable: true
        });
    }
    /**
     * Allows control of a {@link ReadableStream | readable byte stream}'s state and internal queue.
     *
     * @public
     */
    var ReadableByteStreamController = /** @class */ (function () {
        function ReadableByteStreamController() {
            throw new TypeError('Illegal constructor');
        }
        Object.defineProperty(ReadableByteStreamController.prototype, "byobRequest", {
            /**
             * Returns the current BYOB pull request, or `null` if there isn't one.
             */
            get: function () {
                if (!IsReadableByteStreamController(this)) {
                    throw byteStreamControllerBrandCheckException('byobRequest');
                }
                if (this._byobRequest === null && this._pendingPullIntos.length > 0) {
                    var firstDescriptor = this._pendingPullIntos.peek();
                    var view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
                    var byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
                    SetUpReadableStreamBYOBRequest(byobRequest, this, view);
                    this._byobRequest = byobRequest;
                }
                return this._byobRequest;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReadableByteStreamController.prototype, "desiredSize", {
            /**
             * Returns the desired size to fill the controlled stream's internal queue. It can be negative, if the queue is
             * over-full. An underlying byte source ought to use this information to determine when and how to apply backpressure.
             */
            get: function () {
                if (!IsReadableByteStreamController(this)) {
                    throw byteStreamControllerBrandCheckException('desiredSize');
                }
                return ReadableByteStreamControllerGetDesiredSize(this);
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Closes the controlled readable stream. Consumers will still be able to read any previously-enqueued chunks from
         * the stream, but once those are read, the stream will become closed.
         */
        ReadableByteStreamController.prototype.close = function () {
            if (!IsReadableByteStreamController(this)) {
                throw byteStreamControllerBrandCheckException('close');
            }
            if (this._closeRequested) {
                throw new TypeError('The stream has already been closed; do not close it again!');
            }
            var state = this._controlledReadableByteStream._state;
            if (state !== 'readable') {
                throw new TypeError("The stream (in " + state + " state) is not in the readable state and cannot be closed");
            }
            ReadableByteStreamControllerClose(this);
        };
        ReadableByteStreamController.prototype.enqueue = function (chunk) {
            if (!IsReadableByteStreamController(this)) {
                throw byteStreamControllerBrandCheckException('enqueue');
            }
            assertRequiredArgument(chunk, 1, 'enqueue');
            if (!ArrayBuffer.isView(chunk)) {
                throw new TypeError('chunk must be an array buffer view');
            }
            if (chunk.byteLength === 0) {
                throw new TypeError('chunk must have non-zero byteLength');
            }
            if (chunk.buffer.byteLength === 0) {
                throw new TypeError("chunk's buffer must have non-zero byteLength");
            }
            if (this._closeRequested) {
                throw new TypeError('stream is closed or draining');
            }
            var state = this._controlledReadableByteStream._state;
            if (state !== 'readable') {
                throw new TypeError("The stream (in " + state + " state) is not in the readable state and cannot be enqueued to");
            }
            ReadableByteStreamControllerEnqueue(this, chunk);
        };
        /**
         * Errors the controlled readable stream, making all future interactions with it fail with the given error `e`.
         */
        ReadableByteStreamController.prototype.error = function (e) {
            if (e === void 0) { e = undefined; }
            if (!IsReadableByteStreamController(this)) {
                throw byteStreamControllerBrandCheckException('error');
            }
            ReadableByteStreamControllerError(this, e);
        };
        /** @internal */
        ReadableByteStreamController.prototype[CancelSteps] = function (reason) {
            if (this._pendingPullIntos.length > 0) {
                var firstDescriptor = this._pendingPullIntos.peek();
                firstDescriptor.bytesFilled = 0;
            }
            ResetQueue(this);
            var result = this._cancelAlgorithm(reason);
            ReadableByteStreamControllerClearAlgorithms(this);
            return result;
        };
        /** @internal */
        ReadableByteStreamController.prototype[PullSteps] = function (readRequest) {
            var stream = this._controlledReadableByteStream;
            if (this._queueTotalSize > 0) {
                var entry = this._queue.shift();
                this._queueTotalSize -= entry.byteLength;
                ReadableByteStreamControllerHandleQueueDrain(this);
                var view = new Uint8Array(entry.buffer, entry.byteOffset, entry.byteLength);
                readRequest._chunkSteps(view);
                return;
            }
            var autoAllocateChunkSize = this._autoAllocateChunkSize;
            if (autoAllocateChunkSize !== undefined) {
                var buffer = void 0;
                try {
                    buffer = new ArrayBuffer(autoAllocateChunkSize);
                }
                catch (bufferE) {
                    readRequest._errorSteps(bufferE);
                    return;
                }
                var pullIntoDescriptor = {
                    buffer: buffer,
                    byteOffset: 0,
                    byteLength: autoAllocateChunkSize,
                    bytesFilled: 0,
                    elementSize: 1,
                    viewConstructor: Uint8Array,
                    readerType: 'default'
                };
                this._pendingPullIntos.push(pullIntoDescriptor);
            }
            ReadableStreamAddReadRequest(stream, readRequest);
            ReadableByteStreamControllerCallPullIfNeeded(this);
        };
        return ReadableByteStreamController;
    }());
    Object.defineProperties(ReadableByteStreamController.prototype, {
        close: { enumerable: true },
        enqueue: { enumerable: true },
        error: { enumerable: true },
        byobRequest: { enumerable: true },
        desiredSize: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(ReadableByteStreamController.prototype, SymbolPolyfill.toStringTag, {
            value: 'ReadableByteStreamController',
            configurable: true
        });
    }
    // Abstract operations for the ReadableByteStreamController.
    function IsReadableByteStreamController(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_controlledReadableByteStream')) {
            return false;
        }
        return true;
    }
    function IsReadableStreamBYOBRequest(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_associatedReadableByteStreamController')) {
            return false;
        }
        return true;
    }
    function ReadableByteStreamControllerCallPullIfNeeded(controller) {
        var shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
        if (!shouldPull) {
            return;
        }
        if (controller._pulling) {
            controller._pullAgain = true;
            return;
        }
        controller._pulling = true;
        // TODO: Test controller argument
        var pullPromise = controller._pullAlgorithm();
        uponPromise(pullPromise, function () {
            controller._pulling = false;
            if (controller._pullAgain) {
                controller._pullAgain = false;
                ReadableByteStreamControllerCallPullIfNeeded(controller);
            }
        }, function (e) {
            ReadableByteStreamControllerError(controller, e);
        });
    }
    function ReadableByteStreamControllerClearPendingPullIntos(controller) {
        ReadableByteStreamControllerInvalidateBYOBRequest(controller);
        controller._pendingPullIntos = new SimpleQueue();
    }
    function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
        var done = false;
        if (stream._state === 'closed') {
            done = true;
        }
        var filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
        if (pullIntoDescriptor.readerType === 'default') {
            ReadableStreamFulfillReadRequest(stream, filledView, done);
        }
        else {
            ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
        }
    }
    function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
        var bytesFilled = pullIntoDescriptor.bytesFilled;
        var elementSize = pullIntoDescriptor.elementSize;
        return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
    }
    function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
        controller._queue.push({ buffer: buffer, byteOffset: byteOffset, byteLength: byteLength });
        controller._queueTotalSize += byteLength;
    }
    function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
        var elementSize = pullIntoDescriptor.elementSize;
        var currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;
        var maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
        var maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
        var maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;
        var totalBytesToCopyRemaining = maxBytesToCopy;
        var ready = false;
        if (maxAlignedBytes > currentAlignedBytes) {
            totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
            ready = true;
        }
        var queue = controller._queue;
        while (totalBytesToCopyRemaining > 0) {
            var headOfQueue = queue.peek();
            var bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
            var destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
            if (headOfQueue.byteLength === bytesToCopy) {
                queue.shift();
            }
            else {
                headOfQueue.byteOffset += bytesToCopy;
                headOfQueue.byteLength -= bytesToCopy;
            }
            controller._queueTotalSize -= bytesToCopy;
            ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
            totalBytesToCopyRemaining -= bytesToCopy;
        }
        return ready;
    }
    function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
        ReadableByteStreamControllerInvalidateBYOBRequest(controller);
        pullIntoDescriptor.bytesFilled += size;
    }
    function ReadableByteStreamControllerHandleQueueDrain(controller) {
        if (controller._queueTotalSize === 0 && controller._closeRequested) {
            ReadableByteStreamControllerClearAlgorithms(controller);
            ReadableStreamClose(controller._controlledReadableByteStream);
        }
        else {
            ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
    }
    function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
        if (controller._byobRequest === null) {
            return;
        }
        controller._byobRequest._associatedReadableByteStreamController = undefined;
        controller._byobRequest._view = null;
        controller._byobRequest = null;
    }
    function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
        while (controller._pendingPullIntos.length > 0) {
            if (controller._queueTotalSize === 0) {
                return;
            }
            var pullIntoDescriptor = controller._pendingPullIntos.peek();
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
                ReadableByteStreamControllerShiftPendingPullInto(controller);
                ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
            }
        }
    }
    function ReadableByteStreamControllerPullInto(controller, view, readIntoRequest) {
        var stream = controller._controlledReadableByteStream;
        var elementSize = 1;
        if (view.constructor !== DataView) {
            elementSize = view.constructor.BYTES_PER_ELEMENT;
        }
        var ctor = view.constructor;
        var buffer = TransferArrayBuffer(view.buffer);
        var pullIntoDescriptor = {
            buffer: buffer,
            byteOffset: view.byteOffset,
            byteLength: view.byteLength,
            bytesFilled: 0,
            elementSize: elementSize,
            viewConstructor: ctor,
            readerType: 'byob'
        };
        if (controller._pendingPullIntos.length > 0) {
            controller._pendingPullIntos.push(pullIntoDescriptor);
            // No ReadableByteStreamControllerCallPullIfNeeded() call since:
            // - No change happens on desiredSize
            // - The source has already been notified of that there's at least 1 pending read(view)
            ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
            return;
        }
        if (stream._state === 'closed') {
            var emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
            readIntoRequest._closeSteps(emptyView);
            return;
        }
        if (controller._queueTotalSize > 0) {
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
                var filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
                ReadableByteStreamControllerHandleQueueDrain(controller);
                readIntoRequest._chunkSteps(filledView);
                return;
            }
            if (controller._closeRequested) {
                var e = new TypeError('Insufficient bytes to fill elements in the given buffer');
                ReadableByteStreamControllerError(controller, e);
                readIntoRequest._errorSteps(e);
                return;
            }
        }
        controller._pendingPullIntos.push(pullIntoDescriptor);
        ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
        ReadableByteStreamControllerCallPullIfNeeded(controller);
    }
    function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
        firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
        var stream = controller._controlledReadableByteStream;
        if (ReadableStreamHasBYOBReader(stream)) {
            while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
                var pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
                ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
            }
        }
    }
    function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
        if (pullIntoDescriptor.bytesFilled + bytesWritten > pullIntoDescriptor.byteLength) {
            throw new RangeError('bytesWritten out of range');
        }
        ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
        if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
            // TODO: Figure out whether we should detach the buffer or not here.
            return;
        }
        ReadableByteStreamControllerShiftPendingPullInto(controller);
        var remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
        if (remainderSize > 0) {
            var end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            var remainder = pullIntoDescriptor.buffer.slice(end - remainderSize, end);
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
        }
        pullIntoDescriptor.buffer = TransferArrayBuffer(pullIntoDescriptor.buffer);
        pullIntoDescriptor.bytesFilled -= remainderSize;
        ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
        ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
    }
    function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
        var firstDescriptor = controller._pendingPullIntos.peek();
        var state = controller._controlledReadableByteStream._state;
        if (state === 'closed') {
            if (bytesWritten !== 0) {
                throw new TypeError('bytesWritten must be 0 when calling respond() on a closed stream');
            }
            ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor);
        }
        else {
            ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
        }
        ReadableByteStreamControllerCallPullIfNeeded(controller);
    }
    function ReadableByteStreamControllerShiftPendingPullInto(controller) {
        var descriptor = controller._pendingPullIntos.shift();
        ReadableByteStreamControllerInvalidateBYOBRequest(controller);
        return descriptor;
    }
    function ReadableByteStreamControllerShouldCallPull(controller) {
        var stream = controller._controlledReadableByteStream;
        if (stream._state !== 'readable') {
            return false;
        }
        if (controller._closeRequested) {
            return false;
        }
        if (!controller._started) {
            return false;
        }
        if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            return true;
        }
        if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
            return true;
        }
        var desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
        if (desiredSize > 0) {
            return true;
        }
        return false;
    }
    function ReadableByteStreamControllerClearAlgorithms(controller) {
        controller._pullAlgorithm = undefined;
        controller._cancelAlgorithm = undefined;
    }
    // A client of ReadableByteStreamController may use these functions directly to bypass state check.
    function ReadableByteStreamControllerClose(controller) {
        var stream = controller._controlledReadableByteStream;
        if (controller._closeRequested || stream._state !== 'readable') {
            return;
        }
        if (controller._queueTotalSize > 0) {
            controller._closeRequested = true;
            return;
        }
        if (controller._pendingPullIntos.length > 0) {
            var firstPendingPullInto = controller._pendingPullIntos.peek();
            if (firstPendingPullInto.bytesFilled > 0) {
                var e = new TypeError('Insufficient bytes to fill elements in the given buffer');
                ReadableByteStreamControllerError(controller, e);
                throw e;
            }
        }
        ReadableByteStreamControllerClearAlgorithms(controller);
        ReadableStreamClose(stream);
    }
    function ReadableByteStreamControllerEnqueue(controller, chunk) {
        var stream = controller._controlledReadableByteStream;
        if (controller._closeRequested || stream._state !== 'readable') {
            return;
        }
        var buffer = chunk.buffer;
        var byteOffset = chunk.byteOffset;
        var byteLength = chunk.byteLength;
        var transferredBuffer = TransferArrayBuffer(buffer);
        if (ReadableStreamHasDefaultReader(stream)) {
            if (ReadableStreamGetNumReadRequests(stream) === 0) {
                ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            }
            else {
                var transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
                ReadableStreamFulfillReadRequest(stream, transferredView, false);
            }
        }
        else if (ReadableStreamHasBYOBReader(stream)) {
            // TODO: Ideally in this branch detaching should happen only if the buffer is not consumed fully.
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
        }
        else {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
        }
        ReadableByteStreamControllerCallPullIfNeeded(controller);
    }
    function ReadableByteStreamControllerError(controller, e) {
        var stream = controller._controlledReadableByteStream;
        if (stream._state !== 'readable') {
            return;
        }
        ReadableByteStreamControllerClearPendingPullIntos(controller);
        ResetQueue(controller);
        ReadableByteStreamControllerClearAlgorithms(controller);
        ReadableStreamError(stream, e);
    }
    function ReadableByteStreamControllerGetDesiredSize(controller) {
        var state = controller._controlledReadableByteStream._state;
        if (state === 'errored') {
            return null;
        }
        if (state === 'closed') {
            return 0;
        }
        return controller._strategyHWM - controller._queueTotalSize;
    }
    function ReadableByteStreamControllerRespond(controller, bytesWritten) {
        bytesWritten = Number(bytesWritten);
        if (!IsFiniteNonNegativeNumber(bytesWritten)) {
            throw new RangeError('bytesWritten must be a finite');
        }
        ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
    }
    function ReadableByteStreamControllerRespondWithNewView(controller, view) {
        var firstDescriptor = controller._pendingPullIntos.peek();
        if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
            throw new RangeError('The region specified by view does not match byobRequest');
        }
        if (firstDescriptor.byteLength !== view.byteLength) {
            throw new RangeError('The buffer of view has different capacity than byobRequest');
        }
        firstDescriptor.buffer = view.buffer;
        ReadableByteStreamControllerRespondInternal(controller, view.byteLength);
    }
    function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
        controller._controlledReadableByteStream = stream;
        controller._pullAgain = false;
        controller._pulling = false;
        controller._byobRequest = null;
        // Need to set the slots so that the assert doesn't fire. In the spec the slots already exist implicitly.
        controller._queue = controller._queueTotalSize = undefined;
        ResetQueue(controller);
        controller._closeRequested = false;
        controller._started = false;
        controller._strategyHWM = highWaterMark;
        controller._pullAlgorithm = pullAlgorithm;
        controller._cancelAlgorithm = cancelAlgorithm;
        controller._autoAllocateChunkSize = autoAllocateChunkSize;
        controller._pendingPullIntos = new SimpleQueue();
        stream._readableStreamController = controller;
        var startResult = startAlgorithm();
        uponPromise(promiseResolvedWith(startResult), function () {
            controller._started = true;
            ReadableByteStreamControllerCallPullIfNeeded(controller);
        }, function (r) {
            ReadableByteStreamControllerError(controller, r);
        });
    }
    function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
        var controller = Object.create(ReadableByteStreamController.prototype);
        var startAlgorithm = function () { return undefined; };
        var pullAlgorithm = function () { return promiseResolvedWith(undefined); };
        var cancelAlgorithm = function () { return promiseResolvedWith(undefined); };
        if (underlyingByteSource.start !== undefined) {
            startAlgorithm = function () { return underlyingByteSource.start(controller); };
        }
        if (underlyingByteSource.pull !== undefined) {
            pullAlgorithm = function () { return underlyingByteSource.pull(controller); };
        }
        if (underlyingByteSource.cancel !== undefined) {
            cancelAlgorithm = function (reason) { return underlyingByteSource.cancel(reason); };
        }
        var autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
        if (autoAllocateChunkSize === 0) {
            throw new TypeError('autoAllocateChunkSize must be greater than 0');
        }
        SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
    }
    function SetUpReadableStreamBYOBRequest(request, controller, view) {
        request._associatedReadableByteStreamController = controller;
        request._view = view;
    }
    // Helper functions for the ReadableStreamBYOBRequest.
    function byobRequestBrandCheckException(name) {
        return new TypeError("ReadableStreamBYOBRequest.prototype." + name + " can only be used on a ReadableStreamBYOBRequest");
    }
    // Helper functions for the ReadableByteStreamController.
    function byteStreamControllerBrandCheckException(name) {
        return new TypeError("ReadableByteStreamController.prototype." + name + " can only be used on a ReadableByteStreamController");
    }

    // Abstract operations for the ReadableStream.
    function AcquireReadableStreamBYOBReader(stream) {
        return new ReadableStreamBYOBReader(stream);
    }
    // ReadableStream API exposed for controllers.
    function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
        stream._reader._readIntoRequests.push(readIntoRequest);
    }
    function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
        var reader = stream._reader;
        var readIntoRequest = reader._readIntoRequests.shift();
        if (done) {
            readIntoRequest._closeSteps(chunk);
        }
        else {
            readIntoRequest._chunkSteps(chunk);
        }
    }
    function ReadableStreamGetNumReadIntoRequests(stream) {
        return stream._reader._readIntoRequests.length;
    }
    function ReadableStreamHasBYOBReader(stream) {
        var reader = stream._reader;
        if (reader === undefined) {
            return false;
        }
        if (!IsReadableStreamBYOBReader(reader)) {
            return false;
        }
        return true;
    }
    /**
     * A BYOB reader vended by a {@link ReadableStream}.
     *
     * @public
     */
    var ReadableStreamBYOBReader = /** @class */ (function () {
        function ReadableStreamBYOBReader(stream) {
            assertRequiredArgument(stream, 1, 'ReadableStreamBYOBReader');
            assertReadableStream(stream, 'First parameter');
            if (IsReadableStreamLocked(stream)) {
                throw new TypeError('This stream has already been locked for exclusive reading by another reader');
            }
            if (!IsReadableByteStreamController(stream._readableStreamController)) {
                throw new TypeError('Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte ' +
                    'source');
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readIntoRequests = new SimpleQueue();
        }
        Object.defineProperty(ReadableStreamBYOBReader.prototype, "closed", {
            /**
             * Returns a promise that will be fulfilled when the stream becomes closed, or rejected if the stream ever errors or
             * the reader's lock is released before the stream finishes closing.
             */
            get: function () {
                if (!IsReadableStreamBYOBReader(this)) {
                    return promiseRejectedWith(byobReaderBrandCheckException('closed'));
                }
                return this._closedPromise;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * If the reader is active, behaves the same as {@link ReadableStream.cancel | stream.cancel(reason)}.
         */
        ReadableStreamBYOBReader.prototype.cancel = function (reason) {
            if (reason === void 0) { reason = undefined; }
            if (!IsReadableStreamBYOBReader(this)) {
                return promiseRejectedWith(byobReaderBrandCheckException('cancel'));
            }
            if (this._ownerReadableStream === undefined) {
                return promiseRejectedWith(readerLockException('cancel'));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
        };
        /**
         * Attempts to reads bytes into view, and returns a promise resolved with the result.
         *
         * If reading a chunk causes the queue to become empty, more data will be pulled from the underlying source.
         */
        ReadableStreamBYOBReader.prototype.read = function (view) {
            if (!IsReadableStreamBYOBReader(this)) {
                return promiseRejectedWith(byobReaderBrandCheckException('read'));
            }
            if (!ArrayBuffer.isView(view)) {
                return promiseRejectedWith(new TypeError('view must be an array buffer view'));
            }
            if (view.byteLength === 0) {
                return promiseRejectedWith(new TypeError('view must have non-zero byteLength'));
            }
            if (view.buffer.byteLength === 0) {
                return promiseRejectedWith(new TypeError("view's buffer must have non-zero byteLength"));
            }
            if (this._ownerReadableStream === undefined) {
                return promiseRejectedWith(readerLockException('read from'));
            }
            var resolvePromise;
            var rejectPromise;
            var promise = newPromise(function (resolve, reject) {
                resolvePromise = resolve;
                rejectPromise = reject;
            });
            var readIntoRequest = {
                _chunkSteps: function (chunk) { return resolvePromise({ value: chunk, done: false }); },
                _closeSteps: function (chunk) { return resolvePromise({ value: chunk, done: true }); },
                _errorSteps: function (e) { return rejectPromise(e); }
            };
            ReadableStreamBYOBReaderRead(this, view, readIntoRequest);
            return promise;
        };
        /**
         * Releases the reader's lock on the corresponding stream. After the lock is released, the reader is no longer active.
         * If the associated stream is errored when the lock is released, the reader will appear errored in the same way
         * from now on; otherwise, the reader will appear closed.
         *
         * A reader's lock cannot be released while it still has a pending read request, i.e., if a promise returned by
         * the reader's {@link ReadableStreamBYOBReader.read | read()} method has not yet been settled. Attempting to
         * do so will throw a `TypeError` and leave the reader locked to the stream.
         */
        ReadableStreamBYOBReader.prototype.releaseLock = function () {
            if (!IsReadableStreamBYOBReader(this)) {
                throw byobReaderBrandCheckException('releaseLock');
            }
            if (this._ownerReadableStream === undefined) {
                return;
            }
            if (this._readIntoRequests.length > 0) {
                throw new TypeError('Tried to release a reader lock when that reader has pending read() calls un-settled');
            }
            ReadableStreamReaderGenericRelease(this);
        };
        return ReadableStreamBYOBReader;
    }());
    Object.defineProperties(ReadableStreamBYOBReader.prototype, {
        cancel: { enumerable: true },
        read: { enumerable: true },
        releaseLock: { enumerable: true },
        closed: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(ReadableStreamBYOBReader.prototype, SymbolPolyfill.toStringTag, {
            value: 'ReadableStreamBYOBReader',
            configurable: true
        });
    }
    // Abstract operations for the readers.
    function IsReadableStreamBYOBReader(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_readIntoRequests')) {
            return false;
        }
        return true;
    }
    function ReadableStreamBYOBReaderRead(reader, view, readIntoRequest) {
        var stream = reader._ownerReadableStream;
        stream._disturbed = true;
        if (stream._state === 'errored') {
            readIntoRequest._errorSteps(stream._storedError);
        }
        else {
            ReadableByteStreamControllerPullInto(stream._readableStreamController, view, readIntoRequest);
        }
    }
    // Helper functions for the ReadableStreamBYOBReader.
    function byobReaderBrandCheckException(name) {
        return new TypeError("ReadableStreamBYOBReader.prototype." + name + " can only be used on a ReadableStreamBYOBReader");
    }

    function ExtractHighWaterMark(strategy, defaultHWM) {
        var highWaterMark = strategy.highWaterMark;
        if (highWaterMark === undefined) {
            return defaultHWM;
        }
        if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
            throw new RangeError('Invalid highWaterMark');
        }
        return highWaterMark;
    }
    function ExtractSizeAlgorithm(strategy) {
        var size = strategy.size;
        if (!size) {
            return function () { return 1; };
        }
        return size;
    }

    function convertQueuingStrategy(init, context) {
        assertDictionary(init, context);
        var highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
        var size = init === null || init === void 0 ? void 0 : init.size;
        return {
            highWaterMark: highWaterMark === undefined ? undefined : convertUnrestrictedDouble(highWaterMark),
            size: size === undefined ? undefined : convertQueuingStrategySize(size, context + " has member 'size' that")
        };
    }
    function convertQueuingStrategySize(fn, context) {
        assertFunction(fn, context);
        return function (chunk) { return convertUnrestrictedDouble(fn(chunk)); };
    }

    function convertUnderlyingSink(original, context) {
        assertDictionary(original, context);
        var abort = original === null || original === void 0 ? void 0 : original.abort;
        var close = original === null || original === void 0 ? void 0 : original.close;
        var start = original === null || original === void 0 ? void 0 : original.start;
        var type = original === null || original === void 0 ? void 0 : original.type;
        var write = original === null || original === void 0 ? void 0 : original.write;
        return {
            abort: abort === undefined ?
                undefined :
                convertUnderlyingSinkAbortCallback(abort, original, context + " has member 'abort' that"),
            close: close === undefined ?
                undefined :
                convertUnderlyingSinkCloseCallback(close, original, context + " has member 'close' that"),
            start: start === undefined ?
                undefined :
                convertUnderlyingSinkStartCallback(start, original, context + " has member 'start' that"),
            write: write === undefined ?
                undefined :
                convertUnderlyingSinkWriteCallback(write, original, context + " has member 'write' that"),
            type: type
        };
    }
    function convertUnderlyingSinkAbortCallback(fn, original, context) {
        assertFunction(fn, context);
        return function (reason) { return promiseCall(fn, original, [reason]); };
    }
    function convertUnderlyingSinkCloseCallback(fn, original, context) {
        assertFunction(fn, context);
        return function () { return promiseCall(fn, original, []); };
    }
    function convertUnderlyingSinkStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return function (controller) { return reflectCall(fn, original, [controller]); };
    }
    function convertUnderlyingSinkWriteCallback(fn, original, context) {
        assertFunction(fn, context);
        return function (chunk, controller) { return promiseCall(fn, original, [chunk, controller]); };
    }

    function assertWritableStream(x, context) {
        if (!IsWritableStream(x)) {
            throw new TypeError(context + " is not a WritableStream.");
        }
    }

    /**
     * A writable stream represents a destination for data, into which you can write.
     *
     * @public
     */
    var WritableStream = /** @class */ (function () {
        function WritableStream(rawUnderlyingSink, rawStrategy) {
            if (rawUnderlyingSink === void 0) { rawUnderlyingSink = {}; }
            if (rawStrategy === void 0) { rawStrategy = {}; }
            if (rawUnderlyingSink === undefined) {
                rawUnderlyingSink = null;
            }
            else {
                assertObject(rawUnderlyingSink, 'First parameter');
            }
            var strategy = convertQueuingStrategy(rawStrategy, 'Second parameter');
            var underlyingSink = convertUnderlyingSink(rawUnderlyingSink, 'First parameter');
            InitializeWritableStream(this);
            var type = underlyingSink.type;
            if (type !== undefined) {
                throw new RangeError('Invalid type is specified');
            }
            var sizeAlgorithm = ExtractSizeAlgorithm(strategy);
            var highWaterMark = ExtractHighWaterMark(strategy, 1);
            SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
        }
        Object.defineProperty(WritableStream.prototype, "locked", {
            /**
             * Returns whether or not the writable stream is locked to a writer.
             */
            get: function () {
                if (!IsWritableStream(this)) {
                    throw streamBrandCheckException$2('locked');
                }
                return IsWritableStreamLocked(this);
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Aborts the stream, signaling that the producer can no longer successfully write to the stream and it is to be
         * immediately moved to an errored state, with any queued-up writes discarded. This will also execute any abort
         * mechanism of the underlying sink.
         *
         * The returned promise will fulfill if the stream shuts down successfully, or reject if the underlying sink signaled
         * that there was an error doing so. Additionally, it will reject with a `TypeError` (without attempting to cancel
         * the stream) if the stream is currently locked.
         */
        WritableStream.prototype.abort = function (reason) {
            if (reason === void 0) { reason = undefined; }
            if (!IsWritableStream(this)) {
                return promiseRejectedWith(streamBrandCheckException$2('abort'));
            }
            if (IsWritableStreamLocked(this)) {
                return promiseRejectedWith(new TypeError('Cannot abort a stream that already has a writer'));
            }
            return WritableStreamAbort(this, reason);
        };
        /**
         * Closes the stream. The underlying sink will finish processing any previously-written chunks, before invoking its
         * close behavior. During this time any further attempts to write will fail (without erroring the stream).
         *
         * The method returns a promise that will fulfill if all remaining chunks are successfully written and the stream
         * successfully closes, or rejects if an error is encountered during this process. Additionally, it will reject with
         * a `TypeError` (without attempting to cancel the stream) if the stream is currently locked.
         */
        WritableStream.prototype.close = function () {
            if (!IsWritableStream(this)) {
                return promiseRejectedWith(streamBrandCheckException$2('close'));
            }
            if (IsWritableStreamLocked(this)) {
                return promiseRejectedWith(new TypeError('Cannot close a stream that already has a writer'));
            }
            if (WritableStreamCloseQueuedOrInFlight(this)) {
                return promiseRejectedWith(new TypeError('Cannot close an already-closing stream'));
            }
            return WritableStreamClose(this);
        };
        /**
         * Creates a {@link WritableStreamDefaultWriter | writer} and locks the stream to the new writer. While the stream
         * is locked, no other writer can be acquired until this one is released.
         *
         * This functionality is especially useful for creating abstractions that desire the ability to write to a stream
         * without interruption or interleaving. By getting a writer for the stream, you can ensure nobody else can write at
         * the same time, which would cause the resulting written data to be unpredictable and probably useless.
         */
        WritableStream.prototype.getWriter = function () {
            if (!IsWritableStream(this)) {
                throw streamBrandCheckException$2('getWriter');
            }
            return AcquireWritableStreamDefaultWriter(this);
        };
        return WritableStream;
    }());
    Object.defineProperties(WritableStream.prototype, {
        abort: { enumerable: true },
        close: { enumerable: true },
        getWriter: { enumerable: true },
        locked: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(WritableStream.prototype, SymbolPolyfill.toStringTag, {
            value: 'WritableStream',
            configurable: true
        });
    }
    // Abstract operations for the WritableStream.
    function AcquireWritableStreamDefaultWriter(stream) {
        return new WritableStreamDefaultWriter(stream);
    }
    // Throws if and only if startAlgorithm throws.
    function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
        if (highWaterMark === void 0) { highWaterMark = 1; }
        if (sizeAlgorithm === void 0) { sizeAlgorithm = function () { return 1; }; }
        var stream = Object.create(WritableStream.prototype);
        InitializeWritableStream(stream);
        var controller = Object.create(WritableStreamDefaultController.prototype);
        SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
        return stream;
    }
    function InitializeWritableStream(stream) {
        stream._state = 'writable';
        // The error that will be reported by new method calls once the state becomes errored. Only set when [[state]] is
        // 'erroring' or 'errored'. May be set to an undefined value.
        stream._storedError = undefined;
        stream._writer = undefined;
        // Initialize to undefined first because the constructor of the controller checks this
        // variable to validate the caller.
        stream._writableStreamController = undefined;
        // This queue is placed here instead of the writer class in order to allow for passing a writer to the next data
        // producer without waiting for the queued writes to finish.
        stream._writeRequests = new SimpleQueue();
        // Write requests are removed from _writeRequests when write() is called on the underlying sink. This prevents
        // them from being erroneously rejected on error. If a write() call is in-flight, the request is stored here.
        stream._inFlightWriteRequest = undefined;
        // The promise that was returned from writer.close(). Stored here because it may be fulfilled after the writer
        // has been detached.
        stream._closeRequest = undefined;
        // Close request is removed from _closeRequest when close() is called on the underlying sink. This prevents it
        // from being erroneously rejected on error. If a close() call is in-flight, the request is stored here.
        stream._inFlightCloseRequest = undefined;
        // The promise that was returned from writer.abort(). This may also be fulfilled after the writer has detached.
        stream._pendingAbortRequest = undefined;
        // The backpressure signal set by the controller.
        stream._backpressure = false;
    }
    function IsWritableStream(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_writableStreamController')) {
            return false;
        }
        return true;
    }
    function IsWritableStreamLocked(stream) {
        if (stream._writer === undefined) {
            return false;
        }
        return true;
    }
    function WritableStreamAbort(stream, reason) {
        var state = stream._state;
        if (state === 'closed' || state === 'errored') {
            return promiseResolvedWith(undefined);
        }
        if (stream._pendingAbortRequest !== undefined) {
            return stream._pendingAbortRequest._promise;
        }
        var wasAlreadyErroring = false;
        if (state === 'erroring') {
            wasAlreadyErroring = true;
            // reason will not be used, so don't keep a reference to it.
            reason = undefined;
        }
        var promise = newPromise(function (resolve, reject) {
            stream._pendingAbortRequest = {
                _promise: undefined,
                _resolve: resolve,
                _reject: reject,
                _reason: reason,
                _wasAlreadyErroring: wasAlreadyErroring
            };
        });
        stream._pendingAbortRequest._promise = promise;
        if (!wasAlreadyErroring) {
            WritableStreamStartErroring(stream, reason);
        }
        return promise;
    }
    function WritableStreamClose(stream) {
        var state = stream._state;
        if (state === 'closed' || state === 'errored') {
            return promiseRejectedWith(new TypeError("The stream (in " + state + " state) is not in the writable state and cannot be closed"));
        }
        var promise = newPromise(function (resolve, reject) {
            var closeRequest = {
                _resolve: resolve,
                _reject: reject
            };
            stream._closeRequest = closeRequest;
        });
        var writer = stream._writer;
        if (writer !== undefined && stream._backpressure && state === 'writable') {
            defaultWriterReadyPromiseResolve(writer);
        }
        WritableStreamDefaultControllerClose(stream._writableStreamController);
        return promise;
    }
    // WritableStream API exposed for controllers.
    function WritableStreamAddWriteRequest(stream) {
        var promise = newPromise(function (resolve, reject) {
            var writeRequest = {
                _resolve: resolve,
                _reject: reject
            };
            stream._writeRequests.push(writeRequest);
        });
        return promise;
    }
    function WritableStreamDealWithRejection(stream, error) {
        var state = stream._state;
        if (state === 'writable') {
            WritableStreamStartErroring(stream, error);
            return;
        }
        WritableStreamFinishErroring(stream);
    }
    function WritableStreamStartErroring(stream, reason) {
        var controller = stream._writableStreamController;
        stream._state = 'erroring';
        stream._storedError = reason;
        var writer = stream._writer;
        if (writer !== undefined) {
            WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
        }
        if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
            WritableStreamFinishErroring(stream);
        }
    }
    function WritableStreamFinishErroring(stream) {
        stream._state = 'errored';
        stream._writableStreamController[ErrorSteps]();
        var storedError = stream._storedError;
        stream._writeRequests.forEach(function (writeRequest) {
            writeRequest._reject(storedError);
        });
        stream._writeRequests = new SimpleQueue();
        if (stream._pendingAbortRequest === undefined) {
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
        }
        var abortRequest = stream._pendingAbortRequest;
        stream._pendingAbortRequest = undefined;
        if (abortRequest._wasAlreadyErroring) {
            abortRequest._reject(storedError);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
        }
        var promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
        uponPromise(promise, function () {
            abortRequest._resolve();
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
        }, function (reason) {
            abortRequest._reject(reason);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
        });
    }
    function WritableStreamFinishInFlightWrite(stream) {
        stream._inFlightWriteRequest._resolve(undefined);
        stream._inFlightWriteRequest = undefined;
    }
    function WritableStreamFinishInFlightWriteWithError(stream, error) {
        stream._inFlightWriteRequest._reject(error);
        stream._inFlightWriteRequest = undefined;
        WritableStreamDealWithRejection(stream, error);
    }
    function WritableStreamFinishInFlightClose(stream) {
        stream._inFlightCloseRequest._resolve(undefined);
        stream._inFlightCloseRequest = undefined;
        var state = stream._state;
        if (state === 'erroring') {
            // The error was too late to do anything, so it is ignored.
            stream._storedError = undefined;
            if (stream._pendingAbortRequest !== undefined) {
                stream._pendingAbortRequest._resolve();
                stream._pendingAbortRequest = undefined;
            }
        }
        stream._state = 'closed';
        var writer = stream._writer;
        if (writer !== undefined) {
            defaultWriterClosedPromiseResolve(writer);
        }
    }
    function WritableStreamFinishInFlightCloseWithError(stream, error) {
        stream._inFlightCloseRequest._reject(error);
        stream._inFlightCloseRequest = undefined;
        // Never execute sink abort() after sink close().
        if (stream._pendingAbortRequest !== undefined) {
            stream._pendingAbortRequest._reject(error);
            stream._pendingAbortRequest = undefined;
        }
        WritableStreamDealWithRejection(stream, error);
    }
    // TODO(ricea): Fix alphabetical order.
    function WritableStreamCloseQueuedOrInFlight(stream) {
        if (stream._closeRequest === undefined && stream._inFlightCloseRequest === undefined) {
            return false;
        }
        return true;
    }
    function WritableStreamHasOperationMarkedInFlight(stream) {
        if (stream._inFlightWriteRequest === undefined && stream._inFlightCloseRequest === undefined) {
            return false;
        }
        return true;
    }
    function WritableStreamMarkCloseRequestInFlight(stream) {
        stream._inFlightCloseRequest = stream._closeRequest;
        stream._closeRequest = undefined;
    }
    function WritableStreamMarkFirstWriteRequestInFlight(stream) {
        stream._inFlightWriteRequest = stream._writeRequests.shift();
    }
    function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
        if (stream._closeRequest !== undefined) {
            stream._closeRequest._reject(stream._storedError);
            stream._closeRequest = undefined;
        }
        var writer = stream._writer;
        if (writer !== undefined) {
            defaultWriterClosedPromiseReject(writer, stream._storedError);
        }
    }
    function WritableStreamUpdateBackpressure(stream, backpressure) {
        var writer = stream._writer;
        if (writer !== undefined && backpressure !== stream._backpressure) {
            if (backpressure) {
                defaultWriterReadyPromiseReset(writer);
            }
            else {
                defaultWriterReadyPromiseResolve(writer);
            }
        }
        stream._backpressure = backpressure;
    }
    /**
     * A default writer vended by a {@link WritableStream}.
     *
     * @public
     */
    var WritableStreamDefaultWriter = /** @class */ (function () {
        function WritableStreamDefaultWriter(stream) {
            assertRequiredArgument(stream, 1, 'WritableStreamDefaultWriter');
            assertWritableStream(stream, 'First parameter');
            if (IsWritableStreamLocked(stream)) {
                throw new TypeError('This stream has already been locked for exclusive writing by another writer');
            }
            this._ownerWritableStream = stream;
            stream._writer = this;
            var state = stream._state;
            if (state === 'writable') {
                if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
                    defaultWriterReadyPromiseInitialize(this);
                }
                else {
                    defaultWriterReadyPromiseInitializeAsResolved(this);
                }
                defaultWriterClosedPromiseInitialize(this);
            }
            else if (state === 'erroring') {
                defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
                defaultWriterClosedPromiseInitialize(this);
            }
            else if (state === 'closed') {
                defaultWriterReadyPromiseInitializeAsResolved(this);
                defaultWriterClosedPromiseInitializeAsResolved(this);
            }
            else {
                var storedError = stream._storedError;
                defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
                defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
            }
        }
        Object.defineProperty(WritableStreamDefaultWriter.prototype, "closed", {
            /**
             * Returns a promise that will be fulfilled when the stream becomes closed, or rejected if the stream ever errors or
             * the writer’s lock is released before the stream finishes closing.
             */
            get: function () {
                if (!IsWritableStreamDefaultWriter(this)) {
                    return promiseRejectedWith(defaultWriterBrandCheckException('closed'));
                }
                return this._closedPromise;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WritableStreamDefaultWriter.prototype, "desiredSize", {
            /**
             * Returns the desired size to fill the stream’s internal queue. It can be negative, if the queue is over-full.
             * A producer can use this information to determine the right amount of data to write.
             *
             * It will be `null` if the stream cannot be successfully written to (due to either being errored, or having an abort
             * queued up). It will return zero if the stream is closed. And the getter will throw an exception if invoked when
             * the writer’s lock is released.
             */
            get: function () {
                if (!IsWritableStreamDefaultWriter(this)) {
                    throw defaultWriterBrandCheckException('desiredSize');
                }
                if (this._ownerWritableStream === undefined) {
                    throw defaultWriterLockException('desiredSize');
                }
                return WritableStreamDefaultWriterGetDesiredSize(this);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WritableStreamDefaultWriter.prototype, "ready", {
            /**
             * Returns a promise that will be fulfilled when the desired size to fill the stream’s internal queue transitions
             * from non-positive to positive, signaling that it is no longer applying backpressure. Once the desired size dips
             * back to zero or below, the getter will return a new promise that stays pending until the next transition.
             *
             * If the stream becomes errored or aborted, or the writer’s lock is released, the returned promise will become
             * rejected.
             */
            get: function () {
                if (!IsWritableStreamDefaultWriter(this)) {
                    return promiseRejectedWith(defaultWriterBrandCheckException('ready'));
                }
                return this._readyPromise;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * If the reader is active, behaves the same as {@link WritableStream.abort | stream.abort(reason)}.
         */
        WritableStreamDefaultWriter.prototype.abort = function (reason) {
            if (reason === void 0) { reason = undefined; }
            if (!IsWritableStreamDefaultWriter(this)) {
                return promiseRejectedWith(defaultWriterBrandCheckException('abort'));
            }
            if (this._ownerWritableStream === undefined) {
                return promiseRejectedWith(defaultWriterLockException('abort'));
            }
            return WritableStreamDefaultWriterAbort(this, reason);
        };
        /**
         * If the reader is active, behaves the same as {@link WritableStream.close | stream.close()}.
         */
        WritableStreamDefaultWriter.prototype.close = function () {
            if (!IsWritableStreamDefaultWriter(this)) {
                return promiseRejectedWith(defaultWriterBrandCheckException('close'));
            }
            var stream = this._ownerWritableStream;
            if (stream === undefined) {
                return promiseRejectedWith(defaultWriterLockException('close'));
            }
            if (WritableStreamCloseQueuedOrInFlight(stream)) {
                return promiseRejectedWith(new TypeError('Cannot close an already-closing stream'));
            }
            return WritableStreamDefaultWriterClose(this);
        };
        /**
         * Releases the writer’s lock on the corresponding stream. After the lock is released, the writer is no longer active.
         * If the associated stream is errored when the lock is released, the writer will appear errored in the same way from
         * now on; otherwise, the writer will appear closed.
         *
         * Note that the lock can still be released even if some ongoing writes have not yet finished (i.e. even if the
         * promises returned from previous calls to {@link WritableStreamDefaultWriter.write | write()} have not yet settled).
         * It’s not necessary to hold the lock on the writer for the duration of the write; the lock instead simply prevents
         * other producers from writing in an interleaved manner.
         */
        WritableStreamDefaultWriter.prototype.releaseLock = function () {
            if (!IsWritableStreamDefaultWriter(this)) {
                throw defaultWriterBrandCheckException('releaseLock');
            }
            var stream = this._ownerWritableStream;
            if (stream === undefined) {
                return;
            }
            WritableStreamDefaultWriterRelease(this);
        };
        WritableStreamDefaultWriter.prototype.write = function (chunk) {
            if (chunk === void 0) { chunk = undefined; }
            if (!IsWritableStreamDefaultWriter(this)) {
                return promiseRejectedWith(defaultWriterBrandCheckException('write'));
            }
            if (this._ownerWritableStream === undefined) {
                return promiseRejectedWith(defaultWriterLockException('write to'));
            }
            return WritableStreamDefaultWriterWrite(this, chunk);
        };
        return WritableStreamDefaultWriter;
    }());
    Object.defineProperties(WritableStreamDefaultWriter.prototype, {
        abort: { enumerable: true },
        close: { enumerable: true },
        releaseLock: { enumerable: true },
        write: { enumerable: true },
        closed: { enumerable: true },
        desiredSize: { enumerable: true },
        ready: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(WritableStreamDefaultWriter.prototype, SymbolPolyfill.toStringTag, {
            value: 'WritableStreamDefaultWriter',
            configurable: true
        });
    }
    // Abstract operations for the WritableStreamDefaultWriter.
    function IsWritableStreamDefaultWriter(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_ownerWritableStream')) {
            return false;
        }
        return true;
    }
    // A client of WritableStreamDefaultWriter may use these functions directly to bypass state check.
    function WritableStreamDefaultWriterAbort(writer, reason) {
        var stream = writer._ownerWritableStream;
        return WritableStreamAbort(stream, reason);
    }
    function WritableStreamDefaultWriterClose(writer) {
        var stream = writer._ownerWritableStream;
        return WritableStreamClose(stream);
    }
    function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
        var stream = writer._ownerWritableStream;
        var state = stream._state;
        if (WritableStreamCloseQueuedOrInFlight(stream) || state === 'closed') {
            return promiseResolvedWith(undefined);
        }
        if (state === 'errored') {
            return promiseRejectedWith(stream._storedError);
        }
        return WritableStreamDefaultWriterClose(writer);
    }
    function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error) {
        if (writer._closedPromiseState === 'pending') {
            defaultWriterClosedPromiseReject(writer, error);
        }
        else {
            defaultWriterClosedPromiseResetToRejected(writer, error);
        }
    }
    function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error) {
        if (writer._readyPromiseState === 'pending') {
            defaultWriterReadyPromiseReject(writer, error);
        }
        else {
            defaultWriterReadyPromiseResetToRejected(writer, error);
        }
    }
    function WritableStreamDefaultWriterGetDesiredSize(writer) {
        var stream = writer._ownerWritableStream;
        var state = stream._state;
        if (state === 'errored' || state === 'erroring') {
            return null;
        }
        if (state === 'closed') {
            return 0;
        }
        return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
    }
    function WritableStreamDefaultWriterRelease(writer) {
        var stream = writer._ownerWritableStream;
        var releasedError = new TypeError("Writer was released and can no longer be used to monitor the stream's closedness");
        WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
        // The state transitions to "errored" before the sink abort() method runs, but the writer.closed promise is not
        // rejected until afterwards. This means that simply testing state will not work.
        WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
        stream._writer = undefined;
        writer._ownerWritableStream = undefined;
    }
    function WritableStreamDefaultWriterWrite(writer, chunk) {
        var stream = writer._ownerWritableStream;
        var controller = stream._writableStreamController;
        var chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
        if (stream !== writer._ownerWritableStream) {
            return promiseRejectedWith(defaultWriterLockException('write to'));
        }
        var state = stream._state;
        if (state === 'errored') {
            return promiseRejectedWith(stream._storedError);
        }
        if (WritableStreamCloseQueuedOrInFlight(stream) || state === 'closed') {
            return promiseRejectedWith(new TypeError('The stream is closing or closed and cannot be written to'));
        }
        if (state === 'erroring') {
            return promiseRejectedWith(stream._storedError);
        }
        var promise = WritableStreamAddWriteRequest(stream);
        WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
        return promise;
    }
    var closeSentinel = {};
    /**
     * Allows control of a {@link WritableStream | writable stream}'s state and internal queue.
     *
     * @public
     */
    var WritableStreamDefaultController = /** @class */ (function () {
        function WritableStreamDefaultController() {
            throw new TypeError('Illegal constructor');
        }
        /**
         * Closes the controlled writable stream, making all future interactions with it fail with the given error `e`.
         *
         * This method is rarely used, since usually it suffices to return a rejected promise from one of the underlying
         * sink's methods. However, it can be useful for suddenly shutting down a stream in response to an event outside the
         * normal lifecycle of interactions with the underlying sink.
         */
        WritableStreamDefaultController.prototype.error = function (e) {
            if (e === void 0) { e = undefined; }
            if (!IsWritableStreamDefaultController(this)) {
                throw new TypeError('WritableStreamDefaultController.prototype.error can only be used on a WritableStreamDefaultController');
            }
            var state = this._controlledWritableStream._state;
            if (state !== 'writable') {
                // The stream is closed, errored or will be soon. The sink can't do anything useful if it gets an error here, so
                // just treat it as a no-op.
                return;
            }
            WritableStreamDefaultControllerError(this, e);
        };
        /** @internal */
        WritableStreamDefaultController.prototype[AbortSteps] = function (reason) {
            var result = this._abortAlgorithm(reason);
            WritableStreamDefaultControllerClearAlgorithms(this);
            return result;
        };
        /** @internal */
        WritableStreamDefaultController.prototype[ErrorSteps] = function () {
            ResetQueue(this);
        };
        return WritableStreamDefaultController;
    }());
    Object.defineProperties(WritableStreamDefaultController.prototype, {
        error: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(WritableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: 'WritableStreamDefaultController',
            configurable: true
        });
    }
    // Abstract operations implementing interface required by the WritableStream.
    function IsWritableStreamDefaultController(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_controlledWritableStream')) {
            return false;
        }
        return true;
    }
    function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
        controller._controlledWritableStream = stream;
        stream._writableStreamController = controller;
        // Need to set the slots so that the assert doesn't fire. In the spec the slots already exist implicitly.
        controller._queue = undefined;
        controller._queueTotalSize = undefined;
        ResetQueue(controller);
        controller._started = false;
        controller._strategySizeAlgorithm = sizeAlgorithm;
        controller._strategyHWM = highWaterMark;
        controller._writeAlgorithm = writeAlgorithm;
        controller._closeAlgorithm = closeAlgorithm;
        controller._abortAlgorithm = abortAlgorithm;
        var backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
        WritableStreamUpdateBackpressure(stream, backpressure);
        var startResult = startAlgorithm();
        var startPromise = promiseResolvedWith(startResult);
        uponPromise(startPromise, function () {
            controller._started = true;
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }, function (r) {
            controller._started = true;
            WritableStreamDealWithRejection(stream, r);
        });
    }
    function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
        var controller = Object.create(WritableStreamDefaultController.prototype);
        var startAlgorithm = function () { return undefined; };
        var writeAlgorithm = function () { return promiseResolvedWith(undefined); };
        var closeAlgorithm = function () { return promiseResolvedWith(undefined); };
        var abortAlgorithm = function () { return promiseResolvedWith(undefined); };
        if (underlyingSink.start !== undefined) {
            startAlgorithm = function () { return underlyingSink.start(controller); };
        }
        if (underlyingSink.write !== undefined) {
            writeAlgorithm = function (chunk) { return underlyingSink.write(chunk, controller); };
        }
        if (underlyingSink.close !== undefined) {
            closeAlgorithm = function () { return underlyingSink.close(); };
        }
        if (underlyingSink.abort !== undefined) {
            abortAlgorithm = function (reason) { return underlyingSink.abort(reason); };
        }
        SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
    }
    // ClearAlgorithms may be called twice. Erroring the same stream in multiple ways will often result in redundant calls.
    function WritableStreamDefaultControllerClearAlgorithms(controller) {
        controller._writeAlgorithm = undefined;
        controller._closeAlgorithm = undefined;
        controller._abortAlgorithm = undefined;
        controller._strategySizeAlgorithm = undefined;
    }
    function WritableStreamDefaultControllerClose(controller) {
        EnqueueValueWithSize(controller, closeSentinel, 0);
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
    }
    function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
        try {
            return controller._strategySizeAlgorithm(chunk);
        }
        catch (chunkSizeE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
            return 1;
        }
    }
    function WritableStreamDefaultControllerGetDesiredSize(controller) {
        return controller._strategyHWM - controller._queueTotalSize;
    }
    function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
        try {
            EnqueueValueWithSize(controller, chunk, chunkSize);
        }
        catch (enqueueE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
            return;
        }
        var stream = controller._controlledWritableStream;
        if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === 'writable') {
            var backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
            WritableStreamUpdateBackpressure(stream, backpressure);
        }
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
    }
    // Abstract operations for the WritableStreamDefaultController.
    function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
        var stream = controller._controlledWritableStream;
        if (!controller._started) {
            return;
        }
        if (stream._inFlightWriteRequest !== undefined) {
            return;
        }
        var state = stream._state;
        if (state === 'erroring') {
            WritableStreamFinishErroring(stream);
            return;
        }
        if (controller._queue.length === 0) {
            return;
        }
        var value = PeekQueueValue(controller);
        if (value === closeSentinel) {
            WritableStreamDefaultControllerProcessClose(controller);
        }
        else {
            WritableStreamDefaultControllerProcessWrite(controller, value);
        }
    }
    function WritableStreamDefaultControllerErrorIfNeeded(controller, error) {
        if (controller._controlledWritableStream._state === 'writable') {
            WritableStreamDefaultControllerError(controller, error);
        }
    }
    function WritableStreamDefaultControllerProcessClose(controller) {
        var stream = controller._controlledWritableStream;
        WritableStreamMarkCloseRequestInFlight(stream);
        DequeueValue(controller);
        var sinkClosePromise = controller._closeAlgorithm();
        WritableStreamDefaultControllerClearAlgorithms(controller);
        uponPromise(sinkClosePromise, function () {
            WritableStreamFinishInFlightClose(stream);
        }, function (reason) {
            WritableStreamFinishInFlightCloseWithError(stream, reason);
        });
    }
    function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
        var stream = controller._controlledWritableStream;
        WritableStreamMarkFirstWriteRequestInFlight(stream);
        var sinkWritePromise = controller._writeAlgorithm(chunk);
        uponPromise(sinkWritePromise, function () {
            WritableStreamFinishInFlightWrite(stream);
            var state = stream._state;
            DequeueValue(controller);
            if (!WritableStreamCloseQueuedOrInFlight(stream) && state === 'writable') {
                var backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
                WritableStreamUpdateBackpressure(stream, backpressure);
            }
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }, function (reason) {
            if (stream._state === 'writable') {
                WritableStreamDefaultControllerClearAlgorithms(controller);
            }
            WritableStreamFinishInFlightWriteWithError(stream, reason);
        });
    }
    function WritableStreamDefaultControllerGetBackpressure(controller) {
        var desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
        return desiredSize <= 0;
    }
    // A client of WritableStreamDefaultController may use these functions directly to bypass state check.
    function WritableStreamDefaultControllerError(controller, error) {
        var stream = controller._controlledWritableStream;
        WritableStreamDefaultControllerClearAlgorithms(controller);
        WritableStreamStartErroring(stream, error);
    }
    // Helper functions for the WritableStream.
    function streamBrandCheckException$2(name) {
        return new TypeError("WritableStream.prototype." + name + " can only be used on a WritableStream");
    }
    // Helper functions for the WritableStreamDefaultWriter.
    function defaultWriterBrandCheckException(name) {
        return new TypeError("WritableStreamDefaultWriter.prototype." + name + " can only be used on a WritableStreamDefaultWriter");
    }
    function defaultWriterLockException(name) {
        return new TypeError('Cannot ' + name + ' a stream using a released writer');
    }
    function defaultWriterClosedPromiseInitialize(writer) {
        writer._closedPromise = newPromise(function (resolve, reject) {
            writer._closedPromise_resolve = resolve;
            writer._closedPromise_reject = reject;
            writer._closedPromiseState = 'pending';
        });
    }
    function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
        defaultWriterClosedPromiseInitialize(writer);
        defaultWriterClosedPromiseReject(writer, reason);
    }
    function defaultWriterClosedPromiseInitializeAsResolved(writer) {
        defaultWriterClosedPromiseInitialize(writer);
        defaultWriterClosedPromiseResolve(writer);
    }
    function defaultWriterClosedPromiseReject(writer, reason) {
        if (writer._closedPromise_reject === undefined) {
            return;
        }
        setPromiseIsHandledToTrue(writer._closedPromise);
        writer._closedPromise_reject(reason);
        writer._closedPromise_resolve = undefined;
        writer._closedPromise_reject = undefined;
        writer._closedPromiseState = 'rejected';
    }
    function defaultWriterClosedPromiseResetToRejected(writer, reason) {
        defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
    }
    function defaultWriterClosedPromiseResolve(writer) {
        if (writer._closedPromise_resolve === undefined) {
            return;
        }
        writer._closedPromise_resolve(undefined);
        writer._closedPromise_resolve = undefined;
        writer._closedPromise_reject = undefined;
        writer._closedPromiseState = 'resolved';
    }
    function defaultWriterReadyPromiseInitialize(writer) {
        writer._readyPromise = newPromise(function (resolve, reject) {
            writer._readyPromise_resolve = resolve;
            writer._readyPromise_reject = reject;
        });
        writer._readyPromiseState = 'pending';
    }
    function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
        defaultWriterReadyPromiseInitialize(writer);
        defaultWriterReadyPromiseReject(writer, reason);
    }
    function defaultWriterReadyPromiseInitializeAsResolved(writer) {
        defaultWriterReadyPromiseInitialize(writer);
        defaultWriterReadyPromiseResolve(writer);
    }
    function defaultWriterReadyPromiseReject(writer, reason) {
        if (writer._readyPromise_reject === undefined) {
            return;
        }
        setPromiseIsHandledToTrue(writer._readyPromise);
        writer._readyPromise_reject(reason);
        writer._readyPromise_resolve = undefined;
        writer._readyPromise_reject = undefined;
        writer._readyPromiseState = 'rejected';
    }
    function defaultWriterReadyPromiseReset(writer) {
        defaultWriterReadyPromiseInitialize(writer);
    }
    function defaultWriterReadyPromiseResetToRejected(writer, reason) {
        defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
    }
    function defaultWriterReadyPromiseResolve(writer) {
        if (writer._readyPromise_resolve === undefined) {
            return;
        }
        writer._readyPromise_resolve(undefined);
        writer._readyPromise_resolve = undefined;
        writer._readyPromise_reject = undefined;
        writer._readyPromiseState = 'fulfilled';
    }

    function isAbortSignal(value) {
        if (typeof value !== 'object' || value === null) {
            return false;
        }
        try {
            return typeof value.aborted === 'boolean';
        }
        catch (_a) {
            // AbortSignal.prototype.aborted throws if its brand check fails
            return false;
        }
    }

    /// <reference lib="dom" />
    var NativeDOMException = typeof DOMException !== 'undefined' ? DOMException : undefined;

    /// <reference types="node" />
    function isDOMExceptionConstructor(ctor) {
        if (!(typeof ctor === 'function' || typeof ctor === 'object')) {
            return false;
        }
        try {
            new ctor();
            return true;
        }
        catch (_a) {
            return false;
        }
    }
    function createDOMExceptionPolyfill() {
        // eslint-disable-next-line no-shadow
        var ctor = function DOMException(message, name) {
            this.message = message || '';
            this.name = name || 'Error';
            if (Error.captureStackTrace) {
                Error.captureStackTrace(this, this.constructor);
            }
        };
        ctor.prototype = Object.create(Error.prototype);
        Object.defineProperty(ctor.prototype, 'constructor', { value: ctor, writable: true, configurable: true });
        return ctor;
    }
    // eslint-disable-next-line no-redeclare
    var DOMException$1 = isDOMExceptionConstructor(NativeDOMException) ? NativeDOMException : createDOMExceptionPolyfill();

    function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
        var reader = AcquireReadableStreamDefaultReader(source);
        var writer = AcquireWritableStreamDefaultWriter(dest);
        source._disturbed = true;
        var shuttingDown = false;
        // This is used to keep track of the spec's requirement that we wait for ongoing writes during shutdown.
        var currentWrite = promiseResolvedWith(undefined);
        return newPromise(function (resolve, reject) {
            var abortAlgorithm;
            if (signal !== undefined) {
                abortAlgorithm = function () {
                    var error = new DOMException$1('Aborted', 'AbortError');
                    var actions = [];
                    if (!preventAbort) {
                        actions.push(function () {
                            if (dest._state === 'writable') {
                                return WritableStreamAbort(dest, error);
                            }
                            return promiseResolvedWith(undefined);
                        });
                    }
                    if (!preventCancel) {
                        actions.push(function () {
                            if (source._state === 'readable') {
                                return ReadableStreamCancel(source, error);
                            }
                            return promiseResolvedWith(undefined);
                        });
                    }
                    shutdownWithAction(function () { return Promise.all(actions.map(function (action) { return action(); })); }, true, error);
                };
                if (signal.aborted) {
                    abortAlgorithm();
                    return;
                }
                signal.addEventListener('abort', abortAlgorithm);
            }
            // Using reader and writer, read all chunks from this and write them to dest
            // - Backpressure must be enforced
            // - Shutdown must stop all activity
            function pipeLoop() {
                return newPromise(function (resolveLoop, rejectLoop) {
                    function next(done) {
                        if (done) {
                            resolveLoop();
                        }
                        else {
                            // Use `PerformPromiseThen` instead of `uponPromise` to avoid
                            // adding unnecessary `.catch(rethrowAssertionErrorRejection)` handlers
                            PerformPromiseThen(pipeStep(), next, rejectLoop);
                        }
                    }
                    next(false);
                });
            }
            function pipeStep() {
                if (shuttingDown) {
                    return promiseResolvedWith(true);
                }
                return PerformPromiseThen(writer._readyPromise, function () {
                    return newPromise(function (resolveRead, rejectRead) {
                        ReadableStreamDefaultReaderRead(reader, {
                            _chunkSteps: function (chunk) {
                                currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), undefined, noop);
                                resolveRead(false);
                            },
                            _closeSteps: function () { return resolveRead(true); },
                            _errorSteps: rejectRead
                        });
                    });
                });
            }
            // Errors must be propagated forward
            isOrBecomesErrored(source, reader._closedPromise, function (storedError) {
                if (!preventAbort) {
                    shutdownWithAction(function () { return WritableStreamAbort(dest, storedError); }, true, storedError);
                }
                else {
                    shutdown(true, storedError);
                }
            });
            // Errors must be propagated backward
            isOrBecomesErrored(dest, writer._closedPromise, function (storedError) {
                if (!preventCancel) {
                    shutdownWithAction(function () { return ReadableStreamCancel(source, storedError); }, true, storedError);
                }
                else {
                    shutdown(true, storedError);
                }
            });
            // Closing must be propagated forward
            isOrBecomesClosed(source, reader._closedPromise, function () {
                if (!preventClose) {
                    shutdownWithAction(function () { return WritableStreamDefaultWriterCloseWithErrorPropagation(writer); });
                }
                else {
                    shutdown();
                }
            });
            // Closing must be propagated backward
            if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === 'closed') {
                var destClosed_1 = new TypeError('the destination writable stream closed before all data could be piped to it');
                if (!preventCancel) {
                    shutdownWithAction(function () { return ReadableStreamCancel(source, destClosed_1); }, true, destClosed_1);
                }
                else {
                    shutdown(true, destClosed_1);
                }
            }
            setPromiseIsHandledToTrue(pipeLoop());
            function waitForWritesToFinish() {
                // Another write may have started while we were waiting on this currentWrite, so we have to be sure to wait
                // for that too.
                var oldCurrentWrite = currentWrite;
                return PerformPromiseThen(currentWrite, function () { return oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : undefined; });
            }
            function isOrBecomesErrored(stream, promise, action) {
                if (stream._state === 'errored') {
                    action(stream._storedError);
                }
                else {
                    uponRejection(promise, action);
                }
            }
            function isOrBecomesClosed(stream, promise, action) {
                if (stream._state === 'closed') {
                    action();
                }
                else {
                    uponFulfillment(promise, action);
                }
            }
            function shutdownWithAction(action, originalIsError, originalError) {
                if (shuttingDown) {
                    return;
                }
                shuttingDown = true;
                if (dest._state === 'writable' && !WritableStreamCloseQueuedOrInFlight(dest)) {
                    uponFulfillment(waitForWritesToFinish(), doTheRest);
                }
                else {
                    doTheRest();
                }
                function doTheRest() {
                    uponPromise(action(), function () { return finalize(originalIsError, originalError); }, function (newError) { return finalize(true, newError); });
                }
            }
            function shutdown(isError, error) {
                if (shuttingDown) {
                    return;
                }
                shuttingDown = true;
                if (dest._state === 'writable' && !WritableStreamCloseQueuedOrInFlight(dest)) {
                    uponFulfillment(waitForWritesToFinish(), function () { return finalize(isError, error); });
                }
                else {
                    finalize(isError, error);
                }
            }
            function finalize(isError, error) {
                WritableStreamDefaultWriterRelease(writer);
                ReadableStreamReaderGenericRelease(reader);
                if (signal !== undefined) {
                    signal.removeEventListener('abort', abortAlgorithm);
                }
                if (isError) {
                    reject(error);
                }
                else {
                    resolve(undefined);
                }
            }
        });
    }

    /**
     * Allows control of a {@link ReadableStream | readable stream}'s state and internal queue.
     *
     * @public
     */
    var ReadableStreamDefaultController = /** @class */ (function () {
        function ReadableStreamDefaultController() {
            throw new TypeError('Illegal constructor');
        }
        Object.defineProperty(ReadableStreamDefaultController.prototype, "desiredSize", {
            /**
             * Returns the desired size to fill the controlled stream's internal queue. It can be negative, if the queue is
             * over-full. An underlying source ought to use this information to determine when and how to apply backpressure.
             */
            get: function () {
                if (!IsReadableStreamDefaultController(this)) {
                    throw defaultControllerBrandCheckException$1('desiredSize');
                }
                return ReadableStreamDefaultControllerGetDesiredSize(this);
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Closes the controlled readable stream. Consumers will still be able to read any previously-enqueued chunks from
         * the stream, but once those are read, the stream will become closed.
         */
        ReadableStreamDefaultController.prototype.close = function () {
            if (!IsReadableStreamDefaultController(this)) {
                throw defaultControllerBrandCheckException$1('close');
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
                throw new TypeError('The stream is not in a state that permits close');
            }
            ReadableStreamDefaultControllerClose(this);
        };
        ReadableStreamDefaultController.prototype.enqueue = function (chunk) {
            if (chunk === void 0) { chunk = undefined; }
            if (!IsReadableStreamDefaultController(this)) {
                throw defaultControllerBrandCheckException$1('enqueue');
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
                throw new TypeError('The stream is not in a state that permits enqueue');
            }
            return ReadableStreamDefaultControllerEnqueue(this, chunk);
        };
        /**
         * Errors the controlled readable stream, making all future interactions with it fail with the given error `e`.
         */
        ReadableStreamDefaultController.prototype.error = function (e) {
            if (e === void 0) { e = undefined; }
            if (!IsReadableStreamDefaultController(this)) {
                throw defaultControllerBrandCheckException$1('error');
            }
            ReadableStreamDefaultControllerError(this, e);
        };
        /** @internal */
        ReadableStreamDefaultController.prototype[CancelSteps] = function (reason) {
            ResetQueue(this);
            var result = this._cancelAlgorithm(reason);
            ReadableStreamDefaultControllerClearAlgorithms(this);
            return result;
        };
        /** @internal */
        ReadableStreamDefaultController.prototype[PullSteps] = function (readRequest) {
            var stream = this._controlledReadableStream;
            if (this._queue.length > 0) {
                var chunk = DequeueValue(this);
                if (this._closeRequested && this._queue.length === 0) {
                    ReadableStreamDefaultControllerClearAlgorithms(this);
                    ReadableStreamClose(stream);
                }
                else {
                    ReadableStreamDefaultControllerCallPullIfNeeded(this);
                }
                readRequest._chunkSteps(chunk);
            }
            else {
                ReadableStreamAddReadRequest(stream, readRequest);
                ReadableStreamDefaultControllerCallPullIfNeeded(this);
            }
        };
        return ReadableStreamDefaultController;
    }());
    Object.defineProperties(ReadableStreamDefaultController.prototype, {
        close: { enumerable: true },
        enqueue: { enumerable: true },
        error: { enumerable: true },
        desiredSize: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(ReadableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: 'ReadableStreamDefaultController',
            configurable: true
        });
    }
    // Abstract operations for the ReadableStreamDefaultController.
    function IsReadableStreamDefaultController(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_controlledReadableStream')) {
            return false;
        }
        return true;
    }
    function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
        var shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
        if (!shouldPull) {
            return;
        }
        if (controller._pulling) {
            controller._pullAgain = true;
            return;
        }
        controller._pulling = true;
        var pullPromise = controller._pullAlgorithm();
        uponPromise(pullPromise, function () {
            controller._pulling = false;
            if (controller._pullAgain) {
                controller._pullAgain = false;
                ReadableStreamDefaultControllerCallPullIfNeeded(controller);
            }
        }, function (e) {
            ReadableStreamDefaultControllerError(controller, e);
        });
    }
    function ReadableStreamDefaultControllerShouldCallPull(controller) {
        var stream = controller._controlledReadableStream;
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return false;
        }
        if (!controller._started) {
            return false;
        }
        if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            return true;
        }
        var desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
        if (desiredSize > 0) {
            return true;
        }
        return false;
    }
    function ReadableStreamDefaultControllerClearAlgorithms(controller) {
        controller._pullAlgorithm = undefined;
        controller._cancelAlgorithm = undefined;
        controller._strategySizeAlgorithm = undefined;
    }
    // A client of ReadableStreamDefaultController may use these functions directly to bypass state check.
    function ReadableStreamDefaultControllerClose(controller) {
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
        }
        var stream = controller._controlledReadableStream;
        controller._closeRequested = true;
        if (controller._queue.length === 0) {
            ReadableStreamDefaultControllerClearAlgorithms(controller);
            ReadableStreamClose(stream);
        }
    }
    function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
        }
        var stream = controller._controlledReadableStream;
        if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            ReadableStreamFulfillReadRequest(stream, chunk, false);
        }
        else {
            var chunkSize = void 0;
            try {
                chunkSize = controller._strategySizeAlgorithm(chunk);
            }
            catch (chunkSizeE) {
                ReadableStreamDefaultControllerError(controller, chunkSizeE);
                throw chunkSizeE;
            }
            try {
                EnqueueValueWithSize(controller, chunk, chunkSize);
            }
            catch (enqueueE) {
                ReadableStreamDefaultControllerError(controller, enqueueE);
                throw enqueueE;
            }
        }
        ReadableStreamDefaultControllerCallPullIfNeeded(controller);
    }
    function ReadableStreamDefaultControllerError(controller, e) {
        var stream = controller._controlledReadableStream;
        if (stream._state !== 'readable') {
            return;
        }
        ResetQueue(controller);
        ReadableStreamDefaultControllerClearAlgorithms(controller);
        ReadableStreamError(stream, e);
    }
    function ReadableStreamDefaultControllerGetDesiredSize(controller) {
        var state = controller._controlledReadableStream._state;
        if (state === 'errored') {
            return null;
        }
        if (state === 'closed') {
            return 0;
        }
        return controller._strategyHWM - controller._queueTotalSize;
    }
    // This is used in the implementation of TransformStream.
    function ReadableStreamDefaultControllerHasBackpressure(controller) {
        if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
            return false;
        }
        return true;
    }
    function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
        var state = controller._controlledReadableStream._state;
        if (!controller._closeRequested && state === 'readable') {
            return true;
        }
        return false;
    }
    function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
        controller._controlledReadableStream = stream;
        controller._queue = undefined;
        controller._queueTotalSize = undefined;
        ResetQueue(controller);
        controller._started = false;
        controller._closeRequested = false;
        controller._pullAgain = false;
        controller._pulling = false;
        controller._strategySizeAlgorithm = sizeAlgorithm;
        controller._strategyHWM = highWaterMark;
        controller._pullAlgorithm = pullAlgorithm;
        controller._cancelAlgorithm = cancelAlgorithm;
        stream._readableStreamController = controller;
        var startResult = startAlgorithm();
        uponPromise(promiseResolvedWith(startResult), function () {
            controller._started = true;
            ReadableStreamDefaultControllerCallPullIfNeeded(controller);
        }, function (r) {
            ReadableStreamDefaultControllerError(controller, r);
        });
    }
    function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
        var controller = Object.create(ReadableStreamDefaultController.prototype);
        var startAlgorithm = function () { return undefined; };
        var pullAlgorithm = function () { return promiseResolvedWith(undefined); };
        var cancelAlgorithm = function () { return promiseResolvedWith(undefined); };
        if (underlyingSource.start !== undefined) {
            startAlgorithm = function () { return underlyingSource.start(controller); };
        }
        if (underlyingSource.pull !== undefined) {
            pullAlgorithm = function () { return underlyingSource.pull(controller); };
        }
        if (underlyingSource.cancel !== undefined) {
            cancelAlgorithm = function (reason) { return underlyingSource.cancel(reason); };
        }
        SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
    }
    // Helper functions for the ReadableStreamDefaultController.
    function defaultControllerBrandCheckException$1(name) {
        return new TypeError("ReadableStreamDefaultController.prototype." + name + " can only be used on a ReadableStreamDefaultController");
    }

    function ReadableStreamTee(stream, cloneForBranch2) {
        var reader = AcquireReadableStreamDefaultReader(stream);
        var reading = false;
        var canceled1 = false;
        var canceled2 = false;
        var reason1;
        var reason2;
        var branch1;
        var branch2;
        var resolveCancelPromise;
        var cancelPromise = newPromise(function (resolve) {
            resolveCancelPromise = resolve;
        });
        function pullAlgorithm() {
            if (reading) {
                return promiseResolvedWith(undefined);
            }
            reading = true;
            var readRequest = {
                _chunkSteps: function (value) {
                    // This needs to be delayed a microtask because it takes at least a microtask to detect errors (using
                    // reader._closedPromise below), and we want errors in stream to error both branches immediately. We cannot let
                    // successful synchronously-available reads get ahead of asynchronously-available errors.
                    queueMicrotask(function () {
                        reading = false;
                        var value1 = value;
                        var value2 = value;
                        // There is no way to access the cloning code right now in the reference implementation.
                        // If we add one then we'll need an implementation for serializable objects.
                        // if (!canceled2 && cloneForBranch2) {
                        //   value2 = StructuredDeserialize(StructuredSerialize(value2));
                        // }
                        if (!canceled1) {
                            ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, value1);
                        }
                        if (!canceled2) {
                            ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, value2);
                        }
                    });
                },
                _closeSteps: function () {
                    reading = false;
                    if (!canceled1) {
                        ReadableStreamDefaultControllerClose(branch1._readableStreamController);
                    }
                    if (!canceled2) {
                        ReadableStreamDefaultControllerClose(branch2._readableStreamController);
                    }
                    if (!canceled1 || !canceled2) {
                        resolveCancelPromise(undefined);
                    }
                },
                _errorSteps: function () {
                    reading = false;
                }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promiseResolvedWith(undefined);
        }
        function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
                var compositeReason = CreateArrayFromList([reason1, reason2]);
                var cancelResult = ReadableStreamCancel(stream, compositeReason);
                resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
        }
        function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
                var compositeReason = CreateArrayFromList([reason1, reason2]);
                var cancelResult = ReadableStreamCancel(stream, compositeReason);
                resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
        }
        function startAlgorithm() {
            // do nothing
        }
        branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
        branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
        uponRejection(reader._closedPromise, function (r) {
            ReadableStreamDefaultControllerError(branch1._readableStreamController, r);
            ReadableStreamDefaultControllerError(branch2._readableStreamController, r);
            if (!canceled1 || !canceled2) {
                resolveCancelPromise(undefined);
            }
        });
        return [branch1, branch2];
    }

    function convertUnderlyingDefaultOrByteSource(source, context) {
        assertDictionary(source, context);
        var original = source;
        var autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
        var cancel = original === null || original === void 0 ? void 0 : original.cancel;
        var pull = original === null || original === void 0 ? void 0 : original.pull;
        var start = original === null || original === void 0 ? void 0 : original.start;
        var type = original === null || original === void 0 ? void 0 : original.type;
        return {
            autoAllocateChunkSize: autoAllocateChunkSize === undefined ?
                undefined :
                convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, context + " has member 'autoAllocateChunkSize' that"),
            cancel: cancel === undefined ?
                undefined :
                convertUnderlyingSourceCancelCallback(cancel, original, context + " has member 'cancel' that"),
            pull: pull === undefined ?
                undefined :
                convertUnderlyingSourcePullCallback(pull, original, context + " has member 'pull' that"),
            start: start === undefined ?
                undefined :
                convertUnderlyingSourceStartCallback(start, original, context + " has member 'start' that"),
            type: type === undefined ? undefined : convertReadableStreamType(type, context + " has member 'type' that")
        };
    }
    function convertUnderlyingSourceCancelCallback(fn, original, context) {
        assertFunction(fn, context);
        return function (reason) { return promiseCall(fn, original, [reason]); };
    }
    function convertUnderlyingSourcePullCallback(fn, original, context) {
        assertFunction(fn, context);
        return function (controller) { return promiseCall(fn, original, [controller]); };
    }
    function convertUnderlyingSourceStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return function (controller) { return reflectCall(fn, original, [controller]); };
    }
    function convertReadableStreamType(type, context) {
        type = "" + type;
        if (type !== 'bytes') {
            throw new TypeError(context + " '" + type + "' is not a valid enumeration value for ReadableStreamType");
        }
        return type;
    }

    function convertReaderOptions(options, context) {
        assertDictionary(options, context);
        var mode = options === null || options === void 0 ? void 0 : options.mode;
        return {
            mode: mode === undefined ? undefined : convertReadableStreamReaderMode(mode, context + " has member 'mode' that")
        };
    }
    function convertReadableStreamReaderMode(mode, context) {
        mode = "" + mode;
        if (mode !== 'byob') {
            throw new TypeError(context + " '" + mode + "' is not a valid enumeration value for ReadableStreamReaderMode");
        }
        return mode;
    }

    function convertIteratorOptions(options, context) {
        assertDictionary(options, context);
        var preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
        return { preventCancel: Boolean(preventCancel) };
    }

    function convertPipeOptions(options, context) {
        assertDictionary(options, context);
        var preventAbort = options === null || options === void 0 ? void 0 : options.preventAbort;
        var preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
        var preventClose = options === null || options === void 0 ? void 0 : options.preventClose;
        var signal = options === null || options === void 0 ? void 0 : options.signal;
        if (signal !== undefined) {
            assertAbortSignal(signal, context + " has member 'signal' that");
        }
        return {
            preventAbort: Boolean(preventAbort),
            preventCancel: Boolean(preventCancel),
            preventClose: Boolean(preventClose),
            signal: signal
        };
    }
    function assertAbortSignal(signal, context) {
        if (!isAbortSignal(signal)) {
            throw new TypeError(context + " is not an AbortSignal.");
        }
    }

    function convertReadableWritablePair(pair, context) {
        assertDictionary(pair, context);
        var readable = pair === null || pair === void 0 ? void 0 : pair.readable;
        assertRequiredField(readable, 'readable', 'ReadableWritablePair');
        assertReadableStream(readable, context + " has member 'readable' that");
        var writable = pair === null || pair === void 0 ? void 0 : pair.writable;
        assertRequiredField(writable, 'writable', 'ReadableWritablePair');
        assertWritableStream(writable, context + " has member 'writable' that");
        return { readable: readable, writable: writable };
    }

    /**
     * A readable stream represents a source of data, from which you can read.
     *
     * @public
     */
    var ReadableStream = /** @class */ (function () {
        function ReadableStream(rawUnderlyingSource, rawStrategy) {
            if (rawUnderlyingSource === void 0) { rawUnderlyingSource = {}; }
            if (rawStrategy === void 0) { rawStrategy = {}; }
            if (rawUnderlyingSource === undefined) {
                rawUnderlyingSource = null;
            }
            else {
                assertObject(rawUnderlyingSource, 'First parameter');
            }
            var strategy = convertQueuingStrategy(rawStrategy, 'Second parameter');
            var underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, 'First parameter');
            InitializeReadableStream(this);
            if (underlyingSource.type === 'bytes') {
                if (strategy.size !== undefined) {
                    throw new RangeError('The strategy for a byte stream cannot have a size function');
                }
                var highWaterMark = ExtractHighWaterMark(strategy, 0);
                SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
            }
            else {
                var sizeAlgorithm = ExtractSizeAlgorithm(strategy);
                var highWaterMark = ExtractHighWaterMark(strategy, 1);
                SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
            }
        }
        Object.defineProperty(ReadableStream.prototype, "locked", {
            /**
             * Whether or not the readable stream is locked to a {@link ReadableStreamDefaultReader | reader}.
             */
            get: function () {
                if (!IsReadableStream(this)) {
                    throw streamBrandCheckException$1('locked');
                }
                return IsReadableStreamLocked(this);
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Cancels the stream, signaling a loss of interest in the stream by a consumer.
         *
         * The supplied `reason` argument will be given to the underlying source's {@link UnderlyingSource.cancel | cancel()}
         * method, which might or might not use it.
         */
        ReadableStream.prototype.cancel = function (reason) {
            if (reason === void 0) { reason = undefined; }
            if (!IsReadableStream(this)) {
                return promiseRejectedWith(streamBrandCheckException$1('cancel'));
            }
            if (IsReadableStreamLocked(this)) {
                return promiseRejectedWith(new TypeError('Cannot cancel a stream that already has a reader'));
            }
            return ReadableStreamCancel(this, reason);
        };
        ReadableStream.prototype.getReader = function (rawOptions) {
            if (rawOptions === void 0) { rawOptions = undefined; }
            if (!IsReadableStream(this)) {
                throw streamBrandCheckException$1('getReader');
            }
            var options = convertReaderOptions(rawOptions, 'First parameter');
            if (options.mode === undefined) {
                return AcquireReadableStreamDefaultReader(this);
            }
            return AcquireReadableStreamBYOBReader(this);
        };
        ReadableStream.prototype.pipeThrough = function (rawTransform, rawOptions) {
            if (rawOptions === void 0) { rawOptions = {}; }
            if (!IsReadableStream(this)) {
                throw streamBrandCheckException$1('pipeThrough');
            }
            assertRequiredArgument(rawTransform, 1, 'pipeThrough');
            var transform = convertReadableWritablePair(rawTransform, 'First parameter');
            var options = convertPipeOptions(rawOptions, 'Second parameter');
            if (IsReadableStreamLocked(this)) {
                throw new TypeError('ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream');
            }
            if (IsWritableStreamLocked(transform.writable)) {
                throw new TypeError('ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream');
            }
            var promise = ReadableStreamPipeTo(this, transform.writable, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
            setPromiseIsHandledToTrue(promise);
            return transform.readable;
        };
        ReadableStream.prototype.pipeTo = function (destination, rawOptions) {
            if (rawOptions === void 0) { rawOptions = {}; }
            if (!IsReadableStream(this)) {
                return promiseRejectedWith(streamBrandCheckException$1('pipeTo'));
            }
            if (destination === undefined) {
                return promiseRejectedWith("Parameter 1 is required in 'pipeTo'.");
            }
            if (!IsWritableStream(destination)) {
                return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo's first argument must be a WritableStream"));
            }
            var options;
            try {
                options = convertPipeOptions(rawOptions, 'Second parameter');
            }
            catch (e) {
                return promiseRejectedWith(e);
            }
            if (IsReadableStreamLocked(this)) {
                return promiseRejectedWith(new TypeError('ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream'));
            }
            if (IsWritableStreamLocked(destination)) {
                return promiseRejectedWith(new TypeError('ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream'));
            }
            return ReadableStreamPipeTo(this, destination, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
        };
        /**
         * Tees this readable stream, returning a two-element array containing the two resulting branches as
         * new {@link ReadableStream} instances.
         *
         * Teeing a stream will lock it, preventing any other consumer from acquiring a reader.
         * To cancel the stream, cancel both of the resulting branches; a composite cancellation reason will then be
         * propagated to the stream's underlying source.
         *
         * Note that the chunks seen in each branch will be the same object. If the chunks are not immutable,
         * this could allow interference between the two branches.
         */
        ReadableStream.prototype.tee = function () {
            if (!IsReadableStream(this)) {
                throw streamBrandCheckException$1('tee');
            }
            var branches = ReadableStreamTee(this);
            return CreateArrayFromList(branches);
        };
        ReadableStream.prototype.values = function (rawOptions) {
            if (rawOptions === void 0) { rawOptions = undefined; }
            if (!IsReadableStream(this)) {
                throw streamBrandCheckException$1('values');
            }
            var options = convertIteratorOptions(rawOptions, 'First parameter');
            return AcquireReadableStreamAsyncIterator(this, options.preventCancel);
        };
        return ReadableStream;
    }());
    Object.defineProperties(ReadableStream.prototype, {
        cancel: { enumerable: true },
        getReader: { enumerable: true },
        pipeThrough: { enumerable: true },
        pipeTo: { enumerable: true },
        tee: { enumerable: true },
        values: { enumerable: true },
        locked: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(ReadableStream.prototype, SymbolPolyfill.toStringTag, {
            value: 'ReadableStream',
            configurable: true
        });
    }
    if (typeof SymbolPolyfill.asyncIterator === 'symbol') {
        Object.defineProperty(ReadableStream.prototype, SymbolPolyfill.asyncIterator, {
            value: ReadableStream.prototype.values,
            writable: true,
            configurable: true
        });
    }
    // Abstract operations for the ReadableStream.
    // Throws if and only if startAlgorithm throws.
    function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
        if (highWaterMark === void 0) { highWaterMark = 1; }
        if (sizeAlgorithm === void 0) { sizeAlgorithm = function () { return 1; }; }
        var stream = Object.create(ReadableStream.prototype);
        InitializeReadableStream(stream);
        var controller = Object.create(ReadableStreamDefaultController.prototype);
        SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
        return stream;
    }
    function InitializeReadableStream(stream) {
        stream._state = 'readable';
        stream._reader = undefined;
        stream._storedError = undefined;
        stream._disturbed = false;
    }
    function IsReadableStream(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_readableStreamController')) {
            return false;
        }
        return true;
    }
    function IsReadableStreamLocked(stream) {
        if (stream._reader === undefined) {
            return false;
        }
        return true;
    }
    // ReadableStream API exposed for controllers.
    function ReadableStreamCancel(stream, reason) {
        stream._disturbed = true;
        if (stream._state === 'closed') {
            return promiseResolvedWith(undefined);
        }
        if (stream._state === 'errored') {
            return promiseRejectedWith(stream._storedError);
        }
        ReadableStreamClose(stream);
        var sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
        return transformPromiseWith(sourceCancelPromise, noop);
    }
    function ReadableStreamClose(stream) {
        stream._state = 'closed';
        var reader = stream._reader;
        if (reader === undefined) {
            return;
        }
        defaultReaderClosedPromiseResolve(reader);
        if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach(function (readRequest) {
                readRequest._closeSteps();
            });
            reader._readRequests = new SimpleQueue();
        }
    }
    function ReadableStreamError(stream, e) {
        stream._state = 'errored';
        stream._storedError = e;
        var reader = stream._reader;
        if (reader === undefined) {
            return;
        }
        defaultReaderClosedPromiseReject(reader, e);
        if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach(function (readRequest) {
                readRequest._errorSteps(e);
            });
            reader._readRequests = new SimpleQueue();
        }
        else {
            reader._readIntoRequests.forEach(function (readIntoRequest) {
                readIntoRequest._errorSteps(e);
            });
            reader._readIntoRequests = new SimpleQueue();
        }
    }
    // Helper functions for the ReadableStream.
    function streamBrandCheckException$1(name) {
        return new TypeError("ReadableStream.prototype." + name + " can only be used on a ReadableStream");
    }

    function convertQueuingStrategyInit(init, context) {
        assertDictionary(init, context);
        var highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
        assertRequiredField(highWaterMark, 'highWaterMark', 'QueuingStrategyInit');
        return {
            highWaterMark: convertUnrestrictedDouble(highWaterMark)
        };
    }

    var byteLengthSizeFunction = function size(chunk) {
        return chunk.byteLength;
    };
    /**
     * A queuing strategy that counts the number of bytes in each chunk.
     *
     * @public
     */
    var ByteLengthQueuingStrategy = /** @class */ (function () {
        function ByteLengthQueuingStrategy(options) {
            assertRequiredArgument(options, 1, 'ByteLengthQueuingStrategy');
            options = convertQueuingStrategyInit(options, 'First parameter');
            this._byteLengthQueuingStrategyHighWaterMark = options.highWaterMark;
        }
        Object.defineProperty(ByteLengthQueuingStrategy.prototype, "highWaterMark", {
            /**
             * Returns the high water mark provided to the constructor.
             */
            get: function () {
                if (!IsByteLengthQueuingStrategy(this)) {
                    throw byteLengthBrandCheckException('highWaterMark');
                }
                return this._byteLengthQueuingStrategyHighWaterMark;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ByteLengthQueuingStrategy.prototype, "size", {
            /**
             * Measures the size of `chunk` by returning the value of its `byteLength` property.
             */
            get: function () {
                if (!IsByteLengthQueuingStrategy(this)) {
                    throw byteLengthBrandCheckException('size');
                }
                return byteLengthSizeFunction;
            },
            enumerable: false,
            configurable: true
        });
        return ByteLengthQueuingStrategy;
    }());
    Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
        highWaterMark: { enumerable: true },
        size: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(ByteLengthQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: 'ByteLengthQueuingStrategy',
            configurable: true
        });
    }
    // Helper functions for the ByteLengthQueuingStrategy.
    function byteLengthBrandCheckException(name) {
        return new TypeError("ByteLengthQueuingStrategy.prototype." + name + " can only be used on a ByteLengthQueuingStrategy");
    }
    function IsByteLengthQueuingStrategy(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_byteLengthQueuingStrategyHighWaterMark')) {
            return false;
        }
        return true;
    }

    var countSizeFunction = function size() {
        return 1;
    };
    /**
     * A queuing strategy that counts the number of chunks.
     *
     * @public
     */
    var CountQueuingStrategy = /** @class */ (function () {
        function CountQueuingStrategy(options) {
            assertRequiredArgument(options, 1, 'CountQueuingStrategy');
            options = convertQueuingStrategyInit(options, 'First parameter');
            this._countQueuingStrategyHighWaterMark = options.highWaterMark;
        }
        Object.defineProperty(CountQueuingStrategy.prototype, "highWaterMark", {
            /**
             * Returns the high water mark provided to the constructor.
             */
            get: function () {
                if (!IsCountQueuingStrategy(this)) {
                    throw countBrandCheckException('highWaterMark');
                }
                return this._countQueuingStrategyHighWaterMark;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CountQueuingStrategy.prototype, "size", {
            /**
             * Measures the size of `chunk` by always returning 1.
             * This ensures that the total queue size is a count of the number of chunks in the queue.
             */
            get: function () {
                if (!IsCountQueuingStrategy(this)) {
                    throw countBrandCheckException('size');
                }
                return countSizeFunction;
            },
            enumerable: false,
            configurable: true
        });
        return CountQueuingStrategy;
    }());
    Object.defineProperties(CountQueuingStrategy.prototype, {
        highWaterMark: { enumerable: true },
        size: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(CountQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: 'CountQueuingStrategy',
            configurable: true
        });
    }
    // Helper functions for the CountQueuingStrategy.
    function countBrandCheckException(name) {
        return new TypeError("CountQueuingStrategy.prototype." + name + " can only be used on a CountQueuingStrategy");
    }
    function IsCountQueuingStrategy(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_countQueuingStrategyHighWaterMark')) {
            return false;
        }
        return true;
    }

    function convertTransformer(original, context) {
        assertDictionary(original, context);
        var flush = original === null || original === void 0 ? void 0 : original.flush;
        var readableType = original === null || original === void 0 ? void 0 : original.readableType;
        var start = original === null || original === void 0 ? void 0 : original.start;
        var transform = original === null || original === void 0 ? void 0 : original.transform;
        var writableType = original === null || original === void 0 ? void 0 : original.writableType;
        return {
            flush: flush === undefined ?
                undefined :
                convertTransformerFlushCallback(flush, original, context + " has member 'flush' that"),
            readableType: readableType,
            start: start === undefined ?
                undefined :
                convertTransformerStartCallback(start, original, context + " has member 'start' that"),
            transform: transform === undefined ?
                undefined :
                convertTransformerTransformCallback(transform, original, context + " has member 'transform' that"),
            writableType: writableType
        };
    }
    function convertTransformerFlushCallback(fn, original, context) {
        assertFunction(fn, context);
        return function (controller) { return promiseCall(fn, original, [controller]); };
    }
    function convertTransformerStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return function (controller) { return reflectCall(fn, original, [controller]); };
    }
    function convertTransformerTransformCallback(fn, original, context) {
        assertFunction(fn, context);
        return function (chunk, controller) { return promiseCall(fn, original, [chunk, controller]); };
    }

    // Class TransformStream
    /**
     * A transform stream consists of a pair of streams: a {@link WritableStream | writable stream},
     * known as its writable side, and a {@link ReadableStream | readable stream}, known as its readable side.
     * In a manner specific to the transform stream in question, writes to the writable side result in new data being
     * made available for reading from the readable side.
     *
     * @public
     */
    var TransformStream = /** @class */ (function () {
        function TransformStream(rawTransformer, rawWritableStrategy, rawReadableStrategy) {
            if (rawTransformer === void 0) { rawTransformer = {}; }
            if (rawWritableStrategy === void 0) { rawWritableStrategy = {}; }
            if (rawReadableStrategy === void 0) { rawReadableStrategy = {}; }
            if (rawTransformer === undefined) {
                rawTransformer = null;
            }
            var writableStrategy = convertQueuingStrategy(rawWritableStrategy, 'Second parameter');
            var readableStrategy = convertQueuingStrategy(rawReadableStrategy, 'Third parameter');
            var transformer = convertTransformer(rawTransformer, 'First parameter');
            if (transformer.readableType !== undefined) {
                throw new RangeError('Invalid readableType specified');
            }
            if (transformer.writableType !== undefined) {
                throw new RangeError('Invalid writableType specified');
            }
            var readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
            var readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
            var writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
            var writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
            var startPromise_resolve;
            var startPromise = newPromise(function (resolve) {
                startPromise_resolve = resolve;
            });
            InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
            SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
            if (transformer.start !== undefined) {
                startPromise_resolve(transformer.start(this._transformStreamController));
            }
            else {
                startPromise_resolve(undefined);
            }
        }
        Object.defineProperty(TransformStream.prototype, "readable", {
            /**
             * The readable side of the transform stream.
             */
            get: function () {
                if (!IsTransformStream(this)) {
                    throw streamBrandCheckException('readable');
                }
                return this._readable;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TransformStream.prototype, "writable", {
            /**
             * The writable side of the transform stream.
             */
            get: function () {
                if (!IsTransformStream(this)) {
                    throw streamBrandCheckException('writable');
                }
                return this._writable;
            },
            enumerable: false,
            configurable: true
        });
        return TransformStream;
    }());
    Object.defineProperties(TransformStream.prototype, {
        readable: { enumerable: true },
        writable: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(TransformStream.prototype, SymbolPolyfill.toStringTag, {
            value: 'TransformStream',
            configurable: true
        });
    }
    function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
        function startAlgorithm() {
            return startPromise;
        }
        function writeAlgorithm(chunk) {
            return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
        }
        function abortAlgorithm(reason) {
            return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
        }
        function closeAlgorithm() {
            return TransformStreamDefaultSinkCloseAlgorithm(stream);
        }
        stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
        function pullAlgorithm() {
            return TransformStreamDefaultSourcePullAlgorithm(stream);
        }
        function cancelAlgorithm(reason) {
            TransformStreamErrorWritableAndUnblockWrite(stream, reason);
            return promiseResolvedWith(undefined);
        }
        stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
        // The [[backpressure]] slot is set to undefined so that it can be initialised by TransformStreamSetBackpressure.
        stream._backpressure = undefined;
        stream._backpressureChangePromise = undefined;
        stream._backpressureChangePromise_resolve = undefined;
        TransformStreamSetBackpressure(stream, true);
        stream._transformStreamController = undefined;
    }
    function IsTransformStream(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_transformStreamController')) {
            return false;
        }
        return true;
    }
    // This is a no-op if both sides are already errored.
    function TransformStreamError(stream, e) {
        ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e);
        TransformStreamErrorWritableAndUnblockWrite(stream, e);
    }
    function TransformStreamErrorWritableAndUnblockWrite(stream, e) {
        TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
        WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e);
        if (stream._backpressure) {
            // Pretend that pull() was called to permit any pending write() calls to complete. TransformStreamSetBackpressure()
            // cannot be called from enqueue() or pull() once the ReadableStream is errored, so this will will be the final time
            // _backpressure is set.
            TransformStreamSetBackpressure(stream, false);
        }
    }
    function TransformStreamSetBackpressure(stream, backpressure) {
        // Passes also when called during construction.
        if (stream._backpressureChangePromise !== undefined) {
            stream._backpressureChangePromise_resolve();
        }
        stream._backpressureChangePromise = newPromise(function (resolve) {
            stream._backpressureChangePromise_resolve = resolve;
        });
        stream._backpressure = backpressure;
    }
    // Class TransformStreamDefaultController
    /**
     * Allows control of the {@link ReadableStream} and {@link WritableStream} of the associated {@link TransformStream}.
     *
     * @public
     */
    var TransformStreamDefaultController = /** @class */ (function () {
        function TransformStreamDefaultController() {
            throw new TypeError('Illegal constructor');
        }
        Object.defineProperty(TransformStreamDefaultController.prototype, "desiredSize", {
            /**
             * Returns the desired size to fill the readable side’s internal queue. It can be negative, if the queue is over-full.
             */
            get: function () {
                if (!IsTransformStreamDefaultController(this)) {
                    throw defaultControllerBrandCheckException('desiredSize');
                }
                var readableController = this._controlledTransformStream._readable._readableStreamController;
                return ReadableStreamDefaultControllerGetDesiredSize(readableController);
            },
            enumerable: false,
            configurable: true
        });
        TransformStreamDefaultController.prototype.enqueue = function (chunk) {
            if (chunk === void 0) { chunk = undefined; }
            if (!IsTransformStreamDefaultController(this)) {
                throw defaultControllerBrandCheckException('enqueue');
            }
            TransformStreamDefaultControllerEnqueue(this, chunk);
        };
        /**
         * Errors both the readable side and the writable side of the controlled transform stream, making all future
         * interactions with it fail with the given error `e`. Any chunks queued for transformation will be discarded.
         */
        TransformStreamDefaultController.prototype.error = function (reason) {
            if (reason === void 0) { reason = undefined; }
            if (!IsTransformStreamDefaultController(this)) {
                throw defaultControllerBrandCheckException('error');
            }
            TransformStreamDefaultControllerError(this, reason);
        };
        /**
         * Closes the readable side and errors the writable side of the controlled transform stream. This is useful when the
         * transformer only needs to consume a portion of the chunks written to the writable side.
         */
        TransformStreamDefaultController.prototype.terminate = function () {
            if (!IsTransformStreamDefaultController(this)) {
                throw defaultControllerBrandCheckException('terminate');
            }
            TransformStreamDefaultControllerTerminate(this);
        };
        return TransformStreamDefaultController;
    }());
    Object.defineProperties(TransformStreamDefaultController.prototype, {
        enqueue: { enumerable: true },
        error: { enumerable: true },
        terminate: { enumerable: true },
        desiredSize: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(TransformStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: 'TransformStreamDefaultController',
            configurable: true
        });
    }
    // Transform Stream Default Controller Abstract Operations
    function IsTransformStreamDefaultController(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_controlledTransformStream')) {
            return false;
        }
        return true;
    }
    function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm) {
        controller._controlledTransformStream = stream;
        stream._transformStreamController = controller;
        controller._transformAlgorithm = transformAlgorithm;
        controller._flushAlgorithm = flushAlgorithm;
    }
    function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
        var controller = Object.create(TransformStreamDefaultController.prototype);
        var transformAlgorithm = function (chunk) {
            try {
                TransformStreamDefaultControllerEnqueue(controller, chunk);
                return promiseResolvedWith(undefined);
            }
            catch (transformResultE) {
                return promiseRejectedWith(transformResultE);
            }
        };
        var flushAlgorithm = function () { return promiseResolvedWith(undefined); };
        if (transformer.transform !== undefined) {
            transformAlgorithm = function (chunk) { return transformer.transform(chunk, controller); };
        }
        if (transformer.flush !== undefined) {
            flushAlgorithm = function () { return transformer.flush(controller); };
        }
        SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);
    }
    function TransformStreamDefaultControllerClearAlgorithms(controller) {
        controller._transformAlgorithm = undefined;
        controller._flushAlgorithm = undefined;
    }
    function TransformStreamDefaultControllerEnqueue(controller, chunk) {
        var stream = controller._controlledTransformStream;
        var readableController = stream._readable._readableStreamController;
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
            throw new TypeError('Readable side is not in a state that permits enqueue');
        }
        // We throttle transform invocations based on the backpressure of the ReadableStream, but we still
        // accept TransformStreamDefaultControllerEnqueue() calls.
        try {
            ReadableStreamDefaultControllerEnqueue(readableController, chunk);
        }
        catch (e) {
            // This happens when readableStrategy.size() throws.
            TransformStreamErrorWritableAndUnblockWrite(stream, e);
            throw stream._readable._storedError;
        }
        var backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
        if (backpressure !== stream._backpressure) {
            TransformStreamSetBackpressure(stream, true);
        }
    }
    function TransformStreamDefaultControllerError(controller, e) {
        TransformStreamError(controller._controlledTransformStream, e);
    }
    function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
        var transformPromise = controller._transformAlgorithm(chunk);
        return transformPromiseWith(transformPromise, undefined, function (r) {
            TransformStreamError(controller._controlledTransformStream, r);
            throw r;
        });
    }
    function TransformStreamDefaultControllerTerminate(controller) {
        var stream = controller._controlledTransformStream;
        var readableController = stream._readable._readableStreamController;
        ReadableStreamDefaultControllerClose(readableController);
        var error = new TypeError('TransformStream terminated');
        TransformStreamErrorWritableAndUnblockWrite(stream, error);
    }
    // TransformStreamDefaultSink Algorithms
    function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
        var controller = stream._transformStreamController;
        if (stream._backpressure) {
            var backpressureChangePromise = stream._backpressureChangePromise;
            return transformPromiseWith(backpressureChangePromise, function () {
                var writable = stream._writable;
                var state = writable._state;
                if (state === 'erroring') {
                    throw writable._storedError;
                }
                return TransformStreamDefaultControllerPerformTransform(controller, chunk);
            });
        }
        return TransformStreamDefaultControllerPerformTransform(controller, chunk);
    }
    function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
        // abort() is not called synchronously, so it is possible for abort() to be called when the stream is already
        // errored.
        TransformStreamError(stream, reason);
        return promiseResolvedWith(undefined);
    }
    function TransformStreamDefaultSinkCloseAlgorithm(stream) {
        // stream._readable cannot change after construction, so caching it across a call to user code is safe.
        var readable = stream._readable;
        var controller = stream._transformStreamController;
        var flushPromise = controller._flushAlgorithm();
        TransformStreamDefaultControllerClearAlgorithms(controller);
        // Return a promise that is fulfilled with undefined on success.
        return transformPromiseWith(flushPromise, function () {
            if (readable._state === 'errored') {
                throw readable._storedError;
            }
            ReadableStreamDefaultControllerClose(readable._readableStreamController);
        }, function (r) {
            TransformStreamError(stream, r);
            throw readable._storedError;
        });
    }
    // TransformStreamDefaultSource Algorithms
    function TransformStreamDefaultSourcePullAlgorithm(stream) {
        // Invariant. Enforced by the promises returned by start() and pull().
        TransformStreamSetBackpressure(stream, false);
        // Prevent the next pull() call until there is backpressure.
        return stream._backpressureChangePromise;
    }
    // Helper functions for the TransformStreamDefaultController.
    function defaultControllerBrandCheckException(name) {
        return new TypeError("TransformStreamDefaultController.prototype." + name + " can only be used on a TransformStreamDefaultController");
    }
    // Helper functions for the TransformStream.
    function streamBrandCheckException(name) {
        return new TypeError("TransformStream.prototype." + name + " can only be used on a TransformStream");
    }

    var exports$1 = {
        ReadableStream: ReadableStream,
        ReadableStreamDefaultController: ReadableStreamDefaultController,
        ReadableByteStreamController: ReadableByteStreamController,
        ReadableStreamBYOBRequest: ReadableStreamBYOBRequest,
        ReadableStreamDefaultReader: ReadableStreamDefaultReader,
        ReadableStreamBYOBReader: ReadableStreamBYOBReader,
        WritableStream: WritableStream,
        WritableStreamDefaultController: WritableStreamDefaultController,
        WritableStreamDefaultWriter: WritableStreamDefaultWriter,
        ByteLengthQueuingStrategy: ByteLengthQueuingStrategy,
        CountQueuingStrategy: CountQueuingStrategy,
        TransformStream: TransformStream,
        TransformStreamDefaultController: TransformStreamDefaultController
    };
    // Add classes to global scope
    if (typeof globals !== 'undefined') {
        for (var prop in exports$1) {
            if (Object.prototype.hasOwnProperty.call(exports$1, prop)) {
                Object.defineProperty(globals, prop, {
                    value: exports$1[prop],
                    writable: true,
                    configurable: true
                });
            }
        }
    }

    exports.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
    exports.CountQueuingStrategy = CountQueuingStrategy;
    exports.ReadableByteStreamController = ReadableByteStreamController;
    exports.ReadableStream = ReadableStream;
    exports.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
    exports.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
    exports.ReadableStreamDefaultController = ReadableStreamDefaultController;
    exports.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
    exports.TransformStream = TransformStream;
    exports.TransformStreamDefaultController = TransformStreamDefaultController;
    exports.WritableStream = WritableStream;
    exports.WritableStreamDefaultController = WritableStreamDefaultController;
    exports.WritableStreamDefaultWriter = WritableStreamDefaultWriter;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=polyfill.js.map


/***/ }),

/***/ 9641:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var Path = __nccwpck_require__(5622);
var fs = __nccwpck_require__(5747);
var glob = __nccwpck_require__(402);
var errCode = __nccwpck_require__(2997);

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Path__default = /*#__PURE__*/_interopDefaultLegacy(Path);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var glob__default = /*#__PURE__*/_interopDefaultLegacy(glob);
var errCode__default = /*#__PURE__*/_interopDefaultLegacy(errCode);

async function getFilesFromPath(paths, options) {
  const files = [];
  for await (const file of filesFromPath(paths, options)) {
    files.push(file);
  }
  return files;
}
async function* filesFromPath(paths, options) {
  options = options || {};
  if (typeof paths === 'string') {
    paths = [paths];
  }
  const globSourceOptions = {
    recursive: true,
    glob: {
      dot: Boolean(options.hidden),
      ignore: Array.isArray(options.ignore) ? options.ignore : [],
      follow: options.followSymlinks != null ? options.followSymlinks : true
    }
  };
  for await (const path of paths) {
    if (typeof path !== 'string') {
      throw errCode__default['default'](new Error('Path must be a string'), 'ERR_INVALID_PATH', { path });
    }
    const absolutePath = Path__default['default'].resolve(process.cwd(), path);
    const stat = await fs.promises.stat(absolutePath);
    const prefix = Path__default['default'].dirname(absolutePath);
    let mode = options.mode;
    if (options.preserveMode) {
      mode = stat.mode;
    }
    let mtime = options.mtime;
    if (options.preserveMtime) {
      mtime = stat.mtime;
    }
    yield* toGlobSource({
      path,
      type: stat.isDirectory() ? 'dir' : 'file',
      prefix,
      mode,
      mtime,
      size: stat.size,
      preserveMode: options.preserveMode,
      preserveMtime: options.preserveMtime
    }, globSourceOptions);
  }
}
async function* toGlobSource({path, type, prefix, mode, mtime, size, preserveMode, preserveMtime}, options) {
  options = options || {};
  const baseName = Path__default['default'].basename(path);
  if (type === 'file') {
    yield {
      name: `/${ baseName.replace(prefix, '') }`,
      stream: () => fs__default['default'].createReadStream(Path__default['default'].isAbsolute(path) ? path : Path__default['default'].join(process.cwd(), path)),
      mode,
      mtime,
      size
    };
    return;
  }
  const globOptions = Object.assign({}, options.glob, {
    cwd: path,
    nodir: false,
    realpath: false,
    absolute: true
  });
  for await (const p of glob__default['default'](path, '**/*', globOptions)) {
    const stat = await fs.promises.stat(p);
    if (!stat.isFile()) {
      continue;
    }
    if (preserveMode || preserveMtime) {
      if (preserveMode) {
        mode = stat.mode;
      }
      if (preserveMtime) {
        mtime = stat.mtime;
      }
    }
    yield {
      name: toPosix(p.replace(prefix, '')),
      stream: () => fs__default['default'].createReadStream(p),
      mode,
      mtime,
      size: stat.size
    };
  }
}
const toPosix = path => path.replace(/\\/g, '/');

exports.filesFromPath = filesFromPath;
exports.getFilesFromPath = getFilesFromPath;


/***/ }),

/***/ 7649:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { getFilesFromPath } = __nccwpck_require__(5090)
const { Web3Storage } = __nccwpck_require__(8100)

async function addToWeb3 ({ endpoint, token, pathToAdd, name, wrapWithDirectory = false }) {
  const web3 = new Web3Storage({ endpoint, token })
  const files = await getFilesFromPath(`${pathToAdd}`)
  const cid = await web3.put(files, { name, wrapWithDirectory })
  const url = `https://dweb.link/ipfs/${cid}`
  return { cid, url }
}

function pickName ({ repo, run, sha }) {
  return `${repo.replace('/', '-')}-${run}-${sha.substring(0, 8)}`
}

module.exports.addToWeb3 = addToWeb3
module.exports.pickName = pickName


/***/ }),

/***/ 5343:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var _package = __nccwpck_require__(5711);
var webEncoding = __nccwpck_require__(1430);

/**
 * @implements {globalThis.Blob}
 */
const WebBlob = class Blob {
  /**
   * @param {BlobPart[]} [init]
   * @param {BlobPropertyBag} [options]
   */
  constructor(init = [], options = {}) {
    /** @type {Uint8Array[]} */
    const parts = [];

    let size = 0;
    for (const part of init) {
      if (typeof part === "string") {
        const bytes = new webEncoding.TextEncoder().encode(part);
        parts.push(bytes);
        size += bytes.byteLength;
      } else if (part instanceof WebBlob) {
        size += part.size;
        // @ts-ignore - `_parts` is marked private so TS will complain about
        // accessing it.
        parts.push(...part._parts);
      } else if (part instanceof ArrayBuffer) {
        parts.push(new Uint8Array(part));
        size += part.byteLength;
      } else if (part instanceof Uint8Array) {
        parts.push(part);
        size += part.byteLength;
      } else if (ArrayBuffer.isView(part)) {
        const { buffer, byteOffset, byteLength } = part;
        parts.push(new Uint8Array(buffer, byteOffset, byteLength));
        size += byteLength;
      } else {
        const bytes = new webEncoding.TextEncoder().encode(String(part));
        parts.push(bytes);
        size += bytes.byteLength;
      }
    }

    /** @private */
    this._size = size;
    /** @private */
    this._type = readType(options.type);
    /** @private */
    this._parts = parts;

    Object.defineProperties(this, {
      _size: { enumerable: false },
      _type: { enumerable: false },
      _parts: { enumerable: false }
    });
  }

  /**
   * A string indicating the MIME type of the data contained in the Blob.
   * If the type is unknown, this string is empty.
   * @type {string}
   */
  get type() {
    return this._type
  }
  /**
   * The size, in bytes, of the data contained in the Blob object.
   * @type {number}
   */
  get size() {
    return this._size
  }

  /**
   * Returns a new Blob object containing the data in the specified range of
   * bytes of the blob on which it's called.
   * @param {number} [start=0] - An index into the Blob indicating the first
   * byte to include in the new Blob. If you specify a negative value, it's
   * treated as an offset from the end of the Blob toward the beginning. For
   * example, `-10` would be the 10th from last byte in the Blob. The default
   * value is `0`. If you specify a value for start that is larger than the
   * size of the source Blob, the returned Blob has size 0 and contains no
   * data.
   * @param {number} [end] - An index into the `Blob` indicating the first byte
   *  that will *not* be included in the new `Blob` (i.e. the byte exactly at
   * this index is not included). If you specify a negative value, it's treated
   * as an offset from the end of the Blob toward the beginning. For example,
   * `-10` would be the 10th from last byte in the `Blob`. The default value is
   * size.
   * @param {string} [type] - The content type to assign to the new Blob;
   * this will be the value of its type property. The default value is an empty
   * string.
   * @returns {Blob}
   */
  slice(start = 0, end = this.size, type = "") {
    const { size, _parts } = this;
    let offset = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);

    let limit = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
    const span = Math.max(limit - offset, 0);
    const blob = new Blob([], { type });

    if (span === 0) {
      return blob
    }

    let blobSize = 0;
    const blobParts = [];
    for (const part of _parts) {
      const { byteLength } = part;
      if (offset > 0 && byteLength <= offset) {
        offset -= byteLength;
        limit -= byteLength;
      } else {
        const chunk = part.subarray(offset, Math.min(byteLength, limit));
        blobParts.push(chunk);
        blobSize += chunk.byteLength;
        // no longer need to take that into account
        offset = 0;

        // don't add the overflow to new blobParts
        if (blobSize >= span) {
          break
        }
      }
    }

    blob._parts = blobParts;
    blob._size = blobSize;

    return blob
  }

  /**
   * Returns a promise that resolves with an ArrayBuffer containing the entire
   * contents of the Blob as binary data.
   * @returns {Promise<ArrayBuffer>}
   */
  // eslint-disable-next-line require-await
  async arrayBuffer() {
    const buffer = new ArrayBuffer(this.size);
    const bytes = new Uint8Array(buffer);
    let offset = 0;
    for (const part of this._parts) {
      bytes.set(part, offset);
      offset += part.byteLength;
    }
    return buffer
  }

  /**
   * Returns a promise that resolves with a USVString containing the entire
   * contents of the Blob interpreted as UTF-8 text.
   * @returns {Promise<string>}
   */
  // eslint-disable-next-line require-await
  async text() {
    const decoder = new webEncoding.TextDecoder();
    let text = "";
    for (const part of this._parts) {
      text += decoder.decode(part);
    }
    return text
  }

  /**
   * @returns {BlobStream}
   */
  stream() {
    return new BlobStream(this._parts)
  }

  /**
   * @returns {string}
   */
  toString() {
    return "[object Blob]"
  }

  get [Symbol.toStringTag]() {
    return "Blob"
  }
};

// Marking export as a DOM File object instead of custom class.
/** @type {typeof globalThis.Blob} */
const Blob = WebBlob;

/**
 * Blob stream is a `ReadableStream` extension optimized to have minimal
 * overhead when consumed as `AsyncIterable<Uint8Array>`.
 * @extends {ReadableStream<Uint8Array>}
 * @implements {AsyncIterable<Uint8Array>}
 */
class BlobStream extends _package.ReadableStream {
  /**
   * @param {Uint8Array[]} chunks
   */
  constructor(chunks) {
    // @ts-ignore
    super(new BlobStreamController(chunks.values()), { type: "bytes" });
    /** @private */
    this._chunks = chunks;
  }

  /**
   * @param {Object} [_options]
   * @property {boolean} [_options.preventCancel]
   * @returns {AsyncIterator<Uint8Array>}
   */
  async *[Symbol.asyncIterator](_options) {
    const reader = this.getReader();
    yield* this._chunks;
    reader.releaseLock();
  }
}

class BlobStreamController {
  /**
   * @param {Iterator<Uint8Array>} chunks
   */
  constructor(chunks) {
    this.chunks = chunks;
  }

  /**
   * @param {ReadableStreamDefaultController} controller
   */
  start(controller) {
    this.work(controller);
    this.isWorking = false;
    this.isCancelled = false;
  }
  /**
   *
   * @param {ReadableStreamDefaultController} controller
   */
  async work(controller) {
    const { chunks } = this;

    this.isWorking = true;
    while (!this.isCancelled && (controller.desiredSize || 0) > 0) {
      let next = null;
      try {
        next = chunks.next();
      } catch (error) {
        controller.error(error);
        break
      }

      if (next) {
        if (!next.done && !this.isCancelled) {
          controller.enqueue(next.value);
        } else {
          controller.close();
        }
      }
    }

    this.isWorking = false;
  }

  /**
   * @param {ReadableStreamDefaultController} controller
   */
  pull(controller) {
    if (!this.isWorking) {
      this.work(controller);
    }
  }
  cancel() {
    this.isCancelled = true;
  }
}

/**
 * @param {string} [input]
 * @returns {string}
 */
const readType = (input = "") => {
  const type = String(input).toLowerCase();
  return /[^\u0020-\u007E]/.test(type) ? "" : type
};

exports.ReadableStream = _package.ReadableStream;
Object.defineProperty(exports, "TextDecoder", ({
  enumerable: true,
  get: function () {
    return webEncoding.TextDecoder;
  }
}));
Object.defineProperty(exports, "TextEncoder", ({
  enumerable: true,
  get: function () {
    return webEncoding.TextEncoder;
  }
}));
exports.Blob = Blob;
//# sourceMappingURL=lib.node.cjs.map


/***/ }),

/***/ 5711:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var webEncoding = __nccwpck_require__(1430);
var streams = __nccwpck_require__(608);

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var streams__default = /*#__PURE__*/_interopDefaultLegacy(streams);

const { ReadableStream: ReadableStreamPolyfill } = streams__default['default'];
/** @type {typeof globalThis.ReadableStream} */
// @ts-ignore
const ReadableStream = ReadableStreamPolyfill;

Object.defineProperty(exports, "TextDecoder", ({
	enumerable: true,
	get: function () {
		return webEncoding.TextDecoder;
	}
}));
Object.defineProperty(exports, "TextEncoder", ({
	enumerable: true,
	get: function () {
		return webEncoding.TextEncoder;
	}
}));
exports.ReadableStream = ReadableStream;
//# sourceMappingURL=package.cjs.map


/***/ }),

/***/ 9681:
/***/ ((module, exports, __nccwpck_require__) => {

"use strict";


exports = module.exports = fetch;

const http = __nccwpck_require__(8605);
const https = __nccwpck_require__(7211);
const zlib = __nccwpck_require__(8761);
const dataUriToBuffer = __nccwpck_require__(2371);
const Stream = __nccwpck_require__(2413);
const util = __nccwpck_require__(1669);
const blob = __nccwpck_require__(5343);
const WebStreams = __nccwpck_require__(608);
const crypto = __nccwpck_require__(6417);
const url = __nccwpck_require__(8835);

class FetchBaseError extends Error {
	constructor(message, type) {
		super(message);
		// Hide custom error implementation details from end-users
		Error.captureStackTrace(this, this.constructor);

		this.type = type;
	}

	get name() {
		return this.constructor.name;
	}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
}

/**
 * @typedef {{ address?: string, code: string, dest?: string, errno: number, info?: object, message: string, path?: string, port?: number, syscall: string}} SystemError
*/

/**
 * FetchError interface for operational errors
 */
class FetchError extends FetchBaseError {
	/**
	 * @param  {string} message -      Error message for human
	 * @param  {string} [type] -        Error type for machine
	 * @param  {SystemError} [systemError] - For Node.js system error
	 */
	constructor(message, type, systemError) {
		super(message, type);
		// When err.type is `system`, err.erroredSysCall contains system error and err.code contains system error code
		if (systemError) {
			// eslint-disable-next-line no-multi-assign
			this.code = this.errno = systemError.code;
			this.erroredSysCall = systemError.syscall;
		}
	}
}

/**
 * Is.js
 *
 * Object type checks.
 */

const NAME = Symbol.toStringTag;

/**
 * Check if `obj` is a URLSearchParams object
 * ref: https://github.com/node-fetch/node-fetch/issues/296#issuecomment-307598143
 *
 * @param  {*} obj
 * @return {obj is URLSearchParams}
 */
const isURLSearchParameters = object => {
	return (
		typeof object === 'object' &&
		typeof object.append === 'function' &&
		typeof object.delete === 'function' &&
		typeof object.get === 'function' &&
		typeof object.getAll === 'function' &&
		typeof object.has === 'function' &&
		typeof object.set === 'function' &&
		typeof object.sort === 'function' &&
		object[NAME] === 'URLSearchParams'
	);
};

/**
 * Check if `object` is a W3C `Blob` object (which `File` inherits from)
 *
 * @param  {*} object
 * @return {object is Blob}
 */
const isBlob = object => {
	return (
		typeof object === 'object' &&
		typeof object.arrayBuffer === 'function' &&
		typeof object.type === 'string' &&
		typeof object.stream === 'function' &&
		typeof object.constructor === 'function' &&
		/^(Blob|File)$/.test(object[NAME])
	);
};

/**
 * Check if `obj` is a spec-compliant `FormData` object
 *
 * @param {*} object
 * @return {object is FormData}
 */
function isFormData(object) {
	return (
		typeof object === 'object' &&
		typeof object.append === 'function' &&
		typeof object.set === 'function' &&
		typeof object.get === 'function' &&
		typeof object.getAll === 'function' &&
		typeof object.delete === 'function' &&
		typeof object.keys === 'function' &&
		typeof object.values === 'function' &&
		typeof object.entries === 'function' &&
		typeof object.constructor === 'function' &&
		object[NAME] === 'FormData'
	);
}

/**
 * Detect form data input from form-data module
 *
 * @param {any} value
 * @returns {value is Stream & {getBoundary():string, hasKnownLength():boolean, getLengthSync():number|null}}
 */
const isMultipartFormDataStream = value => {
	return (
		value instanceof Stream &&
		typeof value.getBoundary === 'function' &&
		typeof value.hasKnownLength === 'function' &&
		typeof value.getLengthSync === 'function'
	);
};

/**
 * Check if `obj` is an instance of AbortSignal.
 *
 * @param  {*} obj
 * @return {obj is AbortSignal}
 */
const isAbortSignal = object => {
	return (
		typeof object === 'object' && (
			object[NAME] === 'AbortSignal' ||
			object[NAME] === 'EventTarget'
		)
	);
};

/**
 * Check if `value` is a ReadableStream.
 *
 * @param {*} value
 * @returns {value is ReadableStream}
 */
const isReadableStream = value => {
	return (
		typeof value === 'object' &&
		typeof value.getReader === 'function' &&
		typeof value.cancel === 'function' &&
		typeof value.tee === 'function'
	);
};

const carriage = '\r\n';
const dashes = '-'.repeat(2);
const carriageLength = Buffer.byteLength(carriage);

/**
 * @param {string} boundary
 */
const getFooter = boundary => `${dashes}${boundary}${dashes}${carriage.repeat(2)}`;

/**
 * @param {string} boundary
 * @param {string} name
 * @param {*} field
 *
 * @return {string}
 */
function getHeader(boundary, name, field) {
	let header = '';

	header += `${dashes}${boundary}${carriage}`;
	header += `Content-Disposition: form-data; name="${name}"`;

	if (isBlob(field)) {
		header += `; filename="${field.name}"${carriage}`;
		header += `Content-Type: ${field.type || 'application/octet-stream'}`;
	}

	return `${header}${carriage.repeat(2)}`;
}

/**
 * @return {string}
 */
const getBoundary = () => crypto.randomBytes(8).toString('hex');

/**
 * @param {FormData} form
 * @param {string} boundary
 */
async function * formDataIterator(form, boundary) {
	for (const [name, value] of form) {
		yield getHeader(boundary, name, value);

		if (isBlob(value)) {
			yield * value.stream();
		} else {
			yield value;
		}

		yield carriage;
	}

	yield getFooter(boundary);
}

/**
 * @param {FormData} form
 * @param {string} boundary
 */
function getFormDataLength(form, boundary) {
	let length = 0;

	for (const [name, value] of form) {
		length += Buffer.byteLength(getHeader(boundary, name, value));

		if (isBlob(value)) {
			length += value.size;
		} else {
			length += Buffer.byteLength(String(value));
		}

		length += carriageLength;
	}

	length += Buffer.byteLength(getFooter(boundary));

	return length;
}

const encoder = new util.TextEncoder();
const decoder = new util.TextDecoder();

/**
 * @param {string} text
 */
const encode = text => encoder.encode(text);

/**
 * @param {Uint8Array} bytes
 */
const decode = bytes => decoder.decode(bytes);

// @ts-check

const {readableHighWaterMark} = new Stream.Readable();

const {ReadableStream: ReadableStream$1} = WebStreams;
const INTERNALS$2 = Symbol('Body internals');

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param {BodyInit}  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */

class Body {
	/**
	 * @param {BodyInit|Stream} body
	 * @param {{size?:number}} options
	 */
	constructor(body, {
		size = 0
	} = {}) {
		const state = {
			/** @type {null|ReadableStream<Uint8Array>} */
			body: null,
			/** @type {string|null} */
			type: null,
			/** @type {number|null} */
			size: null,
			/** @type {null|string} */
			boundary: null,
			disturbed: false,
			/** @type {null|Error} */
			error: null
		};
		this[INTERNALS$2] = state;

		if (body === null) {
			// Body is undefined or null
			state.body = null;
			state.size = 0;
		} else if (isURLSearchParameters(body)) {
		// Body is a URLSearchParams
			const bytes = encode(body.toString());
			state.body = fromBytes(bytes);
			state.size = bytes.byteLength;
			state.type = 'application/x-www-form-urlencoded;charset=UTF-8';
		} else if (isBlob(body)) {
			// Body is blob
			state.size = body.size;
			state.type = body.type || null;
			state.body = body.stream();
		} else if (body instanceof Uint8Array) {
			// Body is Buffer
			state.body = fromBytes(body);
			state.size = body.byteLength;
		} else if (util.types.isAnyArrayBuffer(body)) {
			// Body is ArrayBuffer
			const bytes = new Uint8Array(body);
			state.body = fromBytes(bytes);
			state.size = bytes.byteLength;
		} else if (ArrayBuffer.isView(body)) {
			// Body is ArrayBufferView
			const bytes = new Uint8Array(body.buffer, body.byteOffset, body.byteLength);
			state.body = fromBytes(bytes);
			state.size = bytes.byteLength;
		} else if (isReadableStream(body)) {
			// Body is stream
			state.body = body;
		} else if (isFormData(body)) {
			// Body is an instance of formdata-node
			const boundary = `NodeFetchFormDataBoundary${getBoundary()}`;
			state.type = `multipart/form-data; boundary=${boundary}`;
			state.size = getFormDataLength(body, boundary);
			state.body = fromAsyncIterable(formDataIterator(body, boundary));
		} else if (isMultipartFormDataStream(body)) {
			state.type = `multipart/form-data; boundary=${body.getBoundary()}`;
			state.size = body.hasKnownLength() ? body.getLengthSync() : null;
			state.body = fromStream(body);
		} else if (body instanceof Stream) {
			state.body = fromStream(body);
		} else {
			// None of the above
			// coerce to string then buffer
			const bytes = encode(String(body));
			state.type = 'text/plain;charset=UTF-8';
			state.size = bytes.byteLength;
			state.body = fromBytes(bytes);
		}

		this.size = size;

		// if (body instanceof Stream) {
		// 	body.on('error', err => {
		// 		const error = err instanceof FetchBaseError ?
		// 			err :
		// 			new FetchError(`Invalid response body while trying to fetch ${this.url}: ${err.message}`, 'system', err);
		// 		this[INTERNALS].error = error;
		// 	});
		// }
	}

	/** @type {Headers|undefined} */
	/* c8 ignore next 3 */
	get headers() {
		return null;
	}

	get body() {
		return this[INTERNALS$2].body;
	}

	get bodyUsed() {
		return this[INTERNALS$2].disturbed;
	}

	/**
	 * Decode response as ArrayBuffer
	 *
	 * @return {Promise<ArrayBuffer>}
	 */
	async arrayBuffer() {
		const {buffer, byteOffset, byteLength} = await consumeBody(this);
		return buffer.slice(byteOffset, byteOffset + byteLength);
	}

	/**
	 * Return raw response as Blob
	 *
	 * @return Promise
	 */
	async blob() {
		const ct = (this.headers && this.headers.get('content-type')) || (this[INTERNALS$2].body && this[INTERNALS$2].type) || '';
		const buf = await consumeBody(this);

		return new blob.Blob([buf], {
			type: ct
		});
	}

	/**
	 * Decode response as json
	 *
	 * @return  Promise
	 */
	async json() {
		return JSON.parse(await this.text());
	}

	/**
	 * Decode response as text
	 *
	 * @return  Promise
	 */
	async text() {
		const buffer = await consumeBody(this);
		return decode(buffer);
	}
}

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: {enumerable: true},
	bodyUsed: {enumerable: true},
	arrayBuffer: {enumerable: true},
	blob: {enumerable: true},
	json: {enumerable: true},
	text: {enumerable: true}
});

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @param {Body & {url?:string}} data
 * @return {Promise<Uint8Array>}
 */
async function consumeBody(data) {
	const state = data[INTERNALS$2];
	if (state.disturbed) {
		throw new TypeError(`body used already for: ${data.url}`);
	}

	state.disturbed = true;

	if (state.error) {
		throw state.error;
	}

	const {body} = state;

	// Body is null
	if (body === null) {
		return new Uint8Array(0);
	}

	// Body is stream
	// get ready to actually consume the body
	const [buffer, chunks, limit] = data.size > 0 ?
		[new Uint8Array(data.size), null, data.size] :
		[null, [], Infinity];
	let offset = 0;

	const source = streamIterator(body);
	try {
		for await (const chunk of source) {
			const bytes = chunk instanceof Uint8Array ?
				chunk :
				Buffer.from(chunk);

			if (offset + bytes.byteLength > limit) {
				const error = new FetchError(`content size at ${data.url} over limit: ${limit}`, 'max-size');
				source.throw(error);
				throw error;
			} else if (buffer) {
				buffer.set(bytes, offset);
			} else {
				chunks.push(bytes);
			}

			offset += bytes.byteLength;
		}

		if (buffer) {
			if (offset < buffer.byteLength) {
				throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
			} else {
				return buffer;
			}
		} else {
			return writeBytes(new Uint8Array(offset), chunks);
		}
	} catch (error) {
		if (error instanceof FetchBaseError) {
			throw error;
		} else if (error && error.name === 'AbortError') {
			throw error;
		} else {
			// Other errors, such as incorrect content-encoding
			throw new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error.message}`, 'system', error);
		}
	}
}

/**
 * Clone body given Res/Req instance
 *
 * @param {Body} instance       Response or Request instance
 * @return {ReadableStream<Uint8Array>}
 */
const clone = instance => {
	const {body} = instance;

	// Don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	const [left, right] = body.tee();
	instance[INTERNALS$2].body = left;
	return right;
};

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param {Body} source Any options.body input
 * @returns {string | null}
 */
const extractContentType = source => source[INTERNALS$2].type;

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param {Body} source - Body object from the Body instance.
 * @returns {number | null}
 */
const getTotalBytes = source => source[INTERNALS$2].size;

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param {Stream.Writable} dest - The stream to write to.
 * @param {Body} source - Body object from the Body instance.
 * @returns {void}
 */
const writeToStream = (dest, {body}) => {
	if (body === null) {
		// Body is null
		dest.end();
	} else {
		Stream.Readable.from(streamIterator(body)).pipe(dest);
	}
};

/**
 * @template T
 * @implements {AsyncGenerator<T, void, void>}
 */
class StreamIterableIterator {
	/**
	 * @param {ReadableStream<T>} stream
	 */
	constructor(stream) {
		this.stream = stream;
		this.reader = null;
		this.state = null;
	}

	/**
	 * @returns {AsyncGenerator<T, void, void>}
	 */
	[Symbol.asyncIterator]() {
		return this;
	}

	getReader() {
		if (this.reader) {
			return this.reader;
		}

		const reader = this.stream.getReader();
		this.reader = reader;
		return reader;
	}

	/**
	 * @returns {Promise<IteratorResult<T, void>>}
	 */
	next() {
		return /** @type {Promise<IteratorResult<T, void>>} */ (this.getReader().read());
	}

	async return() {
		if (this.reader) {
			await this.reader.cancel();
		}

		return {done: true, value: undefined};
	}

	async throw(error) {
		await this.getReader().cancel(error);
		return {done: true, value: undefined};
	}
}

/**
 * @template T
 * @param {ReadableStream<T>} stream
 */
const streamIterator = stream => new StreamIterableIterator(stream);

/**
 * @param {Uint8Array} buffer
 * @param {Uint8Array[]} chunks
 */
const writeBytes = (buffer, chunks) => {
	let offset = 0;
	for (const chunk of chunks) {
		buffer.set(chunk, offset);
		offset += chunk.byteLength;
	}

	return buffer;
};

/**
 * @param {Uint8Array} bytes
 * @returns {ReadableStream<Uint8Array>}
 */
// @ts-ignore
const fromBytes = bytes => new ReadableStream$1({
	start(controller) {
		controller.enqueue(bytes);
		controller.close();
	}
});

/**
 * @param {AsyncIterable<Uint8Array>} content
 * @returns {ReadableStream<Uint8Array>}
 */
const fromAsyncIterable = content =>
	// @ts-ignore
	new ReadableStream$1(new AsyncIterablePump(content));

/**
 * @implements {UnderlyingSource<Uint8Array>}
 */
class AsyncIterablePump {
	/**
	 * @param {AsyncIterable<Uint8Array>} source
	 */
	constructor(source) {
		this.source = source[Symbol.asyncIterator]();
	}

	/**
	 * @param {ReadableStreamController<Uint8Array>} controller
	 */
	async pull(controller) {
		try {
			while (controller.desiredSize > 0) {
				// eslint-disable-next-line no-await-in-loop
				const next = await this.source.next();
				if (next.done) {
					controller.close();
					break;
				} else {
					controller.enqueue(next.value);
				}
			}
		} catch (error) {
			controller.error(error);
		}
	}

	cancel(reason) {
		if (reason) {
			if (typeof this.source.throw === 'function') {
				this.source.throw(reason);
			} else if (typeof this.source.return === 'function') {
				this.source.return();
			}
		} else if (typeof this.source.return === 'function') {
			this.source.return();
		}
	}
}

/**
 * @param {Stream & {readableHighWaterMark?:number}} source
 * @returns {ReadableStream<Uint8Array>}
 */
const fromStream = source => {
	const pump = new StreamPump(source);
	const stream =
		/** @type {ReadableStream<Uint8Array>} */(new ReadableStream$1(pump, pump));
	return stream;
};

/**
 * @implements {WebStreams.UnderlyingSource<Uint8Array>}
 */
class StreamPump {
	/**
	 * @param {Stream & {
	 * 	readableHighWaterMark?: number
	 * 	readable?:boolean,
	 * 	resume?: () => void,
	 * 	pause?: () => void
	 * 	destroy?: (error?:Error) => void
	 * }} stream
	 */
	constructor(stream) {
		this.highWaterMark = stream.readableHighWaterMark || readableHighWaterMark;
		this.accumalatedSize = 0;
		this.stream = stream;
		this.enqueue = this.enqueue.bind(this);
		this.error = this.error.bind(this);
		this.close = this.close.bind(this);
	}

	size(chunk) {
		return chunk.byteLength;
	}

	/**
	 * @param {ReadableStreamController<Uint8Array>} controller
	 */
	start(controller) {
		this.controller = controller;
		this.stream.on('data', this.enqueue);
		this.stream.once('error', this.error);
		this.stream.once('end', this.close);
		this.stream.once('close', this.close);
	}

	pull() {
		this.resume();
	}

	cancel(reason) {
		if (this.stream.destroy) {
			this.stream.destroy(reason);
		}

		this.stream.off('data', this.enqueue);
		this.stream.off('error', this.error);
		this.stream.off('end', this.close);
		this.stream.off('close', this.close);
	}

	/**
	 * @param {Uint8Array|string} chunk
	 */
	enqueue(chunk) {
		if (this.controller) {
			try {
				const bytes = chunk instanceof Uint8Array ?
					chunk :
					Buffer.from(chunk);

				const available = this.controller.desiredSize - bytes.byteLength;
				this.controller.enqueue(bytes);
				if (available <= 0) {
					this.pause();
				}
			} catch {
				this.controller.error(new Error('Could not create Buffer, chunk must be of type string or an instance of Buffer, ArrayBuffer, or Array or an Array-like Object'));
				this.cancel();
			}
		}
	}

	pause() {
		if (this.stream.pause) {
			this.stream.pause();
		}
	}

	resume() {
		if (this.stream.readable && this.stream.resume) {
			this.stream.resume();
		}
	}

	close() {
		if (this.controller) {
			this.controller.close();
			delete this.controller;
		}
	}

	error(error) {
		if (this.controller) {
			this.controller.error(error);
			delete this.controller;
		}
	}
}

/**
 * Headers.js
 *
 * Headers class offers convenient helpers
 */

const validateHeaderName = typeof http.validateHeaderName === 'function' ?
	http.validateHeaderName :
	name => {
		if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
			const err = new TypeError(`Header name must be a valid HTTP token [${name}]`);
			Object.defineProperty(err, 'code', {value: 'ERR_INVALID_HTTP_TOKEN'});
			throw err;
		}
	};

const validateHeaderValue = typeof http.validateHeaderValue === 'function' ?
	http.validateHeaderValue :
	(name, value) => {
		if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
			const err = new TypeError(`Invalid character in header content ["${name}"]`);
			Object.defineProperty(err, 'code', {value: 'ERR_INVALID_CHAR'});
			throw err;
		}
	};

/**
 * @typedef {Headers | Record<string, string> | Iterable<readonly [string, string]> | Iterable<Iterable<string>>} HeadersInit
 */

/**
 * This Fetch API interface allows you to perform various actions on HTTP request and response headers.
 * These actions include retrieving, setting, adding to, and removing.
 * A Headers object has an associated header list, which is initially empty and consists of zero or more name and value pairs.
 * You can add to this using methods like append() (see Examples.)
 * In all methods of this interface, header names are matched by case-insensitive byte sequence.
 *
 */
class Headers extends URLSearchParams {
	/**
	 * Headers class
	 *
	 * @constructor
	 * @param {HeadersInit} [init] - Response headers
	 */
	constructor(init) {
		// Validate and normalize init object in [name, value(s)][]
		/** @type {string[][]} */
		let result = [];
		if (init instanceof Headers) {
			const raw = init.raw();
			for (const [name, values] of Object.entries(raw)) {
				result.push(...values.map(value => [name, value]));
			}
		} else if (init == null) ; else if (typeof init === 'object' && !util.types.isBoxedPrimitive(init)) {
			const method = init[Symbol.iterator];
			// eslint-disable-next-line no-eq-null, eqeqeq
			if (method == null) {
				// Record<ByteString, ByteString>
				result.push(...Object.entries(init));
			} else {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// Sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				result = [...init]
					.map(pair => {
						if (
							typeof pair !== 'object' || util.types.isBoxedPrimitive(pair)
						) {
							throw new TypeError('Each header pair must be an iterable object');
						}

						return [...pair];
					}).map(pair => {
						if (pair.length !== 2) {
							throw new TypeError('Each header pair must be a name/value tuple');
						}

						return [...pair];
					});
			}
		} else {
			throw new TypeError('Failed to construct \'Headers\': The provided value is not of type \'(sequence<sequence<ByteString>> or record<ByteString, ByteString>)');
		}

		// Validate and lowercase
		result =
			result.length > 0 ?
				result.map(([name, value]) => {
					validateHeaderName(name);
					validateHeaderValue(name, String(value));
					return [String(name).toLowerCase(), String(value)];
				}) :
				undefined;

		super(result);

		// Returning a Proxy that will lowercase key names, validate parameters and sort keys
		// eslint-disable-next-line no-constructor-return
		return new Proxy(this, {
			get(target, p, receiver) {
				switch (p) {
					case 'append':
					case 'set':
						return (name, value) => {
							validateHeaderName(name);
							validateHeaderValue(name, String(value));
							return URLSearchParams.prototype[p].call(
								receiver,
								String(name).toLowerCase(),
								String(value)
							);
						};

					case 'delete':
					case 'has':
					case 'getAll':
						return name => {
							validateHeaderName(name);
							return URLSearchParams.prototype[p].call(
								receiver,
								String(name).toLowerCase()
							);
						};

					case 'keys':
						return () => {
							target.sort();
							return new Set(URLSearchParams.prototype.keys.call(target)).keys();
						};

					default:
						return Reflect.get(target, p, receiver);
				}
			}
			/* c8 ignore next */
		});
	}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	toString() {
		return Object.prototype.toString.call(this);
	}

	get(name) {
		const values = this.getAll(name);
		if (values.length === 0) {
			return null;
		}

		let value = values.join(', ');
		if (/^content-encoding$/i.test(name)) {
			value = value.toLowerCase();
		}

		return value;
	}

	forEach(callback, thisArg = undefined) {
		for (const name of this.keys()) {
			Reflect.apply(callback, thisArg, [this.get(name), name, this]);
		}
	}

	* values() {
		for (const name of this.keys()) {
			yield this.get(name);
		}
	}

	/**
	 * @type {() => IterableIterator<[string, string]>}
	 */
	* entries() {
		for (const name of this.keys()) {
			yield [name, this.get(name)];
		}
	}

	[Symbol.iterator]() {
		return this.entries();
	}

	/**
	 * Node-fetch non-spec method
	 * returning all headers and their values as array
	 * @returns {Record<string, string[]>}
	 */
	raw() {
		return [...this.keys()].reduce((result, key) => {
			result[key] = this.getAll(key);
			return result;
		}, {});
	}

	/**
	 * For better console.log(headers) and also to convert Headers into Node.js Request compatible format
	 */
	[Symbol.for('nodejs.util.inspect.custom')]() {
		return [...this.keys()].reduce((result, key) => {
			const values = this.getAll(key);
			// Http.request() only supports string as Host header.
			// This hack makes specifying custom Host header possible.
			if (key === 'host') {
				result[key] = values[0];
			} else {
				result[key] = values.length > 1 ? values : values[0];
			}

			return result;
		}, {});
	}
}

/**
 * Re-shaping object for Web IDL tests
 * Only need to do it for overridden methods
 */
Object.defineProperties(
	Headers.prototype,
	['get', 'entries', 'forEach', 'values'].reduce((result, property) => {
		result[property] = {enumerable: true};
		return result;
	}, {})
);

/**
 * Create a Headers object from an http.IncomingMessage.rawHeaders, ignoring those that do
 * not conform to HTTP grammar productions.
 * @param {import('http').IncomingMessage['rawHeaders']} headers
 */
function fromRawHeaders(headers = []) {
	return new Headers(
		headers
			// Split into pairs
			.reduce((result, value, index, array) => {
				if (index % 2 === 0) {
					result.push(array.slice(index, index + 2));
				}

				return result;
			}, [])
			.filter(([name, value]) => {
				try {
					validateHeaderName(name);
					validateHeaderValue(name, String(value));
					return true;
				} catch {
					return false;
				}
			})

	);
}

const redirectStatus = new Set([301, 302, 303, 307, 308]);

/**
 * Redirect code matching
 *
 * @param {number} code - Status code
 * @return {boolean}
 */
const isRedirect = code => {
	return redirectStatus.has(code);
};

/**
 * Response.js
 *
 * Response class provides content decoding
 */

const INTERNALS$1 = Symbol('Response internals');

/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response extends Body {
	constructor(body = null, options = {}) {
		super(body, options);

		const status = options.status || 200;
		const headers = new Headers(options.headers);

		if (body !== null && !headers.has('Content-Type')) {
			const contentType = extractContentType(this);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		this[INTERNALS$1] = {
			url: options.url,
			status,
			statusText: options.statusText || '',
			headers,
			counter: options.counter,
			highWaterMark: options.highWaterMark
		};
	}

	get url() {
		return this[INTERNALS$1].url || '';
	}

	get status() {
		return this[INTERNALS$1].status;
	}

	/**
	 * Convenience property representing if the request ended normally
	 */
	get ok() {
		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
	}

	get redirected() {
		return this[INTERNALS$1].counter > 0;
	}

	get statusText() {
		return this[INTERNALS$1].statusText;
	}

	get headers() {
		return this[INTERNALS$1].headers;
	}

	get highWaterMark() {
		return this[INTERNALS$1].highWaterMark;
	}

	/**
	 * Clone this response
	 *
	 * @return  Response
	 */
	clone() {
		return new Response(clone(this, this.highWaterMark), {
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected,
			size: this.size
		});
	}

	/**
	 * @param {string} url    The URL that the new response is to originate from.
	 * @param {number} status An optional status code for the response (e.g., 302.)
	 * @returns {Response}    A Response object.
	 */
	static redirect(url, status = 302) {
		if (!isRedirect(status)) {
			throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
		}

		return new Response(null, {
			headers: {
				location: new URL(url).toString()
			},
			status
		});
	}

	get [Symbol.toStringTag]() {
		return 'Response';
	}
}

Object.defineProperties(Response.prototype, {
	url: {enumerable: true},
	status: {enumerable: true},
	ok: {enumerable: true},
	redirected: {enumerable: true},
	statusText: {enumerable: true},
	headers: {enumerable: true},
	clone: {enumerable: true}
});

const getSearch = parsedURL => {
	if (parsedURL.search) {
		return parsedURL.search;
	}

	const lastOffset = parsedURL.href.length - 1;
	const hash = parsedURL.hash || (parsedURL.href[lastOffset] === '#' ? '#' : '');
	return parsedURL.href[lastOffset - hash.length] === '?' ? '?' : '';
};

const INTERNALS = Symbol('Request internals');

/**
 * Check if `obj` is an instance of Request.
 *
 * @param  {any} object
 * @return {object is Request}
 */
const isRequest = object => {
	return (
		typeof object === 'object' &&
		typeof object[INTERNALS] === 'object'
	);
};

/**
 * Request class
 */
class Request extends Body {
	/**
	 * @param {string|Request input  Url or Request instance
	 * @param {RequestInit} init   Custom options
	 */
	constructor(input, init = {}) {
		let parsedURL;

		// Normalize input and force URL to be encoded as UTF-8 (https://github.com/node-fetch/node-fetch/issues/245)
		if (isRequest(input)) {
			parsedURL = new URL(input.url);
		} else {
			parsedURL = new URL(input);
			input = {};
		}

		let method = init.method || input.method || 'GET';
		method = method.toUpperCase();

		// eslint-disable-next-line no-eq-null, eqeqeq
		if (((init.body != null || isRequest(input)) && input.body !== null) &&
			(method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		const inputBody = init.body ?
			init.body :
			(isRequest(input) && input.body !== null ?
				clone(input) :
				null);

		super(inputBody, {
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (inputBody !== null && !headers.has('Content-Type')) {
			const contentType = extractContentType(this);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		let signal = isRequest(input) ?
			input.signal :
			null;
		if ('signal' in init) {
			signal = init.signal;
		}

		// eslint-disable-next-line no-eq-null, eqeqeq
		if (signal != null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal or EventTarget');
		}

		this[INTERNALS] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal
		};

		// Node-fetch-only options
		this.follow = init.follow === undefined ? (input.follow === undefined ? 20 : input.follow) : init.follow;
		this.compress = init.compress === undefined ? (input.compress === undefined ? true : input.compress) : init.compress;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
		this.highWaterMark = init.highWaterMark || input.highWaterMark || 16384;
		this.insecureHTTPParser = init.insecureHTTPParser || input.insecureHTTPParser || false;
	}

	get method() {
		return this[INTERNALS].method;
	}

	/**
	 * @type {URL}
	 */
	get url() {
		return url.format(this[INTERNALS].parsedURL);
	}

	get headers() {
		return this[INTERNALS].headers;
	}

	get redirect() {
		return this[INTERNALS].redirect;
	}

	get signal() {
		return this[INTERNALS].signal;
	}

	/**
	 * Clone this request
	 *
	 * @return  Request
	 */
	clone() {
		return new Request(this);
	}

	get [Symbol.toStringTag]() {
		return 'Request';
	}
}

Object.defineProperties(Request.prototype, {
	method: {enumerable: true},
	url: {enumerable: true},
	headers: {enumerable: true},
	redirect: {enumerable: true},
	clone: {enumerable: true},
	signal: {enumerable: true}
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
const getNodeRequestOptions = request => {
	const {parsedURL} = request[INTERNALS];
	const headers = new Headers(request[INTERNALS].headers);

	// Fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body === null && /^(post|put)$/i.test(request.method)) {
		contentLengthValue = '0';
	}

	if (request.body !== null) {
		const totalBytes = getTotalBytes(request);
		// Set Content-Length if totalBytes is a number (that is not NaN)
		if (typeof totalBytes === 'number' && !Number.isNaN(totalBytes)) {
			contentLengthValue = String(totalBytes);
		}
	}

	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip,deflate,br');
	}

	let {agent} = request;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	const search = getSearch(parsedURL);

	// Manually spread the URL object instead of spread syntax
	const requestOptions = {
		path: parsedURL.pathname + search,
		pathname: parsedURL.pathname,
		hostname: parsedURL.hostname,
		protocol: parsedURL.protocol,
		port: parsedURL.port,
		hash: parsedURL.hash,
		search: parsedURL.search,
		query: parsedURL.query,
		href: parsedURL.href,
		method: request.method,
		headers: headers[Symbol.for('nodejs.util.inspect.custom')](),
		insecureHTTPParser: request.insecureHTTPParser,
		agent
	};

	return requestOptions;
};

/**
 * AbortError interface for cancelled requests
 */
class AbortError extends FetchBaseError {
	constructor(message, type = 'aborted') {
		super(message, type);
	}
}

/**
 * Index.js
 *
 * a request API compatible with window.fetch
 *
 * All spec algorithm step numbers are based on https://fetch.spec.whatwg.org/commit-snapshots/ae716822cb3a61843226cd090eefc6589446c1d2/.
 */

const {ReadableStream} = WebStreams;

const supportedSchemas = new Set(['data:', 'http:', 'https:']);

/**
 * Fetch function
 *
 * @param   {string | URL | import('./request').default} url - Absolute url or Request instance
 * @param   {RequestInit} [options_] - Fetch options
 * @return  {Promise<import('./response').default>}
 */
async function fetch(url, options_ = {}) {
	return new Promise((resolve, reject) => {
		// Build request object
		const request = new Request(url, options_);
		const options = getNodeRequestOptions(request);
		if (!supportedSchemas.has(options.protocol)) {
			throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${options.protocol.replace(/:$/, '')}" is not supported.`);
		}

		if (options.protocol === 'data:') {
			const data = dataUriToBuffer(request.url);
			const response = new Response(data, {headers: {'Content-Type': data.typeFull}});
			resolve(response);
			return;
		}

		// Wrap http.request into fetch
		const send = (options.protocol === 'https:' ? https : http).request;
		const {signal} = request;
		let response = null;
		let response_ = null;

		const abort = () => {
			const error = new AbortError('The operation was aborted.');
			reject(error);
			if (request.body) {
				request.body.cancel(error);
			}

			if (!response_) {
				return;
			}

			response_.emit('error', error);
		};

		if (signal && signal.aborted) {
			abort();
			return;
		}

		const abortAndFinalize = () => {
			abort();
			finalize();
		};

		// Send request
		const request_ = send(options);

		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}

		const finalize = () => {
			request_.abort();
			if (signal) {
				signal.removeEventListener('abort', abortAndFinalize);
			}
		};

		request_.on('error', err => {
			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
			finalize();
		});

		fixResponseChunkedTransferBadEnding(request_, err => {
			response_.emit('error', err);
		});

		/* c8 ignore next 18 */
		if (process.version < 'v14') {
			// Before Node.js 14, pipeline() does not fully support async iterators and does not always
			// properly handle when the socket close/end events are out of order.
			request_.on('socket', s => {
				let endedWithEventsCount;
				s.prependListener('end', () => {
					endedWithEventsCount = s._eventsCount;
				});
				s.prependListener('close', hadError => {
					// if end happened before close but the socket didn't emit an error, do it now
					if (response && endedWithEventsCount < s._eventsCount && !hadError) {
						const err = new Error('Premature close');
						err.code = 'ERR_STREAM_PREMATURE_CLOSE';
						response_.emit('error', err);
					}
				});
			});
		}

		request_.on('response', incoming => {
			response_ = incoming;
			request_.setTimeout(0);
			const headers = fromRawHeaders(response_.rawHeaders);

			// HTTP fetch step 5
			if (isRedirect(response_.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				const locationURL = location === null ? null : new URL(location, request.url);

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// Node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
						if (locationURL !== null) {
							headers.set('Location', locationURL);
						}

						break;
					case 'follow': {
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOptions = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							// Note: We can not use `request.body` because send would have
							// consumed it already.
							body: options_.body,
							signal: request.signal,
							size: request.size
						};

						// HTTP-redirect fetch step 9
						const isStreamBody =
							requestOptions.body instanceof ReadableStream ||
							requestOptions.body instanceof Stream.Readable;
						if (response_.statusCode !== 303 && isStreamBody) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (response_.statusCode === 303 || ((response_.statusCode === 301 || response_.statusCode === 302) && request.method === 'POST')) {
							requestOptions.method = 'GET';
							requestOptions.body = undefined;
							requestOptions.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						resolve(fetch(new Request(locationURL, requestOptions)));
						finalize();
						return;
					}

					default:
						return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
				}
			}

			// Prepare response
			if (signal) {
				response_.once('end', () => {
					signal.removeEventListener('abort', abortAndFinalize);
				});
			}

			let body = Stream.pipeline(response_, new Stream.PassThrough(), reject);
			// see https://github.com/nodejs/node/pull/29376
			/* c8 ignore next 3 */
			if (process.version < 'v12.10') {
				response_.on('aborted', abortAndFinalize);
			}

			const responseOptions = {
				url: request.url,
				status: response_.statusCode,
				statusText: response_.statusMessage,
				headers,
				size: request.size,
				counter: request.counter,
				highWaterMark: request.highWaterMark
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
				response = new Response(body, responseOptions);
				resolve(response);
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: zlib.Z_SYNC_FLUSH,
				finishFlush: zlib.Z_SYNC_FLUSH
			};

			// For gzip
			if (codings === 'gzip' || codings === 'x-gzip') {
				body = Stream.pipeline(body, zlib.createGunzip(zlibOptions), reject);
				response = new Response(fromAsyncIterable(body), responseOptions);
				resolve(response);
				return;
			}

			// For deflate
			if (codings === 'deflate' || codings === 'x-deflate') {
				// Handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = Stream.pipeline(response_, new Stream.PassThrough(), reject);
				raw.once('data', chunk => {
					// See http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = Stream.pipeline(body, zlib.createInflate(), reject);
					} else {
						body = Stream.pipeline(body, zlib.createInflateRaw(), reject);
					}

					response = new Response(fromAsyncIterable(body), responseOptions);
					resolve(response);
				});
				return;
			}

			// For br
			if (codings === 'br') {
				body = Stream.pipeline(body, zlib.createBrotliDecompress(), reject);
				response = new Response(fromAsyncIterable(body), responseOptions);
				resolve(response);
				return;
			}

			// Otherwise, use response as-is
			response = new Response(fromAsyncIterable(body), responseOptions);
			resolve(response);
		});

		writeToStream(request_, request);
	});
}

function fixResponseChunkedTransferBadEnding(request, errorCallback) {
	const LAST_CHUNK = Buffer.from('0\r\n');
	let socket;

	request.on('socket', s => {
		socket = s;
	});

	request.on('response', response => {
		const {headers} = response;
		if (headers['transfer-encoding'] === 'chunked' && !headers['content-length']) {
			let properLastChunkReceived = false;

			socket.on('data', buf => {
				properLastChunkReceived = Buffer.compare(buf.slice(-3), LAST_CHUNK) === 0;
			});

			socket.prependListener('close', () => {
				if (!properLastChunkReceived) {
					const err = new Error('Premature close');
					err.code = 'ERR_STREAM_PREMATURE_CLOSE';
					errorCallback(err);
				}
			});
		}
	});
}

Object.defineProperty(exports, "Blob", ({
	enumerable: true,
	get: function () {
		return blob.Blob;
	}
}));
exports.AbortError = AbortError;
exports.FetchError = FetchError;
exports.Headers = Headers;
exports.ReadableStream = ReadableStream;
exports.Request = Request;
exports.Response = Response;
exports.default = fetch;
exports.isRedirect = isRedirect;
//# sourceMappingURL=index.cjs.map


/***/ }),

/***/ 7905:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var blob = __nccwpck_require__(5343);

// @ts-check

/**
 * @implements {globalThis.File}
 */
const WebFile = class File extends blob.Blob {
  /**
   *
   * @param {BlobPart[]} init
   * @param {string} name - A USVString representing the file name or the path
   * to the file.
   * @param {FilePropertyBag} [options]
   */
  constructor(
    init,
    name = panic(new TypeError("File constructor requires name argument")),
    options = {}
  ) {
    super(init, options);
    // Per File API spec https://w3c.github.io/FileAPI/#file-constructor
    // Every "/" character of file name must be replaced with a ":".
    /** @private */
    this._name = name;
    // It appears that browser do not follow the spec here.
    // String(name).replace(/\//g, ":")
    /** @private */
    this._lastModified = options.lastModified || Date.now();
  }

  /**
   * The name of the file referenced by the File object.
   * @type {string}
   */
  get name() {
    return this._name
  }

  /**
   * The path the URL of the File is relative to.
   * @type {string}
   */
  get webkitRelativePath() {
    return ""
  }

  /**
   * Returns the last modified time of the file, in millisecond since the UNIX
   * epoch (January 1st, 1970 at Midnight).
   * @returns {number}
   */
  get lastModified() {
    return this._lastModified
  }

  get [Symbol.toStringTag]() {
    return "File"
  }
};

/**
 * @param {*} error
 * @returns {never}
 */
const panic = error => {
  throw error
};

// Marking export as a DOM File object instead of custom class.
/** @type {typeof globalThis.File} */
const File = WebFile;

Object.defineProperty(exports, "Blob", ({
  enumerable: true,
  get: function () {
    return blob.Blob;
  }
}));
exports.File = File;
//# sourceMappingURL=lib.node.cjs.map


/***/ }),

/***/ 8100:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var streamingIterables = __nccwpck_require__(8205);
var pRetry = __nccwpck_require__(2548);
var pack = __nccwpck_require__(8163);
var unpack = __nccwpck_require__(3428);
var treewalk = __nccwpck_require__(6025);
var filesFromPath = __nccwpck_require__(9641);
var fetch = __nccwpck_require__(9681);
var blob = __nccwpck_require__(5343);
var file = __nccwpck_require__(7905);
var fs = __nccwpck_require__(2689);

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var pRetry__default = /*#__PURE__*/_interopDefaultLegacy(pRetry);
var fetch__default = /*#__PURE__*/_interopDefaultLegacy(fetch);

/**
 * A client library for the https://web3.storage/ service. It provides a convenient
 * interface for working with the [Raw HTTP API](https://web3.storage/#api-docs)
 * from a web browser or [Node.js](https://nodejs.org/) and comes bundled with
 * TS for out-of-the box type inference and better IntelliSense.
 *
 * @example
 * ```js
 * import { Web3Storage, File } from 'web3.storage'
 * const client = new Web3Storage({ token: API_TOKEN })
 *
 * const cid = await client.put([new File(['hello world'], 'hello.txt', { type: 'text/plain' })])
 * ```
 * @module
 */

const MAX_PUT_RETRIES = 5;
const MAX_CONCURRENT_UPLOADS = 3;
const MAX_CHUNK_SIZE = 1024 * 1024 * 10; // chunk to ~10MB CARs

/** @typedef { import('./lib/interface.js').API } API */
/** @typedef { import('./lib/interface.js').Status} Status */
/** @typedef { import('./lib/interface.js').Service } Service */
/** @typedef { import('./lib/interface.js').Web3File} Web3File */
/** @typedef { import('./lib/interface.js').Filelike } Filelike */
/** @typedef { import('./lib/interface.js').CIDString} CIDString */
/** @typedef { import('./lib/interface.js').PutOptions} PutOptions */
/** @typedef { import('./lib/interface.js').UnixFSEntry} UnixFSEntry */
/** @typedef { import('./lib/interface.js').Web3Response} Web3Response */

/**
 * @implements Service
 */
class Web3Storage {
  /**
   * Constructs a client bound to the given `options.token` and
   * `options.endpoint`.
   *
   * @example
   * ```js
   * import { Web3Storage } from 'web3.storage'
   * const client = new Web3Storage({ token: API_TOKEN })
   * ```
   *
   * @param {{token: string, endpoint?:URL}} options
   */
  constructor ({ token, endpoint = new URL('https://api.web3.storage') }) {
    /**
     * Authorization token.
     *
     * @readonly
     */
    this.token = token;
    /**
     * Service API endpoint `URL`.
     * @readonly
     */
    this.endpoint = endpoint;
  }

  /**
   * @hidden
   * @param {string} token
   */
  static headers (token) {
    if (!token) throw new Error('missing token')
    return {
      Authorization: `Bearer ${token}`,
      'X-Client': 'web3.storage'
    }
  }

  /**
   * @param {Service} service
   * @param {Iterable<Filelike>} files
   * @param {PutOptions} [options]
   * @returns {Promise<CIDString>}
   */
  static async put ({ endpoint, token }, files, {
    onRootCidReady,
    onStoredChunk,
    maxRetries = MAX_PUT_RETRIES,
    wrapWithDirectory = true,
    name
  } = {}) {
    const url = new URL('/car', endpoint);
    const targetSize = MAX_CHUNK_SIZE;
    let headers = Web3Storage.headers(token);

    if (name) {
      headers = {
        ...headers,
        // @ts-ignore 'X-Name' does not exist in type inferred
        'X-Name': name
      };
    }

    let carRoot;
    const blockstore = new fs.FsBlockStore();

    try {
      const { out, root } = await pack.pack({
        input: Array.from(files).map((f) => ({
          path: f.name,
          content: f.stream()
        })),
        blockstore,
        wrapWithDirectory
      });
      carRoot = root.toString();

      onRootCidReady && onRootCidReady(carRoot);

      const splitter = await treewalk.TreewalkCarSplitter.fromIterable(out, targetSize);

      const upload = streamingIterables.transform(
        MAX_CONCURRENT_UPLOADS,
        async (/** @type {AsyncIterable<Uint8Array>} */ car) => {
          const carParts = [];
          for await (const part of car) {
            carParts.push(part);
          }

          const carFile = new blob.Blob(carParts, {
            type: 'application/car'
          });

          const res = await pRetry__default['default'](
            async () => {
              const request = await fetch__default['default'](url.toString(), {
                method: 'POST',
                headers,
                body: carFile
              });
              const res = await request.json();

              if (request.ok) {
                return res.cid
              } else {
                throw new Error(res.message)
              }
            },
            { retries: maxRetries }
          );
          onStoredChunk && onStoredChunk(carFile.size);
          return res
        }
      );

      for await (const _ of upload(splitter.cars())) {} // eslint-disable-line
    } finally {
      // Close Blockstore
      await blockstore.close();
    }

    return carRoot
  }

  /**
   * @param {Service} service
   * @param {CIDString} cid
   * @returns {Promise<Web3Response | null>}
   */
  static async get ({ endpoint, token }, cid) {
    const url = new URL(`/car/${cid}`, endpoint);
    const res = await fetch__default['default'](url.toString(), {
      method: 'GET',
      headers: Web3Storage.headers(token)
    });
    if (!res.ok) {
      // TODO: I'm assuming that an error for "CID isn't there (yet)" would be unergonomic. Need to verify.
      // I'm thinking null means, nope, not yet, no can has. Anything else is _AN ERROR_
      if (res.status === 404) {
        return null
      } else {
        throw new Error(`${res.status} ${res.statusText}`)
      }
    }
    return toWeb3Response(res)
  }

  /**
   * @param {Service} service
   * @param {CIDString} cid
   * @returns {Promise<CIDString>}
   */
  /* c8 ignore next 4 */
  static async delete ({ endpoint, token }, cid) {
    console.log('Not deleteing', cid, endpoint, token);
    throw Error('.delete not implemented yet')
  }

  /**
   * @param {Service} service
   * @param {CIDString} cid
   * @returns {Promise<Status | undefined>}
   */
  static async status ({ endpoint, token }, cid) {
    const url = new URL(`/status/${cid}`, endpoint);
    const res = await fetch__default['default'](url.toString(), {
      method: 'GET',
      headers: Web3Storage.headers(token)
    });
    if (res.status === 404) {
      return undefined
    }
    if (!res.ok) {
      throw new Error(res.statusText)
    }
    return res.json()
  }

  // Just a sugar so you don't have to pass around endpoint and token around.

  /**
   * Uploads files to web3.storage. Files are hashed in the client and uploaded as a single
   * [Content Addressed Archive(CAR)](https://github.com/ipld/specs/blob/master/block-layer/content-addressable-archives.md).
   * Takes a [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob)
   *
   * Returns the corresponding Content Identifier (CID).
   *
   * @example
   * ```js
   * const file = new File(['hello world'], 'hello.txt', { type: 'text/plain' })
   * const cid = await client.put([file])
   * ```
   * @param {Iterable<Filelike>} files
   * @param {PutOptions} [options]
   */
  put (files, options) {
    return Web3Storage.put(this, files, options)
  }

  /**
   * Fetch the Content Addressed Archive by it's root CID.
   * @param {CIDString} cid
   */
  get (cid) {
    return Web3Storage.get(this, cid)
  }

  /**
   * @param {CIDString} cid
   */
  /* c8 ignore next 3 */
  delete (cid) {
    return Web3Storage.delete(this, cid)
  }

  /**
   * Fetch info on Filecoin deals and IPFS pins that a given CID is replicated in.
   * @param {CIDString} cid
   */
  status (cid) {
    return Web3Storage.status(this, cid)
  }
}

/**
 * Map a UnixFSEntry to a File with a cid property
 * @param {UnixFSEntry} entry
 * @returns {Promise<Web3File>}
 */
async function toWeb3File ({ content, path, cid }) {
  const chunks = [];
  for await (const chunk of content()) {
    chunks.push(chunk);
  }
  const file$1 = new file.File(chunks, toFilenameWithPath(path));
  return Object.assign(file$1, { cid: cid.toString() })
}

/**
 * Trim the root cid from the path if there is anyting after it.
 * bafy...ic2q/path/to/pinpie.jpg => path/to/pinpie.jpg
 *         bafy...ic2q/pinpie.jpg => pinpie.jpg
 *                    bafk...52zy => bafk...52zy
 * @param {string} unixFsPath
 * @returns {string}
 */
function toFilenameWithPath (unixFsPath) {
  const slashIndex = unixFsPath.indexOf('/');
  return slashIndex === -1 ? unixFsPath : unixFsPath.substring(slashIndex + 1)
}

/**
 * Add car unpacking smarts to the response object,
 * @param {Response} res
 * @returns {Web3Response}
 */
function toWeb3Response (res) {
  const response = Object.assign(res, {
    unixFsIterator: async function * () {
      /* c8 ignore next 3 */
      if (!res.body) {
        throw new Error('No body on response')
      }
      const blockstore = new fs.FsBlockStore();
      try {
        for await (const entry of unpack.unpackStream(res.body, { blockstore })) {
          yield entry;
        }
      } finally {
        await blockstore.close();
      }
    },
    files: async () => {
      const files = [];
      // @ts-ignore we're using the enriched response here
      for await (const entry of response.unixFsIterator()) {
        if (entry.type === 'directory') {
          continue
        }
        const file = await toWeb3File(entry);
        files.push(file);
      }
      return files
    }
  });
  return response
}

Object.defineProperty(exports, "filesFromPath", ({
  enumerable: true,
  get: function () {
    return filesFromPath.filesFromPath;
  }
}));
Object.defineProperty(exports, "getFilesFromPath", ({
  enumerable: true,
  get: function () {
    return filesFromPath.getFilesFromPath;
  }
}));
Object.defineProperty(exports, "Blob", ({
  enumerable: true,
  get: function () {
    return blob.Blob;
  }
}));
Object.defineProperty(exports, "File", ({
  enumerable: true,
  get: function () {
    return file.File;
  }
}));
exports.Web3Storage = Web3Storage;
//# sourceMappingURL=lib.cjs.map


/***/ }),

/***/ 4293:
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ 6417:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 5747:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 8605:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 7211:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 2087:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 5622:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 2413:
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ 8835:
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ 1669:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ 8761:
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(2186)
const { addToWeb3, pickName } = __nccwpck_require__(7649)

async function run () {
  try {
    const name = pickName({
      repo: process.env.GITHUB_REPOSITORY,
      run: process.env.GITHUB_RUN_NUMBER,
      sha: process.env.GITHUB_SHA
    })
    const endpoint = new URL(core.getInput('web3_api'))
    const pathToAdd = core.getInput('path_to_add')
    const token = core.getInput('web3_token')
    const wrapWithDirectory = core.getBooleanInput('wrap_with_directory')
    core.info(`Adding ${pathToAdd} to ${endpoint.origin}`)
    const { cid, url } = await addToWeb3({ endpoint, token, name, pathToAdd, wrapWithDirectory })
    core.info(url)
    core.setOutput('cid', cid)
    core.setOutput('url', url)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=index.js.map