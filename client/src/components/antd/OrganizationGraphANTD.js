import React from 'react';
import ReactDOM from 'react-dom';
import { OrganizationGraph } from '@ant-design/graphs';

const OrganizationGraphANTD = () => {
  const data = {
    id: 'root',
    value: {
      name: 'CEO',
      title: 'Derry Nguyễn'
    },
    children: [
      {
        id: 'joel',
        value: {
          name: 'Manager',
          title: 'Trang Anh'

        },
        children: [
          {
            id: 'c1',
            value: {
              name: 'Manager Customer',
              title: 'Kỳ Anh'
            },
            children: [
              {
                id: 'c1-1',
                value: {
                  name: 'c1-1',
                },
              },
              {
                id: 'c1-2',
                value: {
                  name: 'c1-2',
                },
                children: [
                  {
                    id: 'c1-2-1',
                    value: {
                      name: 'c1-2-1',
                    },
                  },
                  {
                    id: 'c1-2-2',
                    value: {
                      name: 'c1-2-2',
                    },
                  },
                ],
              },
            ],
          },
          {
            id: 'c2',
            value: {
              name: 'c2',
            },
          },
          {
            id: 'c3',
            value: {
              name: 'c3',
            },
            children: [
              {
                id: 'c3-1',
                value: {
                  name: 'c3-1',
                },
              },
              {
                id: 'c3-2',
                value: {
                  name: 'c3-2',
                },
                children: [
                  {
                    id: 'c3-2-1',
                    value: {
                      name: 'c3-2-1',
                    },
                  },
                  {
                    id: 'c3-2-2',
                    value: {
                      name: 'c3-2-2',
                    },
                  },
                  {
                    id: 'c3-2-3',
                    value: {
                      name: 'c3-2-3',
                    },
                  },
                ],
              },
              {
                id: 'c3-3',
                value: {
                  name: 'c3-3',
                },
              },
            ],
          },
        ],
      },
    ],
  };

  return <OrganizationGraph data={data} behaviors={[]} />;
};

export default OrganizationGraphANTD