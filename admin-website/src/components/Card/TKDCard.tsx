import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import FormItem from "@/components/Form/FormItem";
import FormWrapper from "@/components/Form/FormWrapper";

interface TKDCardProps {
  title?: string,
  description?: string,
  keywords?: string,
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
      <CardTitle>TKD 信息</CardTitle>
    </CardHeader>
    <CardContent>
      <FormWrapper>
        <FormItem label='HTML Title'>
          <Input
            value={title}
            placeholder="Title"
            onChange={(e) => onChange?.('title', e.target.value)}
            disabled={disabled}
          />
        </FormItem>
        <FormItem label='HTML Description'>
          <Input
            value={description}
            placeholder="Description"
            onChange={(e) => onChange?.('description', e.target.value)}
            disabled={disabled}
          />
        </FormItem>
        <FormItem label='HTML Keywords'>
          <Input
            value={keywords}
            placeholder="Keywords"
            onChange={(e) => onChange?.('keywords', e.target.value)}
            disabled={disabled}
          />
        </FormItem>
      </FormWrapper>
    </CardContent>
  </Card>
}

export default TKDCard
