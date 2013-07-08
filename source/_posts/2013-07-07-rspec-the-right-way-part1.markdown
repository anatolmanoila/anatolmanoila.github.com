---
layout: post
title: "RSPEC the right way"
date: 2013-07-07 22:30
comments: true
categories: [RSpec, Rails]
---
In this step by step tutorial I want to take the plunge on describing the process how & when to use RSpec applying Behavioral Driven Development technique, by building a complete Rails 4 app. As the example, we'll be building a _**Comments Dasboard** application that will be used to fetch comments from various blogs that my app knows about and will display a list of comments that people have commented thoughout the day - on the topics that are of interest to me (the user)._ Thus, I can see all the nicely displayed comments from a single common interface on my desktop or mobile web browser. As it turns out to be, it's a great example of an app that uses many concepts of _in-production_ applications.

In this blog post, we'll use RSpec in isolation, to implement the _first_ feature of the application.

### Goals for RSpec alone
✓ Understanding the _describe_ and _it_ methods <br />
✓ _Implement_ the first feature: create a Wordpress client and give it a URL

#### RSpec Enlightenment

 _Thoughts from the experienced developers:_

> "RSpec is  primarily about documenting and organizing your code. Although you write words to can be run as code, one of their major purposes is to explain what the implementation code does."

> A side effect is that you'll end up with a regression test suite (which detects new bugs in existing code). And your implementation code will be improved by the process of test-first development.

BDD is driven by expectations and examples, but it's also driven by failures and errors. Often, an error will tell you what you need to do next in your code to make it work, but it's also crucial to see errors in order to know that the examples you're writing actually work.

It's surprinsigly easy to write examples that do absolutely nothing.

    module Wordpress
       module Comments
          class Client
          end
       end
    end

    describe Wordpress::Comments::Client  do
    end

    Finished in 0.00004 seconds
    0 examples, 0 failures

> The beauty of Behavioral Driven Development is that you start from the outside actually by using the modules, classes or methods that you write. Instead of designing the implementation first, **you design the external interface**. *You use the code as if it already existed. Then you write that implementation code.*

So althought we didn't write any code in the *client* yet, we can start *describing* what it will do.
RSpec provides an **it** method for writing examples against the _implementation code_. The *it* method provides a description of what this part of the code will do.

The first part of what this _client_ will need to know is the _url_ of the Wordpress blog it will be dealing with. So that's our first example:

      8 describe Wordpress::Comments::Client  do
      9    it "stores a URL" do
     10
     11    end
     12 end

*Because RSpec is all about the description and documentation*, wording is important. The words RSpec gives us are part of that - _describe_ and _it_. But the words that, I am using are also important. Use words that communicate what the code does do, not what it should do. So instead of specifying that it _should store a URL_, I state that it _stores a URL_.

**So what do we need, in order to verify that this class properly stores a URL?**
First, we'll make an instance of the client, and we'll need to give it a URL to store.
_A sensible part to that is an argument to the **new** method_.

Using RSpec involves running the test suite over and over again. It gives you early feedback about the _errors_ in your code, and it _guides_ your development.

        F

        Failures:

          1) Wordpress::Comments::Client stores a URL
             Failure/Error: client = Wordpress::Comments::Client.new 'http://mashable.com/comments/feed'
             ArgumentError:
               wrong number of arguments (1 for 0)
             # ./spec/lib/wordpress/comments/client_spec.rb:10:in `initialize'
             # ./spec/lib/wordpress/comments/client_spec.rb:10:in `new'
             # ./spec/lib/wordpress/comments/client_spec.rb:10

        Finished in 0.00038 seconds
        1 example, 1 failure

        Failed examples:

        rspec ./spec/lib/wordpress/comments/client_spec.rb:9 # Wordpress::Comments::Client stores a URL

 Now we see a **runtime error** because we try to use the wordpress comment's client's *initialize* method called here with new. We gave it an argument but it wasn't expecting that. Ruby's built in implementation of _initialize_ takes no arguments.

Let's write the smallest amount of _implementation code_ to make it to pass. We need an _initialze_ method and it needs to take an _url_ as an argument.

    ...
       class Client
         def initialize url
         end
       end
    ...

Let's top there and run the test again.

    1 example, 0 Failures

The example ran without any failures. We didn't make any assertions yet but it did successfuly run.

**We don't only need a new object, we also want to verify that the data we gave it is actually stored in this client object**.
A brand new syntax that we'll use is the *expect* keyword. We will call *expect* on an *object*, and then we will tell it what we expect that object to do.

      it "stores a URL" do
        client = Wordpress::Comments::Client.new 'http://mashable.com/comments/feed'
        expect(client.url).to eq 'http://mashable.com/comments/feed'
      end

>
  `expect(thing).to eq 'result'`
#### An RSpec expectation

>The object being examined is wrapped in **expect**. It's followed by **to** or `to_not`. A matcher defines the comparison, such as **eq**.
Finally, the expected result is listed as explicitly as possible.

RSpec shipps with a bunch of *matchers*, that cover most comparisons you might want to do.









