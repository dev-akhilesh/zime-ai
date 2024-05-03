import React from 'react'
import { Button, Flex } from "antd";

export default function Pagination({ page, nextPage, prevPage, totalPage }) {

    return (
        <div style={{ marginLeft: "40%" }} >
            <Flex align="centre" gap="small" horizontal>
                <Button type="default" disabled={page === 1} onClick={prevPage} >Prev</Button>
                <Button type='default'>{page}</Button>
                <Button disabled={page === totalPage / 10 || page === 15} type='default' onClick={nextPage}>Next</Button>
            </Flex>
        </div>
    )
}