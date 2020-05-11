function splitCookieString(cookie){
    return cookie.split("=");
}

/**
 * Simple interface to easily handle cookies in the browser.
 *
 * Methods:
 * CookieJar.getAll()
 * CookieJar.check(key)
 * CookieJar.get(key)
 * CookieJar.set(key, val, t)
 * CookieJar.delete(key)
 * CookieJar.clearAll()
 *
 */

class CookieJar{

    /**
     * CookieJar.getAll()
     * Fetches and parses the entire available cookiejar,
     * returns it as an object, returns false if it is empty.
     */
    static getAll(){
        const cookieJar = {};
        if(!document.cookie.length) return false;
        let cJ = document.cookie.split(";").map(splitCookieString);
        for (const cn in cJ) {
            cookieJar[cJ[cn][0].trim()] = cJ[cn][1].trim();
        }
        return cookieJar;
    }

    /**
     * CookieJar.check(key)
     * Checks for the existence of "key" in the cookie store,
     * returns true if the cookie is set.
     *
     * @param {string} key the key to check for.
     */
    static check(key){
        return this.getAll().hasOwnProperty(key);
    }

    /**
     * CookieJar.get(key)
     * Fetches a single key from the cookie store.
     *
     * @param {string} key the key to the value to be fetched.
     */
    static get(key) {
        if(!this.check(key)) return false;
        return this.getAll()[key];
    }

    /**
     * CookieJar.set(key, val, t);
     * Sets a new key/value cookie
     *
     * @param {string} key the key to use for the cookie
     * @param {string} val the value assigned to the key
     * @param {number} t the expiration in days from today!
     */
    static set(key, val, t) {
        const d = new Date();
        d.setTime(d.getTime() + (t * 24 * 60 * 60 * 1000));
        let exp = "expires="+d.toUTCString();
        document.cookie = key + "=" + val + ";" + exp + ";path=/";

        if(this.check(key)) return true;
    }

    /**
     * CookieJar.delete(key);
     * Deletes the cookie assigned to the key.
     *
     * @param {string} key the key to be deleted.
     */
    static delete(key){
        // Return false if it doesn't exists
        if(!this.check(key)) return false;
        // Else empty it and set the expiration date to long time ago, check
        // again and return true if the cookie is gone!
        document.cookie = key+"= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
        if(!this.check(key)) return true;
    }
    /**
     * CookieJar.clearAll();
     * Fetches all of the cookies from the cookie store and
     * removes them, probably only useful for development and
     * should probably not be used in production.
     *
     */
    static clearAll(){
        const cj = this.getAll();
        for (const c in cj) {
            this.delete(c);
        }
        // Returns true if the operation is successful and there are no more
        // browser based cookies stored.
        return !this.getAll();
    }
}

export default CookieJar;
