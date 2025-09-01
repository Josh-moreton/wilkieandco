import { 
  Badge, 
  Button, 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  Input,
  MotionBox,
  MotionButton,
  MotionCard
} from "@/components/ui"

export default function ComponentsPage() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <MotionBox animation="fadeInDown" className="space-y-2">
        <h1 className="text-3xl font-bold">Design System Components</h1>
        <p className="text-muted-foreground">
          Built with Radix UI, CVA, Tailwind CSS, and Framer Motion for smooth animations.
        </p>
      </MotionBox>

      <div className="grid gap-8 md:grid-cols-2">
        <MotionCard animation="slideUp" delay="short">
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
        </MotionCard>

        <MotionCard animation="slideUp" delay="medium">
          <CardHeader>
            <CardTitle>Motion Buttons</CardTitle>
            <CardDescription>
              Interactive buttons with hover, tap, and focus animations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <MotionButton>Hover me!</MotionButton>
              <MotionButton variant="secondary" motionType="hover">Hover only</MotionButton>
              <MotionButton variant="outline" motionType="tap">Tap me!</MotionButton>
            </div>
            <div className="flex flex-wrap gap-2">
              <MotionButton size="sm" variant="ghost">Small</MotionButton>
              <MotionButton size="default">Default</MotionButton>
              <MotionButton size="lg" variant="secondary">Large</MotionButton>
            </div>
          </CardContent>
        </MotionCard>

        <MotionCard animation="slideUp" delay="long">
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
        </MotionCard>

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
      </div>

      <MotionCard animation="fadeIn" hoverEffect="glow">
        <CardHeader>
          <CardTitle>Motion Animations</CardTitle>
          <CardDescription>
            Examples of different animation types available with Motion components.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Motion Box Examples</h4>
            <div className="grid gap-4 md:grid-cols-3">
              <MotionBox 
                animation="fadeInLeft" 
                className="p-4 bg-muted rounded-lg text-center"
              >
                Fade In Left
              </MotionBox>
              <MotionBox 
                animation="scaleIn" 
                delay="short"
                className="p-4 bg-muted rounded-lg text-center"
              >
                Scale In
              </MotionBox>
              <MotionBox 
                animation="slideInFromTop" 
                delay="medium"
                className="p-4 bg-muted rounded-lg text-center"
              >
                Slide From Top
              </MotionBox>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Hover Effects</h4>
            <div className="grid gap-4 md:grid-cols-3">
              <MotionCard hoverEffect="lift" className="p-4 text-center cursor-pointer">
                <p className="text-sm">Lift Effect</p>
              </MotionCard>
              <MotionCard hoverEffect="scale" className="p-4 text-center cursor-pointer">
                <p className="text-sm">Scale Effect</p>
              </MotionCard>
              <MotionCard hoverEffect="glow" className="p-4 text-center cursor-pointer">
                <p className="text-sm">Glow Effect</p>
              </MotionCard>
            </div>
          </div>
        </CardContent>
      </MotionCard>

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