import { createClient, gql, Provider, useQuery } from 'urql';
import Search from './components/Search';

let client = createClient({
  url: 'http://localhost:8080/v1/graphql',
});




function App() {
  return (
    <Provider value={client}>
      <div style={{ margin: 24 }}>
          <h1>Random Giph App</h1>
          <Search />
      </div>
     </Provider>
  )
}

export default App





