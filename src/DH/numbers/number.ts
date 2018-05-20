import * as BigInteger from 'big-integer'
import bigInt from 'big-integer';
/**
 * Number utils.
 */
export class NumberUtils {
    /**
     * Generates prime number.
     * @param bits Size in bits of number.
     * @return Prime number.
     */
    public static generatePrime(bits: number): bigInt.BigInteger {
        const two = bigInt(2);
        const min = two.pow(bits - 1);
        const max = two.pow(bits);

        let probablyPrime: bigInt.BigInteger;

        do {
            probablyPrime = bigInt.randBetween(min, max);
        } while (!probablyPrime.isProbablePrime());

        return probablyPrime;
    }
}
