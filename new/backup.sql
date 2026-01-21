--
-- PostgreSQL database dump
--

-- Dumped from database version 14.16 (Homebrew)
-- Dumped by pg_dump version 14.17 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: olga
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    topic character varying(255)
);


ALTER TABLE public.categories OWNER TO olga;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: olga
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO olga;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: olga
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: questions; Type: TABLE; Schema: public; Owner: olga
--

CREATE TABLE public.questions (
    id integer NOT NULL,
    category_id integer NOT NULL,
    text text NOT NULL
);


ALTER TABLE public.questions OWNER TO olga;

--
-- Name: questions_id_seq; Type: SEQUENCE; Schema: public; Owner: olga
--

CREATE SEQUENCE public.questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.questions_id_seq OWNER TO olga;

--
-- Name: questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: olga
--

ALTER SEQUENCE public.questions_id_seq OWNED BY public.questions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: olga
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password_hash text NOT NULL
);


ALTER TABLE public.users OWNER TO olga;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: olga
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO olga;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: olga
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: olga
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: questions id; Type: DEFAULT; Schema: public; Owner: olga
--

ALTER TABLE ONLY public.questions ALTER COLUMN id SET DEFAULT nextval('public.questions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: olga
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: olga
--

COPY public.categories (id, name, description, topic) FROM stdin;
1	Break the Ice: First Date Edition	A playful mix of funny and meaningful questions to spark real conversation on your first date. Skip the small talk, share laughs, and discover what makes each other tick — no awkward interviews, just connection and fun	Love & Relationships
6	Before We Say “I Do”	This deck to help couples explore meaningful topics before marriage — from dreams and expectations to finances, family, and values. Use these cards to deepen your connection and build a strong foundation together	Marriage & Partnership
5	Dear Mom, Let’s Talk	A tender and meaningful deck designed to open up heartfelt conversations between you and your mother. Reflect on childhood memories, share laughter, express unspoken thoughts, and deepen your bond through thoughtful and loving questions	Family & Home
4	Things to discuss before getting pregnant	A meaningful deck to help couples explore important topics before starting their parenting journey. Use these cards to open up about hopes, fears, finances, parenting styles, and dreams for the future — all in a supportive and nonjudgmental way	Marriage & Partnership
9	New Years Resolution	A deck to inspire your New Year’s resolutions — reflect on the past year, set meaningful goals, and share dreams for the year ahead	Self Reflection
7	Chaos Mode: Absurd Friend Questions	Unleash total chaos with these brain-breaking, ridiculous, and absurd questions. Get ready to laugh, roast your friends, and make memories no one will ever let you forget.	Friends and Fun
3	Soundtrack	A playful and romantic game for couples! Read the situation card and be the first to pick a song on YouTube that pops into your head. Share memories, laugh, and discover the soundtrack of your love.	Marriage & Partnership
8	Real Talk: Teens & Parents	Meaningful, fun, and sometimes surprising conversations between teens and parents. This deck is designed to help you understand each other better, share laughs, and build trust — one question at a time	Family & Home
2	Family Evening	Slow down, gather around, and reconnect with the people who matter most.\nThis deck is designed for family evenings filled with conversation, memories, imagination, and laughter.	Family & Home
\.


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: olga
--

COPY public.questions (id, category_id, text) FROM stdin;
1	1	What’s your favorite childhood memory?
2	1	Do you believe in love at first sight?
3	1	What’s your dream travel destination?
4	2	What’s the funniest family moment you remember?
5	2	If our family had a motto, what would it be?
6	3	What does romance mean to you?
7	3	What’s the most romantic thing someone did for you?
8	4	If we’re being honest, do we want to have a child or do we want to become parents? It’s not the same.
9	4	How will we divide roles? Who will take parental leave? Who will provide financially and in what proportion?
10	4	Whose help and support can we count on along the way? (Grandparents? Friends? Nannies?)
11	4	How do we imagine our daily life when we become three? Who cooks, who gets up at night?
12	4	What are our taboos in raising children? What’s most important to us?
13	4	How will we meet each other’s needs for closeness at different stages of this journey?
14	4	How should we prepare financially? How much should we save? How should we adjust income/expenses?
15	4	What does being a good parent mean to each of us?
16	4	What do we want to pass on, and what do we not want to repeat from our own childhoods?
17	4	Are we ready for the unknown — emotional, physical, financial? What will help support us?
18	4	What scares each of us about parenthood?
19	4	What excites us about it?
20	4	What will help keep warmth, support, and deep connection in our relationship at every stage?
21	5	What’s your most vivid, warm, and favorite memory of the two of us?
22	5	What was the most important thing for you in how I was raised?
23	5	What was it like being my mom when I was little, and what’s it like now?
24	5	What’s a funny memory you have about me?
25	5	What did you feel when I left home?
26	5	Is there anything you regret in our relationship?
27	5	Is there anything you’ve wanted to talk to me about but didn’t dare?
28	5	What moment from our shared past would you like to experience again?
29	5	What’s the happiest memory from your own childhood?
30	5	What’s one thing you admire about me that you don’t often say out loud?
31	5	What’s a piece of advice you would give me for the future?
32	1	If you were a vegetable, which one would you be — and why?
33	1	What’s the weirdest food you secretly enjoy?
34	1	What’s a dream or goal you have that you haven’t told many people about?
35	1	If you could swap lives with any movie character for a day, who would you choose?
36	1	What’s the most ridiculous thing you believed as a child?
37	1	What’s something small that always makes your day better?
38	1	If aliens landed and asked you to show them one thing to understand humanity, what would you show?
39	1	Do you have a secret “useless talent” — like whistling with your nose or folding pizza perfectly?
40	1	If you were an animal in your next life, what animal do you hope you’d be (and what animal do you fear you’d be)?
41	1	What kind of adventure would you love to go on someday?
42	1	What’s your go-to guilty pleasure song when no one’s watching?
43	1	If you could instantly master a silly skill — like doing a backflip or juggling — what would you choose?
44	1	If you could give your younger self one piece of advice, what would it be?
45	1	Who in your life has shaped you the most?
46	1	What’s a moment you’re really proud of, even if it’s small?
47	1	If you had one extra hour every day just for yourself, how would you spend it?
48	1	What makes you feel most alive?
49	1	Is there a memory that never fails to make you smile?
50	1	What’s a value or life lesson that’s really important to you
51	6	What kind of family do we want: the role of wife, husband, and religion?
52	6	What kind of traditions will our family have?
53	6	What will be the influence of our parents?
54	6	What are our life priorities as a couple?
55	6	How can we improve our current relationship — what should we do or avoid?
56	6	If we spend too much time at work, what will happen?
57	6	What is our education and development plan, and how can we support each other in it?
58	6	Where do we see ourselves in 10 years?
59	6	What personal space does each of us need: solo travels, friends, shared passwords?
60	6	What is unacceptable in conflicts?
61	6	What kind of attention does each of us want to receive?
62	8	What’s the funniest thing we’ve ever done together?
63	8	If you could teach me one trend or slang word, what would it be?
64	8	If you could swap lives for a day, what’s the first thing you’d do?
65	8	When was your first kiss?
66	8	When do you feel most supported by me?
67	8	What’s something silly we should try together just for fun?
68	8	What’s something we can both improve on to have fewer conflicts?
69	8	How can we build more trust with each other?
70	8	What is your biggest fear?
71	8	Imagine your perfect job, what is it? Explain in details
72	8	How did you imagine your future when you were my age? What came true and whats not?
73	8	What’s something we both get stressed about — and how can we handle it better together?
74	8	At what age you first tried alcohol?
75	7	If we all had to replace our hands with random objects from the kitchen, what would you pick and why?
76	7	You are now legally married to the last object you touched. How’s the honeymoon going?
77	7	If you were arrested, what’s the most ridiculous thing we’d assume you got caught doing?
78	7	You have to fight 100 duck-sized grandmas or 1 grandma-sized duck. Who do you pick — and what’s your weapon?
79	7	If your laugh had a physical form, what would it look like and what sound would it make?
80	7	Which friend would accidentally summon a demon during a Zoom call — and what’s their opening line?
81	7	If you were a piñata, what would fall out of you when you break?
82	7	Which two animals combined best represent your personality in a disaster?
83	7	Everyone here has been cursed to swap bodies for a day. Who’s most likely to break the world in that time?
84	7	If your brain sent out an automated “out of office” reply, what would it say right now?
85	7	You have to pick a new alarm sound made by someone in this room. Who is it and what sound do they make?
86	7	You’re a wizard, but your only spell is mildly annoying. What does it do?
87	7	If someone here had an evil twin, who would it be and what petty chaos would they cause?
88	7	You can only speak in movie quotes for the next week. What’s your go-to quote?
89	7	Which of us would survive the longest in an IKEA — and what section would they live in?
90	9	What do I want my life to feel like a year from now?
91	9	What habits do I need to build now to become the person I want to be in December?
92	9	What did I avoid last year that I don’t want to keep running from?
93	9	What would I work on consistently this year if I believed it could actually change my life?
94	9	Where am I most stuck — and what’s the first small step I can take to get unstuck?
95	9	What area of my life needs structure, and what area needs more freedom?
96	9	If I had one hour each week dedicated to personal growth, how would I spend it?
97	9	What are three qualities I want to embody more this year — and how can I practice them?
98	9	What decision have I been postponing that I need to finally face this year?
99	9	How do I want to treat myself when I fail — and how can I practice that mindset?
100	9	What’s one belief about myself that I’m ready to rewrite — and what could replace it?
101	9	What does “discipline with kindness” look like in my life?
102	9	What would I focus on if no one was watching or judging?
103	9	Where do I want to be braver this year — in thought, action, or emotion?
104	9	What system or ritual could I create to keep myself aligned with my values all year long?
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: olga
--

COPY public.users (id, username, email, password_hash) FROM stdin;
1	test	test@example.com	$2b$10$QJFh7TmicUK3D9ToQrtfEeOug7nw58QaRi0LGpQZ80jDc1/.o8Rja
2	alice	alice@example.com	$2b$10$tAyRnzDM3UfgsL18keNme.jFHlflzM1CiN0v4UzZ9gK08Br/ZBxjK
3	bob	bob@example.com	$2b$10$Zkbe.s0r4nBQGKK0aucfH.4Kr.H6nb79X9nnx4341oeGdnh7VEDLu
4	charlie	charlie@example.com	$2b$10$na6J6Tu78jJV954uzGtWiuNoc5zjFneBwpcZtG/cQX.qrnphISYXW
5	ree	obarinshteyn@gmail.com	$2b$10$9h6VYhr6FnDwm4JYz5pT/.rBcm3jCIdRahR8284vY2P6tG2k81gF2
6	olga	11@inbox.ru	$2b$10$V4kO1YuqIMHlX1Oodl0WDu6PQmQ2IBsBnm56VOp0jj3S6SnTKAKWG
7	Olga	obaba@gmail.com	$2b$10$pz0JSyDFgVgHb0Qq.1TVZO.dF9iSLl0TxapN8hvj4BX1gGlb5nVrK
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: olga
--

SELECT pg_catalog.setval('public.categories_id_seq', 9, true);


--
-- Name: questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: olga
--

SELECT pg_catalog.setval('public.questions_id_seq', 104, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: olga
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- Name: categories categories_name_key; Type: CONSTRAINT; Schema: public; Owner: olga
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: olga
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: olga
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: olga
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: olga
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: questions questions_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: olga
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

