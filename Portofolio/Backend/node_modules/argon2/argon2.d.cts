export { argon2d };
export { argon2i };
export { argon2id };
export { hash };
export { needsRehash };
export { verify };
declare const argon2d = 0;
declare const argon2i = 1;
declare const argon2id = 2;
/** @enum {'argon2d' | 'argon2i' | 'argon2id'} */
declare const names: Readonly<{
    0: "argon2d";
    1: "argon2i";
    2: "argon2id";
}>;
export type HashOptions = {
    hashLength?: number;
    timeCost?: number;
    memoryCost?: number;
    parallelism?: number;
    type?: keyof typeof names;
    version?: number;
    salt?: Buffer;
    associatedData?: Buffer;
    secret?: Buffer;
};
declare function hash(password: Buffer | string, options: HashOptions & {
    raw: true;
}): Promise<Buffer>;
declare function hash(password: Buffer | string, options?: HashOptions & {
    raw?: boolean;
}): Promise<string>;
/**
 * @param {string} digest The digest to be checked
 * @param {Object} [options] The current parameters for Argon2
 * @param {number} [options.timeCost=3]
 * @param {number} [options.memoryCost=65536]
 * @param {number} [options.parallelism=4]
 * @param {number} [options.version=0x13]
 * @returns {boolean} `true` if the digest parameters do not match the parameters in `options`, otherwise `false`
 */
declare function needsRehash(digest: string, options?: {
    timeCost?: number;
    memoryCost?: number;
    parallelism?: number;
    version?: number;
}): boolean;
export type VerifyOptions = {
    secret?: Buffer;
};
/**
 * @typedef {Object} VerifyOptions
 * @property {Buffer} [secret]
 */
/**
 * @param {string} digest The digest to be checked
 * @param {Buffer | string} password The plaintext password to be verified
 * @param {VerifyOptions} [options] The current parameters for Argon2
 * @returns {Promise<boolean>} `true` if the digest parameters matches the hash generated from `password`, otherwise `false`
 */
declare function verify(digest: string, password: Buffer | string, options?: VerifyOptions): Promise<boolean>;
//# sourceMappingURL=argon2.d.cts.map