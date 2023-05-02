import {MiniMaple} from "../src/miniMaple.js";

test('it fails', () => {
    expect(!false).toBeTruthy();
});

test('default test', () => {
    let m = new MiniMaple()
    let res = m.derivative("8x^2+7x + 8", 'x')
    expect(res).toBe("16*x+7");
});

test('mixed test', () => {
    let m = new MiniMaple()
    let res = m.derivative("8x^2+7x + 8y + 7y^2", 'x')
    expect(res).toBe("16*x+7");
});


test('mixed test 2', () => {
    let m = new MiniMaple()
    let res = m.derivative("8x^2+ 8y + 7y^2+7x +228x + 12z + 23q", 'x')
    expect(res).toBe("16*x+7+228");
});


test('mixed test 3 with minuses', () => {
    let m = new MiniMaple()
    let res = m.derivative("+ 8x^2   - 8y - 7y^2-7x +228x - 12z - 23q", 'x')
    expect(res).toBe("16*x-7+228");
});



test('mixed test 4 swapped variable', () => {
    let m = new MiniMaple()
    let res = m.derivative("+ 8y^2   - 8y - 7y^2-7y +228y - 12z - 23q", 'y')
    expect(res).toBe("16*y-8-14*y-7+228");
});


test('mixed test 5', () => {
    let m = new MiniMaple()
    let res = m.derivative("x^2 + 7x", 'x')
    expect(res).toBe("2*x+7");
});

test('mixed test 6', () => {
    let m = new MiniMaple()
    let res = m.derivative("x^3+0x", 'x')
    expect(res).toBe("3*x^2");
});

test('mixed test 7', () => {
    let m = new MiniMaple()
    let res = m.derivative("0", 'x')
    expect(res).toBe("0");
});

test('trying bad characters to slide', () => {
    let m = new MiniMaple()
    let res = ""
    let error = ""
    try {
         m.derivative("+ 8y^&2   - 8y - 7y^2-7y +228y - 12z - 23q", 'y')
    } catch (e) {
        error = e
    }
    expect(error).toBe("wrong symbol in input &");
});




// Integral tests
test('INTEGRAL default test', () => {
    let m = new MiniMaple()
    let res = m.integral("8x^2+7x + 8", 'x')
    expect(res).toBe("8*x^3/3+7*x^2/2+8*x+C");
});

test('INTEGRAL mixed test', () => {
    let m = new MiniMaple()
    let res = m.integral("8x^2+7x + 8y + 7y^2", 'x')
    expect(res).toBe("8*x^3/3+7*x^2/2+8*y*x+7*y^2*x+C");
});


test('INTEGRAL mixed test 2', () => {
    let m = new MiniMaple()
    let res = m.integral("8x^2+ 8y + 7y^2+7x +228x + 12z + 23q", 'x')
    expect(res).toBe("8*x^3/3+8*y*x+7*y^2*x+7*x^2/2+228*x^2/2+12*z*x+23*q*x+C");
});


test('INTEGRAL mixed test 3 with minuses', () => {
    let m = new MiniMaple()
    let res = m.integral("+ 8x^2   - 8y - 7y^2-7x +228x - 12z - 23q", 'x')
    expect(res).toBe("8*x^3/3-8*y*x-7*y^2*x-7*x^2/2+228*x^2/2-12*z*x-23*q*x+C");
});



test('INTEGRAL mixed test 4 swapped variable', () => {
    let m = new MiniMaple()
    let res = m.integral("+ 8y^2   - 8y - 7y^2-7y +228y - 12z - 23q", 'y')
    expect(res).toBe("8*y^3/3-8*y^2/2-7*y^3/3-7*y^2/2+228*y^2/2-12*z*y-23*q*y+C");
});


test('INTEGRAL mixed test 5', () => {
    let m = new MiniMaple()
    let res = m.integral("x^2 + 7x", 'x')
    expect(res).toBe("x^3/3+7*x^2/2+C");
});

test('INTEGRAL mixed test 6', () => {
    let m = new MiniMaple()
    let res = m.integral("x^3+0x", 'x')
    expect(res).toBe("x^4/4+C");
});

test('INTEGRAL mixed test 7', () => {
    let m = new MiniMaple()
    let res = m.integral("0", 'x')
    expect(res).toBe("C");
});

test('INTEGRAL trying bad characters to slide', () => {
    let m = new MiniMaple()
    let res = ""
    let error = ""
    try {
         m.integral("+ 8y^&2   - 8y - 7y^2-7y +228y - 12z - 23q", 'y')
    } catch (e) {
        error = e
    }
    expect(error).toBe("wrong symbol in input &");
});