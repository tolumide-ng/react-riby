// export default {
//   get: jest.fn(() => Promise.resolve({ data: {} })),
// };

// export default jest.fn(() => Promise.resolve({ data: {} }));

const mockAxios = jest.genMockFromModule('axios');

// this is the key to fix the axios.create() undefined error!
mockAxios.create = jest.fn(() => mockAxios);

export default mockAxios;
