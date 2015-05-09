

%lex

%%

\s+                           // ignore
"("                           return '('
")"                           return ')'
";"                           return ';'
"{"                           return '{'
"}"                           return '}'
"columns"                     return 'COLUMNS'
"flags"                       return 'FLAGS'
"parser"                      return 'PARSER'
"csv"                         return 'CSV'
"delimiter"                   return 'DELIMITER'
"arguments"                   return 'ARGUMENTS'
"flags"                       return 'FLAGS'
\"(?:[^"\\]|\\.)*\"           return 'COLUMN'
","                           return 'COMMA'
[A-Za-z_0-9-]+                return 'NAME'
<<EOF>>                       return 'EOF'
.                             return "INVALID"

/lex


%start expressions

%% /* language grammar */

expressions
    : parser EOF
        { return $1; }
    ;

parser
    : PARSER name '{' CSV '(' definition ')' ';' '}' ';'
        {
          $$ = {
            "name": $2,
            "type": $4,
            "columns": $6.columns,
            "flags": $6.flags,
            "delimiter": $6.delimiter
          };
        }
    ;

name
    : NAME
        { $$ = yytext }
    ;

arguments
    : COLUMN
        { $$ = [ $1.slice(1, -1) ]; }
    | COLUMN COMMA arguments
        { $3.unshift($1.slice(1, -1)); $$ = $3 }
    ;

columns
    : COLUMNS '(' arguments ')'
        { $$ = $3; }
    ;


flags
    : FLAGS '(' arguments ')'
      { $$ = $3; }
    ;

delimiter
    : DELIMITER '(' COLUMN ')'
        { $$ = $3.slice(1, -1); }
    ;

definition
    : flags columns delimiter
        { $$ = { "flags": $1, "columns": $2, "delimiter": $3 }; }
    | columns flags delimiter
        { $$ = { "flags": $2, "columns": $1, "delimiter": $3 }; }
    | flags delimiter columns
        { $$ = { "flags": $1, "columns": $3, "delimiter": $2 }; }
    | columns delimiter flags
        { $$ = { "flags": $3, "columns": $1, "delimiter": $2 }; }
    | delimiter flags columns
        { $$ = { "flags": $2, "columns": $3, "delimiter": $1 }; }
    | delimiter columns flags
        { $$ = { "flags": $3, "columns": $2, "delimiter": $1 }; }
    | delimiter columns
        { $$ = { "columns": $2, "delimiter": $1 }; }
    | columns delimiter
        { $$ = { "columns": $1, "delimiter": $2 }; }
    | flags columns
        { $$ = { "columns": $2, "flags": $1 }; }
    | columns flags
        { $$ = { "columns": $1, "flags": $2 }; }
    | columns
        { $$ = { "columns": $1 }; }
    ;
