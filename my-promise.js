class MyPromise {
    constructor(mainFunction) {
        this.callbacks = [];
        this.value = null;
        this.resolve = this.resolve.bind(this);
        this.reject = this.reject.bind(this);

        this.handleError = () => { };
        this.handleFinally = () => { };

        try {
            mainFunction(this.resolve, this.reject);
        } catch (err) {
            this.reject(err);
        } finally {
            this.handleFinally(this.value);
        }
    }

    then(callBack) {
        this.callbacks.push(callBack);
        return this;
    }

    catch(error) {
        this.handleError = error;
        return this;
    }

    finally(finallyCb) {
        this.handleFinally = finallyCb;
        return this;
    }

    resolve(value) {
        let reduceValue = value;
        this.callbacks.forEach((nextFunction) => {
            reduceValue = nextFunction(reduceValue);
            this.value = reduceValue;
        });
    }

    reject(error) {
        this.handleError(error);
    }

}

module.exports = MyPromise;
