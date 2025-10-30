import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import { Sidebar } from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import PetList from './pages/pet-list';

function App() {
  return (
    <Router>
      <Flex minH="100vh" bg="gray.50">
        <Sidebar />

        <Box ml="250px" flex="1" bg="gray.50">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pets" element={<PetList />} />
          </Routes>
        </Box>
      </Flex>
    </Router>
  );
}

export default App;
