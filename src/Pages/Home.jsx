import React, { useEffect, useState, useCallback } from 'react';
import { Button, Input, Table, Tag, Space, ConfigProvider, Pagination } from "antd";
import axios from 'axios';
import { TinyColor } from '@ctrl/tinycolor';
import '../Styles/Home.css';

const gradientColor = ['#40e495', '#30dd8a', '#2bb673'];
const getHoverColors = (colors) =>
    colors.map((color,index) => new TinyColor(color,index).lighten(5).toString());
const getActiveColors = (colors) =>
    colors.map((color, index) => new TinyColor(color,index).darken(5).toString());

const Home = () => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);

    const fetchPosts = useCallback(async () => {
        try {
            const skip = (page - 1) * 10;
            const response = await axios.get(`https://dummyjson.com/posts/search?q=${searchQuery}&skip=${skip}&limit=10`);
            setData(response.data.posts);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [page, searchQuery]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const prevPage = () => {
        setPage(page => page - 1);
    };

    const nextPage = () => {
        setPage(page => page + 1);
    };

    const handleReset = () => {
        window.location.reload();
    };

    const handleFilter = (tag) => {
        const filterData = data.filter((item) => item.tags.includes(tag));
        setData(filterData);
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            width: "50px"
        },
        {
            title: "Title",
            dataIndex: "title",
            width: "230px"
        },
        {
            title: "Body",
            dataIndex: "body",
            width: "700px"
        },
        {
            title: "Tags",
            dataIndex: "tags",
            render: (_, { tags }) => (
                <>
                    {tags.map((tag, index) => {
                        let color = "magenta"
                        return (
                            <Tag color={color} key={index}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
    ];

    return (
        <div className="home-container">
            <div className="search-bar">
                <Input
                    size="large"
                    width="100px"
                    type="text"
                    placeholder="Search your favourites here..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="filter-buttons">
                <Space size="small" wrap>
                    <Button type="primary" onClick={() => handleFilter("history")}>History</Button>
                    <Button type="primary" onClick={() => handleFilter("french")}>French</Button>
                    <Button type="primary" onClick={() => handleFilter("magical")}>Magical</Button>
                    <Button type="primary" onClick={() => handleFilter("love")}>Love</Button>
                    <Button type="primary" onClick={() => handleFilter("american")}>American</Button>
                    <Button type="primary" onClick={() => handleFilter("fiction")}>Fiction</Button>
                    <Button type="primary" onClick={() => handleFilter("mystery")}>Mystery</Button>
                    <Button type="primary" onClick={() => handleFilter("crime")}>Crime</Button>
                    <Button type="primary" onClick={() => handleFilter("english")}>English</Button>
                    <Button type="primary" onClick={() => handleFilter("classic")}>Classic</Button>
                </Space>
                <ConfigProvider
                    theme={{
                        components: {
                            Button: {
                                colorPrimary: `linear-gradient(116deg,  ${gradientColor.join(', ')})`,
                                colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(gradientColor).join(', ')})`,
                                colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(gradientColor).join(', ')})`,
                                lineWidth: 0,
                            },
                        },
                    }}
                >
                    <Button onClick={handleReset} type="primary">Reset</Button>
                </ConfigProvider>
            </div>

            <div className="table-container">
                <Table
                    pagination={false}
                    columns={columns}
                    dataSource={data}
                    scroll={{ y: 600 }}
                    bordered
                    size="middle"
                />
            </div>

            <div className="pagination">
                <Pagination
                    totalPage={data.total}
                    current={page}
                    pageSize={10}
                    onChange={(pageNumber) => setPage(pageNumber)}
                />
            </div>
        </div>
    );
};

export default Home;
