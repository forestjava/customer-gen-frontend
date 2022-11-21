// ClassNames or,
// ClassNames' ChaiN or,
// CoNcatenate :)

const cn = (...classes: Array<string | boolean | undefined>): string => classes.filter((item) => item).join(' ');

export default cn;
