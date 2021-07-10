import React, {Component} from "react"
import { Table, Button,Empty, Input, Space} from "antd";
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import "./index.css";

interface UserDetailsInterface {
    name: string;
    age: number;
    address:string;
    key:number;
    chosen:boolean;
  }

  const data: UserDetailsInterface[] = [
    {
      name: "Saikiran",
      age: 10,
      address: "address 1",
      key: 1,
      chosen:true,
    },
    {
      name: "name2",
      age: 20,
      address: "address 2",
      key: 2,
      chosen:false,
    },
    {
      name: "name3",
      age: 30,
      address: "address 3",
      key: 3,
      chosen:true,
    },
    {
        name: "name4",
        age: 40,
        address: "address 4",
        key: 4,
        chosen:false,
      },
      {
        name: "name5",
        age: 50,
        address: "address 5",
        key: 5,
        chosen:true,
      },
      {
        name: "name6",
        age: 60,
        address: "address 6",
        key: 6,
        chosen:false,
      },
      {
        name: "name7",
        age: 70,
        address: "address 7",
        key: 7,
        chosen:true,
      },
      {
          name: "name8",
          age: 80,
          address: "address 8",
          key: 8,
          chosen:false,
        },
        {
          name: "name9",
          age: 9,
          address: "address 9",
          key: 9,
          chosen:true,
        },
        {
          name: "name10",
          age: 100,
          address: "address 10",
          key: 10,
          chosen:false,
        },
        {
          name: "name11",
          age: 110,
          address: "address 11",
          key: 11,
          chosen:true,
        },
        {
            name: "name12",
            age: 120,
            address: "address 12",
            key: 12,
            chosen:false,
          },
  ];

class MyTable extends Component{
    state = {
        selectedRowKeys: data.filter(item => item.chosen).map(item => item.key),
        searchText: '',
        searchedColumn: '',
    }

    getColumnSearchProps = (dataIndex:string) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                Reset
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({ closeDropdown: false });
                  this.setState({
                    searchText: selectedKeys[0],
                    searchedColumn: dataIndex,
                  });
                }}
              >
                Filter
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered:boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value:string, record) =>
          record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '',
        render: (text:boolean) =>
          this.state.searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[this.state.searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      });
    
      handleSearch = (selectedKeys, confirm, dataIndex:string) => {
        confirm();
        this.setState({
          searchText: selectedKeys[0],
          searchedColumn: dataIndex,
        });
      };
    
      handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
      };

    onSelectChange = (selectedRowKeys: React.Key[], selectedRows: UserDetailsInterface[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
        this.setState({selectedRowKeys})
    }
  render() {
      const {selectedRowKeys} = this.state
      const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange
      }
      const columns = [
        {
          title: "Name",
          dataIndex: "name",
          key: "key",
          ...this.getColumnSearchProps('name')
        },
        {
          title: "Age",
          dataIndex: "age",
          key: "key",
          sorter: (a:UserDetailsInterface, b:UserDetailsInterface ) => a.age - b.age,
        },
        {
          title: "Address",
          dataIndex: "address",
          key: "key",
        },
        {
          title: "Graduated?",
          key: "key",
          render: (payload:UserDetailsInterface) => {
            return <p>{payload.age > 20 ? "True" : "False"}</p>;
          },
        },
      ];
      
    return (
            <Table 
                rowSelection={rowSelection}
                dataSource={data} 
                columns={columns}
                pagination={false}
                scroll={{scrollToFirstRowOnChange:true, y:500}}
                locale={
                    {
                        emptyText: (<Empty
                            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                            imageStyle={{
                              height: 60,
                            }}
                            description={
                              <span>
                                Customize <a href="#API">Description</a>
                              </span>
                            }
                          >
                            <Button type="primary">Create Now</Button>
                          </Empty>)
                    }
                } 
                className="table-box"></Table>
      );
  }
}

export default MyTable;
