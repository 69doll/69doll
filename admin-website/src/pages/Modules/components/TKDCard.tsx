import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TKDCardProps {
  title: string,
  description: string,
  keywords: string,
  onChange?: (key: 'title' | 'description' | 'keywords', value: string) => any,
  disabled?: boolean,
}

const TKDCard: React.FC<TKDCardProps> = ({
  title,
  description,
  keywords,
  onChange,
  disabled,
}) => {
  return <Card>
    <CardHeader>
      <CardTitle>TKD</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col gap-2">
      <div className="grid w-full max-w-sm items-center gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          placeholder="Title"
          onChange={(e) => onChange?.('title', e.target.value)}
          disabled={disabled}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={description}
          placeholder="Description"
          onChange={(e) => onChange?.('description', e.target.value)}
          disabled={disabled}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-2">
        <Label htmlFor="keywords">Keywords</Label>
        <Input
          id="keywords"
          value={keywords}
          placeholder="Keywords"
          onChange={(e) => onChange?.('keywords', e.target.value)}
          disabled={disabled}
        />
      </div>
    </CardContent>
  </Card>
}

export default TKDCard
