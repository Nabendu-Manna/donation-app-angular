
export interface Building {
    is_select: boolean,
    building_value: number,
}

export interface Content {
    is_select: boolean,
    plant_and_machinery_value: number,
    furniture_and_fixtures_value: number,
    other_content_value: number
}

export interface Stock {
    is_select: boolean,
    raw_material_value: number,
    in_process_stock_value: number,
    finished_stock_value: number
}

export interface InsureItems {
    building: Building,
    content: Content,
    stock: Stock
}
