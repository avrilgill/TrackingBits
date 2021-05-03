import {render, fireEvent} from "@testing-library/react";
import Progress from "./Progress";
import Form from "./Progress";

it('homeIconRender', ()=>{
    const {queryByTitle} = render(<Progress/>);
    const icon = queryByTitle("homeIcon");
    expect(icon).toBeTruthy();
});

it('titleRender', ()=>{
    const {queryByTitle} = render(<Progress/>);
    const title = queryByTitle("header");
    expect(title.innerHTML).toBe("Progress")
});

it('addIconRender', ()=>{
    const {queryByTitle} = render(<Form/>);
    const btn = queryByTitle("submit");
    expect(btn).toBeTruthy();
});

it('inputRender', ()=>{
    const {queryByTitle} = render(<Form/>);
    const input = queryByTitle("input");
    expect(input).toBeTruthy();
});

describe("testInput", () => {
    it("onChange", () => {
        const {queryByTitle} = render(<Form/>);
        const input = queryByTitle("input");
        fireEvent.change(input, {target: {value: "testInput"}})
        expect(input.value).toBe("testInput");
    })
})

