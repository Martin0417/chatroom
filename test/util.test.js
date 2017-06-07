const _ = require('../util');
const assert = require('assert');

describe('工具方法测试', () => {

    describe('getRamId', () => {
        it('长度为16个字符的数字字符串', () => {
            assert(/^\d{16}$/g.test(_.getRamId()));
        });
        it('唯一', () => {
            let n = 10;
            while(n>0){
                assert.notEqual(_.getRamId(), _.getRamId());
                n--;
            }
        });
    });

    describe('getRamColor', () => {
        it('长度为7个字符', () => {
            assert.strictEqual(_.getRamColor().length, 7);
        });
        it('#号开头', () => {
            assert.strictEqual(_.getRamColor().charAt(0), '#');
        });
        it('除去第一位是6位16进制数组成的字符串', () => {
            assert.ok( /^[0-F]{6}$/gi.test(_.getRamColor().slice(1)) );
        });
    });

    describe('fillZero', () => {
        it('返回字符串', () => {
            assert.strictEqual(typeof _.fillZero(6), 'string');
        });
        it('6 => "06"', () => {
            assert.strictEqual(_.fillZero(6), '06');
        });
        it('12 => "12"', () => {
            assert.strictEqual(_.fillZero(12), '12');
        });
        it('"abc",6 => "000abc"', () => {
            assert.strictEqual(_.fillZero('abc',6), '000abc');
        });
        it('"abcdef",6 => "abcdef"', () => {
            assert.strictEqual(_.fillZero('abcdef',6), 'abcdef');
        });
    });

});