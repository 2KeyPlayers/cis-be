CREATE TABLE veduci (
  id SERIAL PRIMARY KEY,
  meno VARCHAR(255) NOT NULL,
  priezvisko VARCHAR(255) NOT NULL,
  titul VARCHAR(10)
);

INSERT INTO veduci (meno, priezvisko, titul) VALUES ('Mária', 'Tóthová', 'Mgr.');
INSERT INTO veduci (meno, priezvisko, titul) VALUES ('Diana', 'Dókušová', 'Mgr.');
INSERT INTO veduci (meno, priezvisko, titul) VALUES ('Radka', 'Maňovská', null);
INSERT INTO veduci (meno, priezvisko, titul) VALUES ('Norbert', 'Pecze', 'Bc.');

