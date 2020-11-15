const MyPromise = require("./my-promise");

it('check that all methods are functions and callbacks is an array', () => {
    const myPromise = new MyPromise((res, rej) => {
        res('succsess');
    });

    expect(myPromise.resolve).toBeInstanceOf(Function);
    expect(myPromise.then).toBeInstanceOf(Function);
    expect(myPromise.callbacks).toEqual([]);
});

it('return on succsess', () => {
    const myPromise = new MyPromise((res, rej) => {
        res('succsess');
    });

    expect(myPromise.then(data => expect(data).resolves.toEqual('succsess')));
});

it('return on fail', () => {
    const myPromise = new MyPromise((res, rej) => {
        rej('fail');
    });

    expect(myPromise.catch(data => expect(data).rejects.toEqual('fail')));
});

it("should return a promise calling then", () => {
    const promise = new MyPromise(resolve => resolve(51));
    expect(promise.then(jest.fn())).toBeInstanceOf(MyPromise);
});

it('catches errors throw', () => {
    const myPromise = new MyPromise(() => {
        throw 'testing error';
    });

    expect(myPromise.catch(data => expect(data).rejects.toEqual('testing error')));
});

it('faild in resolve', () => {
    const myPromise = new MyPromise((res, rej) => {
        const newErr = new Error('bow');
        const spy = jest.spyOn(myPromise, 'play');

        res(newErr);

        expect(spy).toHaveBeenCalledTimes(1);

    });

    expect(myPromise.then(data => expect(data).resolves.toEqual('bow')));
});