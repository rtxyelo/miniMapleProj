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