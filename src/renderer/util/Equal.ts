type Equal<T1, T2, Then, Else> = T1 extends T2 ? (T2 extends T1 ? Then : Else) : Else;
export default Equal;
