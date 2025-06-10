import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const DashboardHistoricalTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState("25");
  const totalItems = 1000;
  const [currentPage, setCurrentPage] = useState(1);

  // Dummy data for the table
  const dummyData = Array.from({ length: 1000 }, (_, index) => ({
    dateRecorded: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toLocaleDateString(),
    heatIndex: Math.floor(Math.random() * 100) + 50, // Random heat index between 50 and 150
  }));

  // Filter data based on search term
  const filteredData = dummyData.filter((item) =>
    item.dateRecorded.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const itemsPerPageNum = parseInt(itemsPerPage, 10);
  const totalPages = Math.ceil(filteredData.length / itemsPerPageNum);
  const startIndex = (currentPage - 1) * itemsPerPageNum;
  const endIndex = startIndex + itemsPerPageNum;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="p-4">
      <div className="flex flex-col items-center space-y-2 mb-4">
        <Button className="w-full" variant="outline">Export Data</Button>
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date Recorded</TableHead>
              <TableHead>Heat Index</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.dateRecorded}</TableCell>
                <TableCell>{item.heatIndex}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Items per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
          </SelectContent>
        </Select>
        <div className="text-sm text-muted-foreground">
          {startIndex + 1}–{Math.min(endIndex, filteredData.length)} of {filteredData.length}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            &lt;
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            &gt;
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHistoricalTable;