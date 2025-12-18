import * as React from "react";
import { X, Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Badge } from "./badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover";
import { Input } from "./input";
import { Checkbox } from "./checkbox";

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select items...",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggle = (option: string) => {
    const newSelected = selected.includes(option)
      ? selected.filter((item) => item !== option)
      : [...selected, option];
    onChange(newSelected);
  };

  const handleRemove = (option: string) => {
    onChange(selected.filter((item) => item !== option));
  };

  const handleSelectAll = () => {
    onChange(filteredOptions);
  };

  const handleClearAll = () => {
    onChange([]);
  };

  return (
    <div className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between min-h-[40px] h-auto"
          >
            <div className="flex flex-wrap gap-1 flex-1">
              {selected.length === 0 ? (
                <span className="text-[#6E6E6E]">{placeholder}</span>
              ) : (
                <span className="text-[#04274F]">
                  {selected.length} {selected.length === 1 ? "item" : "items"} selected
                </span>
              )}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0" align="start">
          <div className="flex flex-col">
            {/* Search Input */}
            <div className="p-3 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6E6E6E]" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 bg-gray-50">
              <span className="text-xs text-[#6E6E6E]">
                {selected.length} of {options.length} selected
              </span>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSelectAll}
                  className="h-7 text-xs"
                >
                  Select All
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearAll}
                  className="h-7 text-xs"
                  disabled={selected.length === 0}
                >
                  Clear All
                </Button>
              </div>
            </div>

            {/* Options List */}
            <div className="max-h-[240px] overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="p-4 text-center text-sm text-[#6E6E6E]">
                  No results found.
                </div>
              ) : (
                <div className="p-2">
                  {filteredOptions.map((option) => {
                    const isSelected = selected.includes(option);
                    return (
                      <div
                        key={option}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer hover:bg-[#E3EDFF] transition-colors",
                          isSelected && "bg-[#E3EDFF]/50"
                        )}
                        onClick={() => handleToggle(option)}
                      >
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => handleToggle(option)}
                          className="pointer-events-none"
                        />
                        <span className="text-sm text-[#04274F] flex-1">
                          {option}
                        </span>
                        {isSelected && (
                          <Check className="h-4 w-4 text-[#2877BB]" />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Selected Tags */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {selected.map((item) => (
            <Badge
              key={item}
              variant="secondary"
              className="bg-[#2877BB] text-white hover:bg-[#1F6098] pl-2.5 pr-1.5 py-1"
            >
              <span className="text-xs mr-1">{item}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(item);
                }}
                className="ml-1 rounded-full hover:bg-white/20 p-0.5 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
