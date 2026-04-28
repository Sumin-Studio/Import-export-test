import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionActions,
  AccordionAvatar,
  AccordionContent,
  AccordionDescription,
  AccordionItem,
  AccordionSecondaryHeading,
  AccordionTitle,
  AccordionTrigger,
  AccordionTriggerContent,
  AccordionValue,
} from "@/components/ui/accordion";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icon from "@/components/ui/icon";

const accordionStyles = "rounded-medium border border-border-subtle";

export default function AccordionSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Accordion Component</CardTitle>
        <CardDescription>
          Accordions display collapsible content panels for presenting
          information in a limited amount of space.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Basic — all collapsed */}
          <div>
            <p className="text-body-standard-semibold mb-3">Basic</p>
            <Accordion type="single" collapsible className={accordionStyles}>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <AccordionTitle>John Smith</AccordionTitle>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-body-standard-regular text-text-default">
                    Content area for John Smith. Any content can be placed here
                    to be revealed when the accordion item is expanded.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  <AccordionTitle>Barry Allen</AccordionTitle>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-body-standard-regular text-text-default">
                    Content area for Barry Allen. Any content can be placed here
                    to be revealed when the accordion item is expanded.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  <AccordionTitle>Ernest Hemingway</AccordionTitle>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-body-standard-regular text-text-default">
                    Content area for Ernest Hemingway. Any content can be placed
                    here to be revealed when the accordion item is expanded.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Simple expanded */}
          <div>
            <p className="text-body-standard-semibold mb-3">Simple expanded</p>
            <Accordion
              type="single"
              collapsible
              defaultValue="item-2"
              className={accordionStyles}
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <AccordionTitle>John Smith</AccordionTitle>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-body-standard-regular text-text-default">
                    Simple content area for the accordion item. This is where
                    you place any content that should be revealed on expand.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  <AccordionTitle>Barry Allen</AccordionTitle>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-body-standard-regular text-text-default">
                    Simple content area for the accordion item. This is where
                    you place any content that should be revealed on expand.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  <AccordionTitle>Ernest Hemingway</AccordionTitle>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-body-standard-regular text-text-default">
                    Simple content area for the accordion item. This is where
                    you place any content that should be revealed on expand.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* With avatar */}
          <div>
            <p className="text-body-standard-semibold mb-3">With avatar</p>
            <Accordion
              type="single"
              collapsible
              defaultValue="item-2"
              className={accordionStyles}
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <AccordionTriggerContent>
                    <AccordionAvatar>
                      <Avatar name="John Smith" size="xsmall" color="blue" />
                    </AccordionAvatar>
                    <AccordionTitle>John Smith</AccordionTitle>
                  </AccordionTriggerContent>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-body-standard-regular text-text-default">
                    Content area for an accordion with an avatar in the trigger.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  <AccordionTriggerContent>
                    <AccordionAvatar>
                      <Avatar name="Barry Allen" size="xsmall" color="red" />
                    </AccordionAvatar>
                    <AccordionTitle>Barry Allen</AccordionTitle>
                  </AccordionTriggerContent>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-body-standard-regular text-text-default">
                    Content area for an accordion with an avatar in the trigger.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  <AccordionTriggerContent>
                    <AccordionAvatar>
                      <Avatar
                        name="Ernest Hemingway"
                        size="xsmall"
                        color="green"
                      />
                    </AccordionAvatar>
                    <AccordionTitle>Ernest Hemingway</AccordionTitle>
                  </AccordionTriggerContent>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-body-standard-regular text-text-default">
                    Content area for an accordion with an avatar in the trigger.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* With value, button, and overflow */}
          <div>
            <p className="text-body-standard-semibold mb-3">
              With value, button &amp; overflow
            </p>
            <Accordion
              type="single"
              collapsible
              defaultValue="item-2"
              className={accordionStyles}
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <AccordionTitle>John Smith</AccordionTitle>
                  <AccordionValue>0:00</AccordionValue>
                  <AccordionActions>
                    <Button variant="secondary" size="sm">
                      Button
                    </Button>
                    <OverflowMenu />
                  </AccordionActions>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-body-standard-regular text-text-default">
                    Expanded content for an accordion with action buttons and
                    overflow menus in the trigger.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  <AccordionTitle>Barry Allen</AccordionTitle>
                  <AccordionValue>0:00</AccordionValue>
                  <AccordionActions>
                    <Button variant="secondary" size="sm">
                      Button
                    </Button>
                    <OverflowMenu />
                  </AccordionActions>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-body-standard-regular text-text-default">
                    Expanded content for an accordion with action buttons and
                    overflow menus in the trigger.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  <AccordionTitle>Ernest Hemingway</AccordionTitle>
                  <AccordionValue>0:00</AccordionValue>
                  <AccordionActions>
                    <Button variant="secondary" size="sm">
                      Button
                    </Button>
                    <OverflowMenu />
                  </AccordionActions>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-body-standard-regular text-text-default">
                    Expanded content for an accordion with action buttons and
                    overflow menus in the trigger.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* With avatar, value, button, and overflow */}
          <div>
            <p className="text-body-standard-semibold mb-3">
              Avatar, value, button &amp; overflow
            </p>
            <Accordion
              type="single"
              collapsible
              defaultValue="item-2"
              className={accordionStyles}
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <AccordionTriggerContent>
                    <AccordionAvatar>
                      <Avatar name="John Smith" size="xsmall" color="blue" />
                    </AccordionAvatar>
                    <AccordionTitle>John Smith</AccordionTitle>
                  </AccordionTriggerContent>
                  <AccordionValue>0:00</AccordionValue>
                  <AccordionActions>
                    <Button variant="secondary" size="sm">
                      Button
                    </Button>
                    <OverflowMenu />
                  </AccordionActions>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-body-standard-regular text-text-default">
                    Expanded content for fully-featured accordion items with
                    avatar, value, button, and overflow menu.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  <AccordionTriggerContent>
                    <AccordionAvatar>
                      <Avatar name="Barry Allen" size="xsmall" color="red" />
                    </AccordionAvatar>
                    <AccordionTitle>Barry Allen</AccordionTitle>
                  </AccordionTriggerContent>
                  <AccordionValue>0:00</AccordionValue>
                  <AccordionActions>
                    <Button variant="secondary" size="sm">
                      Button
                    </Button>
                    <OverflowMenu />
                  </AccordionActions>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-body-standard-regular text-text-default">
                    Expanded content for fully-featured accordion items with
                    avatar, value, button, and overflow menu.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  <AccordionTriggerContent>
                    <AccordionAvatar>
                      <Avatar
                        name="Ernest Hemingway"
                        size="xsmall"
                        color="orange"
                      />
                    </AccordionAvatar>
                    <AccordionTitle>Ernest Hemingway</AccordionTitle>
                  </AccordionTriggerContent>
                  <AccordionValue>0:00</AccordionValue>
                  <AccordionActions>
                    <Button variant="secondary" size="sm">
                      Button
                    </Button>
                    <OverflowMenu />
                  </AccordionActions>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-body-standard-regular text-text-default">
                    Expanded content for fully-featured accordion items with
                    avatar, value, button, and overflow menu.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Fully featured with description, secondary heading, pop content */}
          <div>
            <p className="text-body-standard-semibold mb-3">
              Fully featured (pop content)
            </p>
            <Accordion
              type="single"
              collapsible
              defaultValue="item-2"
              className={accordionStyles}
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <AccordionTriggerContent>
                    <AccordionAvatar>
                      <Avatar
                        name="Primary Heading"
                        size="xsmall"
                        color="violet"
                      />
                    </AccordionAvatar>
                    <div className="flex min-w-0 flex-col">
                      <div className="flex items-center gap-2">
                        <AccordionTitle>Primary Heading</AccordionTitle>
                        <AccordionSecondaryHeading>
                          Secondary heading
                        </AccordionSecondaryHeading>
                      </div>
                      <AccordionDescription>Description</AccordionDescription>
                    </div>
                  </AccordionTriggerContent>
                  <AccordionValue>0:00</AccordionValue>
                  <AccordionActions>
                    <Button variant="secondary" size="sm">
                      Button
                    </Button>
                    <OverflowMenu />
                  </AccordionActions>
                </AccordionTrigger>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  <AccordionTriggerContent>
                    <AccordionAvatar>
                      <Avatar name="Armando Erdman" size="xsmall" color="red" />
                    </AccordionAvatar>
                    <div className="flex min-w-0 flex-col">
                      <div className="flex items-center gap-2">
                        <AccordionTitle>Armando Erdman</AccordionTitle>
                        <AccordionSecondaryHeading>
                          331 Kihn Plaza
                        </AccordionSecondaryHeading>
                      </div>
                      <AccordionDescription>9 expenses</AccordionDescription>
                    </div>
                  </AccordionTriggerContent>
                  <AccordionValue>0:00</AccordionValue>
                  <AccordionActions>
                    <Button variant="secondary" size="sm">
                      Button
                    </Button>
                    <OverflowMenu />
                  </AccordionActions>
                </AccordionTrigger>
                <AccordionContent pop>
                  <div className="flex flex-col gap-3">
                    <p className="text-body-standard-regular text-text-default">
                      This content &quot;pops&quot; beyond the accordion bounds
                      with a shadow, making it visually distinct from the
                      collapsed items above and below.
                    </p>
                    <p className="text-body-small-regular text-muted-foreground">
                      Use the <code>pop</code> prop on AccordionContent to
                      enable this effect.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  <AccordionTriggerContent>
                    <AccordionAvatar>
                      <Avatar name="Armando Erdman" size="xsmall" color="red" />
                    </AccordionAvatar>
                    <div className="flex min-w-0 flex-col">
                      <div className="flex items-center gap-2">
                        <AccordionTitle>Armando Erdman</AccordionTitle>
                        <AccordionSecondaryHeading>
                          331 Kihn Plaza
                        </AccordionSecondaryHeading>
                      </div>
                      <AccordionDescription>2 expenses</AccordionDescription>
                    </div>
                  </AccordionTriggerContent>
                  <AccordionValue>8:40</AccordionValue>
                  <AccordionActions>
                    <Button variant="secondary" size="sm">
                      Edit
                    </Button>
                    <OverflowMenu />
                  </AccordionActions>
                </AccordionTrigger>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  <AccordionTriggerContent>
                    <AccordionAvatar>
                      <Avatar
                        name="Maverick Hoeger"
                        size="xsmall"
                        color="yellow"
                      />
                    </AccordionAvatar>
                    <div className="flex min-w-0 flex-col">
                      <div className="flex items-center gap-2">
                        <AccordionTitle>Maverick Hoeger</AccordionTitle>
                        <AccordionSecondaryHeading>
                          805 Tommie Canyon
                        </AccordionSecondaryHeading>
                      </div>
                      <AccordionDescription>3 expenses</AccordionDescription>
                    </div>
                  </AccordionTriggerContent>
                  <AccordionValue>3:40</AccordionValue>
                  <AccordionActions>
                    <Button variant="secondary" size="sm">
                      Edit
                    </Button>
                    <OverflowMenu />
                  </AccordionActions>
                </AccordionTrigger>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>
                  <AccordionTriggerContent>
                    <AccordionAvatar>
                      <Avatar
                        name="Kaily Hodkeiwicz"
                        size="xsmall"
                        color="yellow"
                      />
                    </AccordionAvatar>
                    <div className="flex min-w-0 flex-col">
                      <div className="flex items-center gap-2">
                        <AccordionTitle>Kaily Hodkeiwicz</AccordionTitle>
                        <AccordionSecondaryHeading>
                          7368 Kovacek Pines
                        </AccordionSecondaryHeading>
                      </div>
                      <AccordionDescription>8 expenses</AccordionDescription>
                    </div>
                  </AccordionTriggerContent>
                  <AccordionValue>7:20</AccordionValue>
                  <AccordionActions>
                    <Button variant="secondary" size="sm">
                      Edit
                    </Button>
                    <OverflowMenu />
                  </AccordionActions>
                </AccordionTrigger>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function OverflowMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="tertiary" size="icon-xs">
          <Icon name="Overflow" size="xsmall" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>View details</DropdownMenuItem>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-sentiment-negative-foreground">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
