import axiosQuery from "./axios";


const search = async (text: string, member: number) => await axiosQuery.post('/Search', {
  text, member
});

const searchQuery = {
  search
}

export default searchQuery;
