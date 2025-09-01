import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input } from "@/components/ui"

export default function ComponentsPage() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-serif">Design System Components</h1>
        <p className="text-muted-foreground">
          Built with Radix UI, CVA, and Tailwind CSS using shadcn/ui patterns.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>
              Various button styles and sizes using the shadcn/ui Button component.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
            <CardDescription>
              Status indicators and labels using the Badge component.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
            <CardDescription>
              Text input field with proper styling and focus states.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Enter your text here..." />
            <Input type="email" placeholder="email@example.com" />
            <Input type="password" placeholder="Password" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Card</CardTitle>
            <CardDescription>
              This card component demonstrates the structure with header, content areas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Cards provide a flexible container for grouping related content and actions.
              They can contain text, images, buttons, and other components.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Legacy Components</CardTitle>
          <CardDescription>
            Existing components maintained for backward compatibility while using the new shadcn utilities.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The existing Button and Tooltip components have been updated to use the new `cn` utility
            while maintaining their original API for backward compatibility.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}